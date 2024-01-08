import { Link } from "react-router-dom";
import PropType from "prop-types";
const AuthRelatedLinks = ({ text, linkLabel, path }) => {
  return (
    <div className="w-full flex flex-col items-start my-container-5">
      <p className="mt-4 text-center text-sm text-gray-500">
        {text}
        <Link
          to={path}
          className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 ml-3"
        >
          {linkLabel}
        </Link>
      </p>
      <p className="text-center text-sm text-gray-500">
        Go back to Home
        <Link
          to={"/"}
          className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 ml-3"
        >
          Home
        </Link>
      </p>
    </div>
  );
};

AuthRelatedLinks.propTypes = {
  text: PropType.string,
  path: PropType.string,
  linkLabel: PropType.string,
};

export default AuthRelatedLinks;
