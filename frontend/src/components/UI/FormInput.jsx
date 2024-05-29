import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
const FormInput = React.forwardRef(function Form(props, ref) {
  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordType = () => {
    // handle the show and hide password
    setShowPassword(!showPassword);
  };
  return (
    <React.Fragment>
      <div className="mb-2">
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-foreground">
          {props.label || "Label"}
        </label>
        <div className="relative">
          <input
            autoComplete="off"
            required
            className={`w-full px-4 rounded-md border-0 py-1.5 bg-inherit text-foreground shadow-sm ring-1 ring-inset ${
              props.error ? "ring-red-600" : "ring-gray-300"
            } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            {...props}
            type={props.type === "password" && showPassword ? "text" : props.type || "text"}
            ref={ref}
          />
          {props.type === "password" && (
            <div className="absolute right-3 mt-[10px] top-0" onClick={handlePasswordType}>
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </div>
          )}
        </div>
        {props.error && <p className="text-red-600 font-semibold text-[14px]">{props?.error?.message}</p>}
      </div>
    </React.Fragment>
  );
});

FormInput.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  error: PropTypes.object,
};
export default FormInput;

// export default React.forwardRef(Input)
