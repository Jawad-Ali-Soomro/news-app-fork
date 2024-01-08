import PropTypes from "prop-types";
const ArticleContent = ({ content, description }) => {
  return (
    <div className="mt-4 border rounded-md px-5 py-5">
      <h2 className="font-bold text-lg lg:text-xl ">Content</h2>

      <p className="text-sm lg:text-base border-b pb-5">{content}</p>

      <div className="mt-5">
        <h2 className="font-bold text-lg lg:text-xl">Description</h2>
        <p className="text-sm lg:text-base">{description}</p>
      </div>
    </div>
  );
};
ArticleContent.propTypes = {
  content: PropTypes.string,
  description: PropTypes.string,
};
export default ArticleContent;
