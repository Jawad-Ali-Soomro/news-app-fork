import PropTypes from "prop-types";
const Container = ({ children, className }) => {
  return (
    <div
      data-bs-Theme="dark"
      className={`pb-10 min-h-[75vh] lg:px-5 dark:bg-slate-600 ${className}`}
    >
      {children}
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
};
export default Container;
