"use client";

import { LoginForm } from "@/components/authentication/LoginForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { loginSchema } from "@/lib/validations.auth";



export default function LoginPage() {
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(loginSchema) });
  // onsubmit handler
  const onSubmit = async (submissionData) => {
    console.log(submissionData);
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
