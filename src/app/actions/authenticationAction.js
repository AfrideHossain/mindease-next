"use server";

import { signIn, signOut } from "@/auth";
import { revalidatePath } from "next/cache";

export async function credentialLogin(formData) {
  const { email, password } = formData;

  try {
    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    // ✅ revalidate the session on client
    revalidatePath("/"); // you can choose a specific route if needed

    return response;
  } catch (error) {
    console.log("Credential login error: ", error);
    throw error;
  }
}

export async function logoutUser() {
  await signOut({ redirect: false }); // don't redirect automatically
  // return something so client knows it finished
  return { success: true };
}
