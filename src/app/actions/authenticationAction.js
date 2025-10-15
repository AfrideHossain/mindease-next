"use server";

import { signIn } from "@/auth";

export async function credentialLogin(formData) {
  // const email = formData.get("email");
  // const password = formData.get("password");
  const { email, password } = formData;

  try {
    // start login
    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return response;
  } catch (error) {
    console.log("Credential login error: ", error);
    throw error;
  }
}
