import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import FormInput from "../../components/UI/FormInput";
import Button from "../../components/UI/Button";
import { login } from "../../store/slices/auth.slice";
import AuthRelatedLinks from "../../components/Wrappers/AuthRelatedLinks";
import { registerUser } from "../../api/auth";
import { FORM_VALIDATIONS } from "../../config/validation";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [submitStatus, setSubmitStatus] = useState({
    loading: false,
    error: false,
  });
  const [files, setFiles] = useState({ profileImage: null, coverImage: null });
  // submit handler to call api and create new user account and auto login
  const submitHandler = async (data, event) => {
    event.preventDefault();

    // Create a FormData object
    const formData = new FormData();
    // Append text data to the FormData
    formData.append("name", data.name);
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("role", "USER");
    formData.append("profileImage", files.profileImage);
    formData.append("coverImage", files.coverImage);
    setSubmitStatus({ loading: true, error: false });
    // Call the registerUser API with the FormData
    const response = await registerUser(formData);
    if (!response) {
      setSubmitStatus({ loading: false, error: true });
      return;
    }
    setSubmitStatus({ loading: false, error: false });
    dispatch(login({ ...response?.data?.user }));
    navigate("/articles");
    setSubmitStatus({ loading: false, error: true });
  };

  return (
    <React.Fragment>
      <motion.div
        initial={{ opacity: 0, x: -600, y: 0 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        exit={{ opacity: 0, x: 0, y: -50 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex min-h-full flex-col justify-center px-6 py-3 lg:px-2">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="https://img.freepik.com/free-vector/colorful-letter-gradient-logo-design_474888-2309.jpg?size=626&ext=jpg&ga=GA1.1.330823008.1703701840&semt=ais"
              alt="my Company"
            />
            <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Create a new Account
            </h2>
          </div>
          <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              method="post"
              encType="multipart/form-data"
              className="space-y-3"
              onSubmit={handleSubmit(submitHandler)}
              autoComplete="off"
            >
              <FormInput
                label={"Your Name "}
                placeholder={"Xyz..."}
                type={"text"}
                {...register("name", FORM_VALIDATIONS.name)}
                error={errors.name}
              />
              <FormInput
                label={"Your username "}
                placeholder={"abc_xyz..."}
                type={"text"}
                {...register("username", FORM_VALIDATIONS.username)}
                error={errors.username}
              />
              <FormInput
                label={"Your Email "}
                placeholder={"abc@gmail.com"}
                type={"email"}
                {...register("email", FORM_VALIDATIONS.email)}
                error={errors.email}
              />
              <FormInput
                label={"Your password "}
                placeholder={"qwerty@1234"}
                type={"password"}
                {...register("password", FORM_VALIDATIONS.password)}
                error={errors.password}
              />
              <div className="flex">
                <input
                  type="file"
                  required
                  onChange={(e) =>
                    setFiles({ ...files, profileImage: e.target.files[0] })
                  }
                  className="file:border-0 file:bg-gray-200 file:text-[12px] file:px-2 file:py-2 file:rounded-lg file:sh"
                />
                {files.profileImage && (
                  <img
                    src={URL.createObjectURL(files?.profileImage)}
                    className="w-10 h-10 rounded-full"
                    alt=""
                  />
                )}
              </div>
              <div className="flex">
                <input
                  type="file"
                  required
                  onChange={(e) =>
                    setFiles({ ...files, coverImage: e.target.files[0] })
                  }
                  className="file:border-0 file:bg-gray-200 file:text-[12px] file:px-2 file:py-2 file:rounded-lg file:sh"
                />
                {files.coverImage && (
                  <img
                    src={URL.createObjectURL(files?.coverImage)}
                    className="w-10 h-10 rounded-full"
                    alt=""
                  />
                )}
              </div>
              {submitStatus.error && (
                <p className="text-red-600 text-[14px]">
                  something went wrong please try again{" "}
                </p>
              )}
              <div>
                <Button
                  type="submit"
                  variant={"success"}
                  isLoading={submitStatus.loading}
                  className="w-fit px-2 py-2"
                >
                  Create Account
                </Button>
              </div>
            </form>
            <AuthRelatedLinks
              text={"already have an account !"}
              linkLabel={"Login here !"}
              path={"/auth/login"}
            />
          </div>
        </div>
      </motion.div>
    </React.Fragment>
  );
};

export default SignUp;
