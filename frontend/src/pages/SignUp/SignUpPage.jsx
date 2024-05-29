import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { userRegistrationSchema } from "../../schema/userSchema";
import { Button } from "../../components/UI/button";
import FormInput from "../../components/UI/FormInput";
import TextArea from "../../components/UI/TextArea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/UI/select";
import { useState } from "react";
import { postRequest } from "../../api/apiServices";

function RegistrationPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedRole, setSelectedRole] = useState("USER"); // by default user role
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(userRegistrationSchema),
  });

  const handleRoleSelect = (value) => {
    setSelectedRole(value);
  };

  const submitHandler = async (data, event) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    const response = await postRequest("/api/v1/auth/register", data);
    console.log(response);
    if (!response.success) return setErrorMessage(response.message);
    setSuccessMessage(response.message);
    console.log("In submited form", { ...data, role: selectedRole });
  };

  return (
    <div className="flex justify-between items-center h-screen w-100">
      <div className="w-1/2 h-screen">
        <img
          src="https://images.unsplash.com/32/Mc8kW4x9Q3aRR3RkP5Im_IMG_4417.jpg?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGJhY2tncm91bmQlMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D"
          alt=""
          className="h-screen w-100 shadow-md"
        />
      </div>
      <div className="w-1/2 sm:px-20 md:px-10">
        <div className="sm:mb-4">
          <h1 className="text-4xl font-bold ">Register Your Account</h1>
          <p className="text-green-500">{successMessage}</p>
        </div>
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-3">
          <FormInput placeholder={"John"} label={"Name "} error={formState.errors.name} {...register("name")} />
          <FormInput
            {...register("username")}
            placeholder={"John_19"}
            label={"Username "}
            error={formState.errors.username}
          />
          <FormInput
            placeholder={"John@gmail.com"}
            label="Email"
            error={formState.errors.email}
            {...register("email")}
          />
          <FormInput
            type="password"
            label="Password"
            placeholder={"xyz@19"}
            error={formState.errors.password}
            {...register("password")}
          />
          <div className="flex">
            <Select onValueChange={handleRoleSelect}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USER">User</SelectItem>
                <SelectItem value="CHANNEL">Channel</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {selectedRole === "CHANNEL" && (
            <>
              <FormInput label="Channel Headline " error={formState.errors.headline} {...register("headline")} />
              <TextArea
                label="Channel About Section "
                placeholder="Top 1 News Channel"
                error={formState.errors.about}
                {...register("about")}
              />
            </>
          )}
          <p className="my-5 text-red-500">{errorMessage}</p>
          <Button type="submit" className="mt-2" loading={formState.isSubmitting}>
            Register Account
          </Button>
          <p>
            Already have an account ?
            <Link to="/auth/login" className="text-blue-600 ml-5">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegistrationPage;
