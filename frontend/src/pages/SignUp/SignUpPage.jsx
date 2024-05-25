import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userRegistrationSchema } from "../../schema/userSchema";
import Button from "../../components/UI/Button";

const USER_ROLE = "user";
const CHANNEL_ROLE = "channel";

// Use with react-hook-form
function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userRegistrationSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Button variant="destructive">Hi Button </Button>
      <input {...register("name")} placeholder="Name" className="bg-green-500" />
      {errors.name && <p>{errors.name.message}</p>}

      <input {...register("username")} placeholder="Username" />
      {errors.username && <p>{errors.username.message}</p>}

      <input {...register("email")} placeholder="Email" />
      {errors.email && <p>{errors.email.message}</p>}

      <input {...register("password")} type="password" placeholder="Password" />
      {errors.password && <p>{errors.password.message}</p>}

      <input {...register("headline")} placeholder="Headline" />
      {errors.headline && <p>{errors.headline.message}</p>}

      <input {...register("about")} placeholder="About" />
      {errors.about && <p>{errors.about.message}</p>}

      <select {...register("role")}>
        <option value="">Select Role</option>
        <option value={USER_ROLE}>User</option>
        <option value={CHANNEL_ROLE}>Channel</option>
      </select>
      {errors.role && <p>{errors.role.message}</p>}

      <Button variant="destructive" type="submit">
        Register Shadcn
      </Button>
    </form>
  );
}

export default RegistrationForm;
