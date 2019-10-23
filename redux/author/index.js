import API from "~/config/api";
import { Helpers } from "@quantfive/js-web-config";
//import * as shims from "./shims";
import * as types from "./types";
import * as actions from "./actions";
import * as utils from "../utils";
import * as discussionShim from "../discussion/shims";
import * as paperShim from "../paper/shims";

export const AuthorActions = {
  getAuthor: ({ authorId }) => {
    return (dispatch) => {
      return fetch(API.AUTHOR({ authorId }), API.GET_CONFIG())
        .then(Helpers.checkStatus)
        .then(Helpers.parseJSON)
        .then((resp) => {
          return dispatch({
            type: types.GET_AUTHOR,
            payload: {
              ...resp,
              doneFetching: true,
            },
          });
        })
        .catch((error) => {
          console.log(error);
        });
    };
  },

  getAuthoredPapers: ({ authorId, page = 1 }) => {
    return async (dispatch) => {
      const response = await fetch(
        API.AUTHORED_PAPER({ authorId, page }),
        API.GET_CONFIG()
      ).catch(utils.handleCatch);

      let action = actions.getAuthoredPapersFailure();
      if (response.ok) {
        const body = await response.json();
        let results = {
          count: body.count,
          has_next: body.has_next,
          next: body.next,
          papers: body.results,
        };
        action = actions.getAuthoredPapersSuccess(results);
      } else {
        utils.logFetchError(response);
      }
      return dispatch(action);
    };
  },

  getUserDiscussions: ({ authorId, page = 1 }) => {
    return async (dispatch) => {
      const response = await fetch(
        API.USER_DISCUSSION({ authorId, page }),
        API.GET_CONFIG()
      ).catch(utils.handleCatch);

      let action = actions.getUserDiscussionsFailure();
      if (response.ok) {
        const body = await response.json();
        let discussions = [];
        for (let i = 0; i < body.results.length; i++) {
          discussions.push(discussionShim.thread(body.results[i]));
        }
        let results = {
          count: body.count,
          has_next: body.has_next,
          next: body.next,
          discussions,
        };
        action = actions.getUserDiscussionsSuccess(results);
      } else {
        utils.logFetchError(response);
      }
      return dispatch(action);
    };
  },

  getUserContributions: ({
    authorId,
    commentOffset = 0,
    replyOffset = 0,
    paperUploadOffset = 0,
  }) => {
    return async (dispatch) => {
      const response = await fetch(
        API.USER_CONTRIBUTION({
          authorId,
          commentOffset,
          replyOffset,
          paperUploadOffset,
        }),
        API.GET_CONFIG()
      ).catch(utils.handleCatch);

      let action = actions.getUserContributionsFailure();
      if (response.ok) {
        const body = await response.json();
        let contributions = [];
        for (let i = 0; i < body.results.length; i++) {
          let contribution = body.results[i];
          if (contribution.type === "reply") {
            let formatted = discussionShim.transformReply(body.results[i]);
            formatted.type = contribution.type;
            contributions.push(formatted);
          } else if (contribution.type === "comment") {
            let formatted = discussionShim.transformComment(body.results[i]);
            formatted.type = contribution.type;
            contributions.push(formatted);
          } else if (contribution.type === "paper") {
            let formatted = paperShim.paper(body.results[i]);
            formatted.type = contribution.type;
            contributions.push(formatted);
          }
        }
        let results = {
          count: body.count,
          has_next: body.has_next,
          next: body.next,
          offsets: body.offsets,
          contributions,
        };
        action = actions.getUserContributionsSuccess(results);
      } else {
        utils.logFetchError(response);
      }
      return dispatch(action);
    };
  },
};