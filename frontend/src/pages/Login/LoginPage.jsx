import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userLoginSchema } from "../../schema/userSchema";
import { Button } from "../../components/UI/button";
import FormInput from "../../components/UI/FormInput";
import { useState } from "react";
import { postRequest } from "../../api/apiServices";
import { useAsyncError, useAsyncValue, useNavigate } from "react-router-dom";
import { login } from "../../store/slices/auth.slice.js";
import { useDispatch } from "react-redux";

function LoginPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(userLoginSchema),
  });

  const submitHandler = async (data, event) => {
    event.preventDefault();
    setErrorMessage("");
    const response = await postRequest("/api/v1/auth/login", data);

    if (!response.success) return setErrorMessage(response.message);
    // set user details and auth tokens in redux store
    const { user, accessToken, refreshToken } = response.data;
    dispatch(login({ user, accessToken, refreshToken }));
    navigate("/settings");
  };

  return (
    <div className="flex justify-between items-center h-screen w-100">
      <div className="w-1/2 h-screen">
        <img
          src="https://images.unsplash.com/32/Mc8kW4x9Q3aRR3RkP5Im_IMG_4417.jpg?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGJhY2tncm91bmQlMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D"
          alt=""
          className="h-screen w-100"
        />
      </div>
      <div className="w-1/2 sm:px-20 md:px-10">
        <div className="sm:mb-4">
          <h1 className="text-4xl font-bold ">Login Your Account</h1>
        </div>
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-3">
          <FormInput
            {...register("username")}
            placeholder={"John_19"}
            label={"Username or Email"}
            error={formState.errors.username}
          />
          <FormInput
            type="password"
            label="Password"
            placeholder={"xyz@19"}
            error={formState.errors.password}
            {...register("password")}
          />
          <p className="my-5 text-red-500">{errorMessage}</p>
          <Button type="submit" className="mt-2" loading={formState.isSubmitting}>
            Login Account
          </Button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
