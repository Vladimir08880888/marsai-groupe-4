import { Link, useNavigate } from "react-router";
import { login } from "../../api/auth.js";
import { useMutation } from "@tanstack/react-query";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(1, "Mot de passe requis"),
});

export function Login() {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useMutation({
    mutationFn: async (data) => {
      return await login(data);
    },
    onSuccess: (response) => {
      localStorage.setItem("first_name", response.data.first_name);
      localStorage.setItem("email", response.data?.email);
      localStorage.setItem("role", response.data?.role);
      localStorage.setItem("token", response.data?.token);

      switch (response.data?.role) {
        case "ADMIN":
          navigate("/admin");
          break;
        case "JURY":
          navigate("/");
          break;
        default:
          navigate("/");
          break;
      }
    },
    onError: (error) => {
      alert(error.response?.data?.error || "Erreur lors de la connexion");
    },
  });

  const isLoggedIn = !!localStorage.getItem("email");

  if (isLoggedIn) {
    return (
      <>
        <h1 className="text-2xl">
          You are already logged in as {localStorage.getItem("email")}
        </h1>
        <Link to="/">Return to homepage</Link>
      </>
    );
  }

  const onSubmit = (data) => {
    loginMutation.mutate(data);
  };

  return (
    <>
      <h1 className="text-2xl">Connexion</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Email
          </label>
          <input
            id="email"
            type="email"         
            placeholder="your@email.com"
            className="border p-2 rounded w-full"
            {...register("email")}
            required
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
             Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            className="border p-2 rounded w-full"
            {...register("password")}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loginMutation.isPending ? "Connecting..." : "Log in"}
        </button>
      </form>

      <p className="mt-4">
       Don't have an account yet?{" "}
        <Link to="/auth/register" className="text-blue-600 hover:underline">
          Sign up
        </Link>
      </p>
    </>
  );
} 