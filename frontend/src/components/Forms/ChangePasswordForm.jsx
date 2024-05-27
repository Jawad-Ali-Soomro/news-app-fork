import React from "react";
import { changePasswordSchema } from "../../schema/userSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import FormInput from "../UI/FormInput";
import { Button } from "../UI/button";

const ChangePasswordForm = () => {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(changePasswordSchema),
  });

  const submitHandler = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="text-left">
      <p className="text-xl mb-5">Make sure to change your current password</p>
      <FormInput
        {...register("currentPassword")}
        placeholder={"John_19"}
        label={"Current Password "}
        error={formState.errors.currentPassword}
      />
      <FormInput
        {...register("newPassword")}
        placeholder={"John_19"}
        label={"New Password "}
        error={formState.errors.newPassword}
      />
      <Button>Change Password</Button>
    </form>
  );
};

export default ChangePasswordForm;
