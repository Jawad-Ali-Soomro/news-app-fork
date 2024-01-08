import PropTypes from "prop-types";
import { timeAgo } from "../../utils/timeStamp";
const CommentCard = ({
  commentText,
  createdAt,
  userId: { profileImage, name },
}) => {
  return (
    <div className="w-full h-20 px-4 py-2 border-b pb-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img
            src={profileImage}
            className="w-8 h-8 rounded-full mr-2"
            alt={`${name}'s profile`}
          />
          <span className="font-semibold">{name}</span>
        </div>
        <span className="text-xs text-gray-600">{timeAgo(createdAt)}</span>
      </div>
      <p className="mt-1 text-sm">{commentText}</p>
    </div>
  );
};

CommentCard.propTypes = {
  commentText: PropTypes.string,
  createdAt: PropTypes.string,
  userId: PropTypes.shape({
    profileImage: PropTypes.string,
    name: PropTypes.string,
  }),
};

export default CommentCard;
