"use client";

import { LoginForm } from "@/components/authentication/LoginForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { loginSchema } from "@/lib/validations.auth";
import { useRouter, useSearchParams } from "next/navigation";
import { credentialLogin } from "@/app/actions/authenticationAction";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

export default function LoginPage() {
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(loginSchema) });
  // router setup
  const router = useRouter();
  const searchParams = useSearchParams();

  // Define the target redirect URL
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const { update } = useSession();

  // onsubmit handler
  const onSubmit = async (submissionData) => {
    setMessage(""); // Clear previous messages
    try {
      // If credentialLogin returns without throwing, it was successful.
      // If it fails, it throws an error, which is caught below.
      await credentialLogin(submissionData);

      // ✅ manually refresh session
      await update();

      toast.success("Login successful!");
      router.push(callbackUrl); // Redirect on success
    } catch (error) {
      console.error("sign in error=> ", error);

      // Provide a more specific user message based on the error if possible
      const errorMessage = error.message.includes("credential")
        ? "Invalid email or password."
        : "Login failed due to an unexpected error.";

      toast.error(errorMessage);
      setMessage(errorMessage);
    }
  };
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm
          register={register}
          handleSubmit={handleSubmit}
          onSubmitHandler={onSubmit}
          errors={errors}
          isSubmitting={isSubmitting}
          message={message}
        />
      </div>
    </div>
  );
}
