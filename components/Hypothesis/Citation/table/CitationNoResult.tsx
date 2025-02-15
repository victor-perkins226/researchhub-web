import { css, StyleSheet } from "aphrodite";
import { ReactElement } from "react";
import { ValidCitationType } from "../modal/AddNewSourceBodySearch";

export default function CitationNoResult({
  citationType,
}: {
  citationType: ValidCitationType;
}): ReactElement<"div"> {
  const formattedTypeText =
    citationType?.length ?? 0 > 0
      ? ` ${citationType?.toLocaleLowerCase()}ing`
      : "";
  return (
    <div className={css(styles.citationNotResult)}>
      <img
        className={css(styles.emptyPlaceholderImage)}
        src="/static/background/homepage-empty-state.png"
        loading="lazy"
        alt="Empty State Icon"
      />
      <span className={css(styles.emptyPlaceholderText)}>
        {`There are no${formattedTypeText} sources related to this hypothesis`}
      </span>
      <span className={css(styles.emptyPlaceholderSubtitle)}>
        {"Be the first to add a source"}
      </span>
    </div>
  );
}

const styles = StyleSheet.create({
  citationNotResult: {
    alignItems: "center",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
  },
  emptyPlaceholderImage: {
    width: 100,
    objectFit: "contain",
    marginTop: 20,
    "@media only screen and (max-width: 415px)": {
      width: "70%",
    },
  },
  emptyPlaceholderText: {
    textAlign: "center",
    fontSize: 18,
    color: "#241F3A",
    marginTop: 16,
    "@media only screen and (max-width: 767px)": {
      fontSize: 14,
    },
    "@media only screen and (max-width: 415px)": {
      width: "85%",
    },
  },
  emptyPlaceholderSubtitle: {
    textAlign: "center",
    fontSize: 14,
    color: "#4e4c5f",
    marginTop: 10,
    marginBottom: 15,
    "@media only screen and (max-width: 767px)": {
      fontSize: 12,
    },
    "@media only screen and (max-width: 415px)": {
      width: "85%",
    },
  },
});
