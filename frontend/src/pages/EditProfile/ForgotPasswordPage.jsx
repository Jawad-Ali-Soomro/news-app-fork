import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userLoginSchema } from "../../schema/userSchema";
import { Button } from "../../components/UI/button";
import FormInput from "../../components/UI/FormInput";
import { useState } from "react";

function ForgotPasswordPage() {
  function submitHandler(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    console.log("In submited form", Object.fromEntries(data.entries()));
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
          <h1 className="text-4xl font-bold mb-6 ">Forgot Your Password?</h1>
          <p className="text-md text-md ">Its Ok that fine you can fill your email here and reset your password</p>
        </div>
        <form onSubmit={submitHandler} className="space-y-3">
          <FormInput type="email" label="Email" placeholder={"john@gmail.com"} name="email" />
          <Button type="submit" className="mt-2">
            Search
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
