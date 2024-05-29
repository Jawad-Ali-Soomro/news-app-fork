import React, { useState } from "react";
import { changePasswordSchema, updateAccountSchema } from "../../schema/userSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import FormInput from "../UI/FormInput";
import { Button } from "../UI/button";
import { putRequest } from "../../api/apiServices";
import { updateUserDetails } from "../../store/slices/auth.slice";

const UpdateAccountForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(updateAccountSchema),
    defaultValues: {
      about: user.about,
      headline: user.headline,
      name: user.name,
      username: user.username,
    },
  });

  const submitHandler = async (data) => {
    console.log(data);
    const response = await putRequest("/api/v1/users/update-account-details", data);
    if (!response.success) return setErrorMessage(response.message);
    dispatch(updateUserDetails({ ...response.data.updatedUser }));
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="text-left">
      <p className="text-xl mb-5">Make sure to update your account details</p>
      <FormInput
        {...register("headline")}
        placeholder={"John_19"}
        label={"Headline  "}
        error={formState.errors.headline}
      />
      <FormInput {...register("about")} placeholder={"John_19"} label={"About "} error={formState.errors.about} />
      <FormInput {...register("name")} placeholder={"John_19"} label={"Name "} error={formState.errors.name} />
      <FormInput
        {...register("username")}
        placeholder={"John_19"}
        label={"Username "}
        error={formState.errors.username}
      />
      <div className="my-5">
        <p className="text-red-500">{errorMessage}</p>
      </div>
      <Button loading={formState.isSubmitting}>Update Account </Button>
    </form>
  );
};

export default UpdateAccountForm;
