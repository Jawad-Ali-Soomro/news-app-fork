import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import FormInput from "../../components/UI/FormInput.jsx";
import { Button } from "../../components/UI/button.jsx";
import AuthRelatedLinks from "../../components/Wrappers/AuthRelatedLinks.jsx";
import { login as loginSlice } from "../../store/slices/auth.slice.js";
import { loginUser, loginWithGoogle } from "../../api/auth.js";
import { FORM_VALIDATIONS } from "../../config/validation.js";

import { motion } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // form submitting status loading, response error, e.g user put Invalid credentials, or others error
  const [submitStatus, setSubmitStatus] = useState({
    loading: false,
    error: false,
  });

  // login the  user, set userData in redux store and redirect to articles list page
  const submitHandler = async (data, event) => {
    event.preventDefault(); //stop page reloading on form submit
    setSubmitStatus({ loading: true, error: false });
    const response = await loginUser(data);
    // handle API error
    if (!response) {
      setSubmitStatus({ loading: false, error: true });
      return;
    }
    Swal.fire({
      position: "top-center",
      icon: "success",
      title: response?.data?.message,
      showConfirmButton: false,
      timer: 1500,
    });
    setSubmitStatus({ loading: false, error: false });
    dispatch(loginSlice({ ...response.data.user }));
    navigate("/articles");
  };

  const borderVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.92 } },
  };

  return (
    <React.Fragment>
      <motion.div initial="hidden" animate="visible" variants={borderVariants}>
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-20 w-auto"
              src="https://img.freepik.com/free-vector/colorful-letter-gradient-logo-design_474888-2309.jpg?size=626&ext=jpg&ga=GA1.1.330823008.1703701840&semt=ais"
              alt="Your Company"
            />
            <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Login in your account
            </h2>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              onSubmit={handleSubmit(submitHandler)}
              method="post"
              autoComplete="off"
              className="space-y-3"
            >
              <FormInput
                label={"Your Email "}
                placeholder={"Enter your Email "}
                type={"email"}
                {...register("email", FORM_VALIDATIONS.email)}
                error={errors.email}
              />
              <FormInput
                label="Password"
                name="password"
                placeholder={"Enter your Password "}
                type={"password"}
                {...register("password", FORM_VALIDATIONS.password)}
                error={errors.password}
              />
              <div>
                {submitStatus.error && (
                  <p className="text-red-600 text-[14px]">
                    something went wrong please try again{" "}
                  </p>
                )}
              </div>
              <div>
                <Button
                  type="submit"
                  variant={"primary"}
                  isLoading={submitStatus.loading}
                  className="px-4 py-2"
                >
                  Login
                </Button>
              </div>
            </form>
            <AuthRelatedLinks
              text={"Don't have an account !"}
              linkLabel={"Sign Up here !"}
              path={"/auth/signUp"}
            />
            <Button
              variant={"success"}
              className="px-2  py-2 w-fit "
              onClick={loginWithGoogle}
            >
              Login with Google{" "}
            </Button>
          </div>
        </div>
      </motion.div>
    </React.Fragment>
  );
};

export default Login;
