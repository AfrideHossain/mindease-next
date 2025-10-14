"use client";

import { SignupForm } from "@/components/authentication/SignUpForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/lib/validations.auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function SignUpPage() {
  const [message, setMessage] = useState("");

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(signupSchema) });

  const onSubmit = async (submissionData) => {
    // console.log(submissionData);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });
      if (res.ok) {
        const response = await res.json();
        if (response.success) {
          router.push("/login");
        } else {
          toast.error(`${response.error}`);
        }
      }
    } catch (error) {
      console.log("Registration UI error: ", error);
    }
  };
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignupForm
          register={register}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
          isSubmitting={isSubmitting}
          message={message}
        />
      </div>
    </div>
  );
}
