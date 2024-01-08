import PropTypes from "prop-types";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import ShareButtons from "../../components/Wrappers/ShareButtons.jsx";

const ArticleActions = ({ likeCount, isLiked, handleLike, handleDisLike }) => {
  return (
    <div className="my-5">
      <span>{likeCount}</span>
      {isLiked ? (
        <FaHeart onClick={handleDisLike} />
      ) : (
        <FaRegHeart onClick={handleLike} />
      )}
      <div className="ml-6">
        <ShareButtons
          shareUrl={window.location.href}
          title={"check out article !"}
          source="ArticleHub.com"
          description="checkout amazing article of App"
        />
      </div>
    </div>
  );
};
ArticleActions.propTypes = {
  likeCount: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDisLike: PropTypes.func.isRequired,
};

export default ArticleActions;
