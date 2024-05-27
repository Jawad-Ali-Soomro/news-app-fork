import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPasswordSchema } from "../../schema/userSchema";
import { Button } from "../../components/UI/button";
import FormInput from "../../components/UI/FormInput";
import { useState } from "react";

function ResetPasswordPage() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(resetPasswordSchema),
  });

  function submitHandler(data, event) {
    event.preventDefault();
    console.log("In submited form", data);
  }

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
          <h1 className="text-4xl font-bold ">Reset Your Password</h1>
        </div>
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-3">
          <FormInput
            {...register("password")}
            placeholder={"xyz@12"}
            label={"Password"}
            error={formState.errors.password}
          />
          <FormInput
            type="Confirm Password"
            label="Password"
            placeholder={"xyz@12"}
            error={formState.errors.confirmPassword}
            {...register("confirmPassword")}
          />
          <Button type="submit" className="mt-2">
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
