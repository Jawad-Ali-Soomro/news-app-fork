import React from "react";
import { changePasswordSchema, updateAccountSchema } from "../../schema/userSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import FormInput from "../UI/FormInput";
import { Button } from "../UI/button";

const UpdateAccountForm = () => {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(updateAccountSchema),
  });

  const submitHandler = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="text-left">
      <p className="text-xl mb-5">Make sure you update account details</p>
      <FormInput
        {...register("headline")}
        placeholder={"John_19"}
        label={"Headline "}
        error={formState.errors.headline}
      />
      <FormInput {...register("about")} placeholder={"John_19"} label={"About"} error={formState.errors.about} />
      <FormInput {...register("name")} placeholder={"John_19"} label={"Name "} error={formState.errors.name} />
      <FormInput
        {...register("username")}
        placeholder={"John_19"}
        label={"Username "}
        error={formState.errors.username}
      />
      <Button>Change Password</Button>
    </form>
  );
};

export default UpdateAccountForm;
