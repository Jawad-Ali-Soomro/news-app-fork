import React from "react";
import { timeAgo } from "../../utils/timeStamp";
import PropTypes from "prop-types";
const ArticleHeader = ({ title, urlToImage, author, createdAt }) => {
  return (
    <React.Fragment>
      <h2 className="text-2xl font-bold border px-5 py-5 rounded-2xl ">
        {title}
      </h2>
      <img
        className="w-full h-[50vh] lg:h-[65vh] border hover:shadow-2xl hover:scale-x-110 shadow-lg rounded-lg mt-4"
        src={urlToImage}
        alt=""
      />
      <div className="flex flex-col lg:flex-row items-start justify-between px-5 mt-4">
        <div className="flex items-center mb-2 lg:mb-0">
          <img
            src={author?.profileImage}
            alt="..."
            className="w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] rounded-[20px] lg:rounded-[25px] mx-3"
          />
          <span className="text-sm lg:text-base">{author?.channelName}</span>
        </div>
        <span className="text-xs lg:text-sm">{timeAgo(createdAt)}</span>
      </div>
    </React.Fragment>
  );
};
ArticleHeader.propTypes = {
  title: PropTypes.string.isRequired,
  urlToImage: PropTypes.string.isRequired,
  profileImage: PropTypes.string,
  channelName: PropTypes.string,
  author: PropTypes.object,
  createdAt: PropTypes.string.isRequired,
};

export default ArticleHeader;
