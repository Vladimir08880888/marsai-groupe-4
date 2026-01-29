import { Link, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { signIn } from "../../api/auth.js";

// Schéma de validation Zod
const registerSchema = z
  .object({
    first_name: z.string().min(1, "Le prénom est requis"),
    last_name: z.string().min(1, "Le nom est requis"),
    email: z.string().email("Email invalide"),
    password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
    confirmpassword: z.string(),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmpassword"],
  });

export function Register() {
  const navigate = useNavigate();

  // React Hook Form
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema),
  });

  // Mutation pour appeler le backend
  const registerMutation = useMutation({
    mutationFn: async (data) => {
      // Envoi au backend
      return await signIn({
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: data.password,
        // role est optionnel, backend met "PRODUCER" par défaut
      });
    },
    onSuccess: (res) => {
      alert(res.data.message);
      navigate("/auth/login"); // redirection après inscription
    },
    onError: (err) => {
      alert(err.response?.data?.error || "Une erreur est survenue");
    },
  });

  // Fonction appelée au submit
  const onSubmit = (data) => {
    registerMutation.mutate(data);
  };

  // Si déjà connecté
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

  return (
    <>
      <h1 className="text-2xl">Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Prénom</label>
        <input type="text" {...register("first_name")} required />
        {errors.first_name && <span>{errors.first_name.message}</span>}

        <label>Nom</label>
        <input type="text" {...register("last_name")} required />
        {errors.last_name && <span>{errors.last_name.message}</span>}

        <label>Email</label>
        <input type="email" {...register("email")} required />
        {errors.email && <span>{errors.email.message}</span>}

        <label>Mot de passe</label>
        <input type="password" {...register("password")} required />
        {errors.password && <span>{errors.password.message}</span>}

        <label>Confirmez le mot de passe</label>
        <input type="password" {...register("confirmpassword")} required />
        {errors.confirmpassword && <span>{errors.confirmpassword.message}</span>}

        <button type="submit">Register</button>
      </form>

      <Link to="/auth/login">Already have an account? Login</Link>
    </>
  );
}
