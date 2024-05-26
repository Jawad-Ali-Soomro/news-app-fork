import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userRegistrationSchema } from "../../schema/userSchema";
import { Button } from "../../components/UI/button";
import FormInput from "../../components/UI/FormInput";
import TextArea from "../../components/UI/TextArea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/UI/select";
import { useState } from "react";

// Use with react-hook-form
function RegistrationForm() {
  const [selectedRole, setSelectedRole] = useState("USER");
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(userRegistrationSchema),
  });

  const handleRoleSelect = (value) => {
    setSelectedRole(value);
  };

  const submitHandler = (data) => {
    console.log("In submited form");
    console.log(data);
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
          <h1 className="text-4xl font-bold ">Register Your Account</h1>
        </div>
        <form
          onSubmit={handleSubmit(submitHandler)}
          method="post"
          encType="multipart/form-data"
          className="space-y-3"
          autoComplete="off"
        >
          <FormInput {...register("name")} placeholder={"John..."} label={"Name "} error={formState.errors.name} />
          <FormInput
            {...register("username")}
            placeholder={"John..."}
            label={"Username "}
            error={formState.errors.username}
          />
          <FormInput {...register("email")} placeholder={"John..."} label="Email" error={formState.errors.email} />
          <FormInput {...register("password")} type="password" label="Password" error={formState.errors.password} />
          <Select onValueChange={handleRoleSelect}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USER">User</SelectItem>
              <SelectItem value="CHANNEL">Channel</SelectItem>
            </SelectContent>
          </Select>
          {selectedRole === "CHANNEL" && (
            <>
              <FormInput {...register("headline")} label="Channel Headline " />
              <TextArea {...register("about")} label="Channel About Section " placeholder="Top 1 News Channel" />
            </>
          )}

          <Button type="submit" className="mt-2">
            Register Account
          </Button>
        </form>
      </div>
    </div>
  );
}

export default RegistrationForm;
