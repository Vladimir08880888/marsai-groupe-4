import { Link, useNavigate } from "react-router";

import { signIn } from "../../api/auth.js";
import { useMutation } from "@tanstack/react-query";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const registerSchema = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string(),
  confirmpassword:z.string(),
}).refine((data) => data.password === data.confirmpassword,{
  message: "Passwords don't match",
  path: ["confirmpassword"],
});// https://stackoverflow.com/questions/73695535/how-to-check-confirm-password-with-zod

export function Register() {
  if (localStorage.getItem("username")) {
    return (
      <>
        <h1 className="text-2xl">
          You are already logged in as {localStorage.getItem("username")}
        </h1>
        <Link to="/">Go to Home</Link>
      </>
    );
  }

  let navigate = useNavigate();

  const { register, handleSubmit } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const registerMutation = useMutation({
    mutationFn: async (data) => {
      return await signIn(data);
    },
    onSuccess: (data, variables, context) => {
      // If you are logged
      //
      alert(data.data?.message);
      navigate("/auth/login");
    },
  });

  function onSubmit(data) {
    return registerMutation.mutate(data);
  }
  return (
    <>
      <h1 className="text-2xl">Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" id="id" {...register("id")} />
        <label
          htmlFor="username"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Username
        </label>
        <input
          id="username"
          type="text"
          placeholder="Votre nom d'utilisateur"
          {...register("username")}
          required
        />

        <label
          htmlFor="email"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Email
        </label>
        <input id="email" type="text" placeholder="Votre email" {...register("email")} required />

        <label
          htmlFor="password"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Votre mot de passe"
          {...register("password")}
          required
        />

        <label
          htmlFor="confirmpassword"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Confirm Password
        </label>
        <input
          id="confirmpassword"
          type="password"
          placeholder="Confirmez votre mot de passe"
          {...register("confirmpassword")}
          required
        />

        <button type="submit">Register</button>
      </form>

      <Link to="/auth/login">Already have an account? Login</Link>
    </>
  );
}
