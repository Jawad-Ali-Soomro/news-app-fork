// ArticleButtons.jsx
import React from "react";
import { Button } from "../../components/UI/button.jsx";
import PropTypes from "prop-types";
const ArticleButtons = ({
  handleSave,
  isCurrentChannelArticle,
  handleDelete,
  navigate,
  articleId,
  isSavedArticle,
}) => {
  return (
    <React.Fragment>
      {!isSavedArticle ? (
        <Button
          type="button"
          onClick={handleSave}
          className="focus:outline-none text-white bg-blue-600 hover:bg-blue-800 focus:ring-1 focus:ring-blue-500 font-medium rounded-[4px] text-sm px-3 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Save for Later
        </Button>
      ) : (
        <Button
          type="button"
          onClick={handleSave}
          className="focus:outline-none text-white bg-blue-600 hover:bg-blue-800 focus:ring-1 focus:ring-blue-500 font-medium rounded-[4px] text-sm px-3 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          remove from save
        </Button>
      )}

      {isCurrentChannelArticle && (
        <div className="flex flex-col lg:flex-row gap-3 mt-3">
          <Button
            type="button"
            onClick={() => navigate(`/articles/update/${articleId}`)}
            variant="success"
            className="w-fit px-2 py-2"
            isLoading={false}
          >
            Update Article
          </Button>
          <Button
            type="button"
            onClick={handleDelete}
            variant="success"
            className="w-fit px-2 py-2"
            isLoading={false}
          >
            Delete Article
          </Button>
        </div>
      )}
    </React.Fragment>
  );
};

ArticleButtons.propTypes = {
  handleSave: PropTypes.func.isRequired,
  isCurrentChannelArticle: PropTypes.bool.isRequired,
  handleDelete: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
  articleId: PropTypes.string.isRequired,
  isSavedArticle: PropTypes.string.isRequired,
};

export default ArticleButtons;
