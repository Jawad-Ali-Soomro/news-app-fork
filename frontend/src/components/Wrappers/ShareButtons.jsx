import PropTypes from "prop-types";
import {
  FacebookShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookIcon,
  LinkedinShareButton,
  TwitterShareButton,
  LinkedinIcon,
  TwitterIcon,
} from "react-share";
const ShareButtons = ({ shareUrl, title, source, description }) => {
  return (
    <div className="flex gap-5 px-5">
      <FacebookShareButton url={shareUrl} quote={title} hashtag={"#NewsApp..."}>
        <FacebookIcon size={25} round={true} />
      </FacebookShareButton>

      <WhatsappShareButton url={shareUrl} quote={title} hashtag={"#NewsApp..."}>
        <WhatsappIcon size={25} round={true} />
      </WhatsappShareButton>

      <TwitterShareButton title=" Title of App or Article " url={shareUrl}>
        <TwitterIcon size={25} round={true} />
      </TwitterShareButton>

      <LinkedinShareButton
        url={shareUrl}
        title={title}
        summary={description}
        source={source}
      >
        <LinkedinIcon size={25} round={true} />
      </LinkedinShareButton>
    </div>
  );
};
ShareButtons.propTypes = {
  shareUrl: PropTypes.string,
  title: PropTypes.string,
  source: PropTypes.string,
  description: PropTypes.string,
};

export default ShareButtons;
