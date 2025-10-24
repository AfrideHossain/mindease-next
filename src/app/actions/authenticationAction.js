"use server";

import { signIn, signOut } from "@/auth";

export async function credentialLogin(formData) {
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

// logout
export async function logoutUser() {
  await signOut({ redirectTo: "/" });
}
