import { breakpoints } from "~/config/themes/screen";
import { css, StyleSheet } from "aphrodite";
import { ID } from "~/config/types/root_types";
import { ReactElement, useState } from "react";
import icons from "~/config/themes/icons";
import Image from "next/image";

type Props = {
  bountyAmount: Number;
  bountyText: string;
  postId: ID;
  postSlug: string;
};

function SuccessScreen({
  bountyAmount,
  bountyText,
  postId,
  postSlug,
}: Props): ReactElement {
  const twitterPreText = `I created a ${bountyAmount} RSC bounty on ResearchHub for solutions to:`;
  const [copySuccess, setCopySuccess] = useState(false);

  const link = process.browser
    ? window.location.protocol +
      "//" +
      window.location.hostname +
      `/post/${postId}/${postSlug}`
    : "";

  const twitterBountyPreview = `\n\n"${bountyText.slice(
    0,
    249 - twitterPreText.length - link.length
  )}"\n\n${link}?utm_campaign=twitter_bounty`;

  function copyToClipboard() {
    navigator.clipboard.writeText(link);
    document.execCommand("copy");
    // e.target.focus(); // TODO: Uncomment if we don't want highlighting
    setCopySuccess(true);
    setTimeout(() => {
      setCopySuccess(false);
    }, 2000);
  }

  return (
    <div className={css(styles.container)}>
      <Image src="/static/icons/success2.png" width={62} height={62} />
      <h2 className={css(styles.title)}>Your Bounty has been started!</h2>
      <p className={css(styles.description)}>
        Share this bounty to get a quicker response.
      </p>
      <div className={css(styles.shareRow)}>
        <a
          href={`https://twitter.com/intent/tweet?utm_campaign=twitter_bounty&text=${encodeURI(
            twitterPreText + twitterBountyPreview
          )}`}
          data-size="large"
          target="_blank"
          className={css(styles.link)}
        >
          <div className={css(styles.twitter)}>
            {icons.twitter}
            <span className={css(styles.twitterText)}>Share on Twitter</span>
          </div>
        </a>
      </div>
      <div className={css(styles.copyURLButton)} onClick={copyToClipboard}>
        {copySuccess ? "URL Successfully Copied!" : "Copy URL"}
      </div>
    </div>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: 500,
    [`@media only screen and (max-width: ${breakpoints.small.str})`]: {
      width: "unset",
    },
  },
  title: {
    marginTop: 24,
    fontSize: 26,
    fontWeight: 500,
  },
  description: {
    lineHeight: "20px",
    marginTop: 16,
  },
  twitter: {
    background: "#3971FF",
    width: 200,
    height: 50,
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 18,
  },
  twitterText: {
    marginLeft: 7,
    fontWeight: 500,
  },
  link: {
    textDecoration: "none",
  },
  shareRow: {
    display: "flex",
    marginTop: 16,
  },
  copyURLButton: {
    marginTop: 16,
    color: "#3971FF",
    cursor: "pointer",
  },
});

export default SuccessScreen;