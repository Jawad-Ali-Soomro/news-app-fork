import React, { useState } from "react";
import { changePasswordSchema } from "../../schema/userSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import FormInput from "../UI/FormInput";
import { patchRequest, postRequest, putRequest } from "../../api/apiServices.js";
import { Button } from "../UI/button";

const ChangePasswordForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(changePasswordSchema),
  });

  const submitHandler = async (data) => {
    console.log(data);
    const response = await patchRequest("/api/v1/users/change-password", data);
    if (!response.success) return setErrorMessage(response.message);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="text-left">
      <p className="text-xl mb-5">Make sure to change your current password</p>
      <FormInput
        {...register("currentPassword")}
        placeholder={"John_19"}
        type="password"
        label={"Current Password "}
        error={formState.errors.currentPassword}
      />
      <FormInput
        {...register("newPassword")}
        placeholder={"John_19"}
        type="password"
        label={"New Password "}
        error={formState.errors.newPassword}
      />
      <FormInput
        {...register("confirmPassword")}
        placeholder={"John_19"}
        type="password"
        label={"Confirm Password"}
        error={formState.errors.confirmPassword}
      />
      <div className="my-5">
        <p className="text-red-500">{errorMessage}</p>
      </div>
      <Button type="submit" loading={formState.isSubmitting}>
        Change Password
      </Button>
    </form>
  );
};

export default ChangePasswordForm;
