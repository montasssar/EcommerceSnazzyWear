"use client";

import React, { useState, useEffect } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { GoogleIcon } from "@/components/GoogleIcon";

export default function SignInForm() {
  const { signIn, signInWithGoogle, user, error, loading } = useAuthContext();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  const validate = () => {
    if (!email) {
      setFormError("Email is required");
      return false;
    }
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setFormError("Invalid email address");
      return false;
    }
    if (password.length < 6) {
      setFormError("Password must be at least 6 characters");
      return false;
    }
    setFormError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    await signIn(email, password);
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (err) {
      setFormError("Failed to sign in with Google");
      console.error(err);
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto mb-8 text-center">
        <h1 className="text-4xl font-bold text-pink-600 mb-2">Welcome Back!</h1>
        <p className="text-gray-700 text-lg">
          We're excited to see you again. Log in to find what fits You Best.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />

        {(formError || error) && (
          <p className="text-red-600 text-center">{formError || error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full py-2 text-white bg-pink-600 hover:bg-pink-700 rounded"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>

      <div className="max-w-md mx-auto mt-4">
        <button
          onClick={handleGoogleSignIn}
          type="button"
          className="btn-google w-full py-2 border border-gray-300 rounded flex items-center justify-center gap-2 hover:bg-gray-100"
        >
          <GoogleIcon className="w-5 h-5" />
          Sign In with Google
        </button>
      </div>
    </>
  );
}
