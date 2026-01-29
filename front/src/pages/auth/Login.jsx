import { Link, useNavigate } from "react-router";
import { useState } from "react";

import { login } from "../../api/auth.js";
import { useMutation } from "@tanstack/react-query";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import "./Login.css";

const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberSession, setRememberSession] = useState(false);

  if (localStorage.getItem("first_name")) {
    return (
      <div className="login-page">
        <div className="login-card">
          <h1 className="login-title">Déjà connecté</h1>
          <p className="login-subtitle">
            Vous êtes connecté en tant que {localStorage.getItem("first_name")}
          </p>
          <Link to="/" className="login-btn">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  let navigate = useNavigate();

  const { register, handleSubmit } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useMutation({
    mutationFn: async (data) => {
      return await login(data);
    },
    onSuccess: (response, variables, context) => {
      localStorage.setItem("first_name", response.data?.first_name);
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
    onError: (error, variables, context) => {
      alert(error.response?.data?.error);
    },
  });

  function onSubmit(data) {
    return loginMutation.mutate(data);
  }

  return (
    <div className="login-page">
      <div className="login-card">
        {/* Icon */}
        <div className="login-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 17L15 12L10 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M15 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* Title */}
        <h1 className="login-title">CONNEXION</h1>
        <p className="login-subtitle">PROTOCOLE D'ACCÈS MARSAI</p>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
          <input type="hidden" id="id" {...register("id")} />

          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              EMAIL
            </label>
            <div className="input-wrapper">
              <svg className="input-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <input
                id="email"
                type="email"
                placeholder="agent@marsai.io"
                className="form-input"
                {...register("email")}
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              MOT DE PASSE
            </label>
            <div className="input-wrapper">
              <svg className="input-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="form-input"
                {...register("password")}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Options Row */}
          <div className="form-options">
            <label className="checkbox-wrapper">
              <input
                type="checkbox"
                checked={rememberSession}
                onChange={(e) => setRememberSession(e.target.checked)}
              />
              <span className="checkbox-label">MAINTENIR SESSION</span>
            </label>
            <a href="#" className="reset-link">RESET ?</a>
          </div>

          {/* Submit Button */}
          <button type="submit" className="login-btn" disabled={loginMutation.isPending}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {loginMutation.isPending ? "CONNEXION..." : "INITIALISER FLUX"}
          </button>
        </form>

        {/* Divider */}
        <div className="login-divider"></div>

        {/* Register Link */}
        <p className="register-prompt">
          NOUVEAU VOYAGEUR ? <Link to="/auth/register" className="register-link">Générer Identité</Link>
        </p>
      </div>
    </div>
  );
}
