import PropTypes from "prop-types";
import React from "react";
const TextArea = ({ label = "", placeholder = "type anything... ", ...props }, ref) => {
  return (
    <div>
      <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Your {label}
      </label>
      <textarea
        rows={20}
        id="message"
        className="block p-2 h-5 w-full resize-none text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        {...props}
        ref={ref}
      />
    </div>
  );
};

// TextArea.propTypes = {
//   label: PropTypes.string,
//   placeholder: PropTypes.string,
// };

export default React.forwardRef(TextArea);
