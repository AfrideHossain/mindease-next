import { z } from "zod";

// sign up schema
export const signupSchema = z
  .object({
    // 🧍 Username
    name: z
      .string()
      .trim()
      .min(3, "Name must be at least 3 characters long.")
      .max(30, "Name cannot exceed 30 characters.")
      // must start with a letter, only letters, numbers, underscores, dots allowed
      .regex(
        /^[A-Za-z][A-Za-z0-9_\.]*$/,
        "Username must start with a letter and can only contain letters, numbers, underscores, or dots."
      ),

    // 📧 Email
    email: z
      .string()
      .trim()
      .min(1, "Email is required.")
      .email("Invalid email address.")
      // optional: restrict disposable or temporary email providers
      .refine(
        (email) =>
          !/@(tempmail|10minutemail|guerrillamail|yopmail|mailinator)\./i.test(
            email
          ),
        "Disposable email addresses are not allowed."
      ),

    // 🔒 Password
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long.")
      .max(64, "Password cannot exceed 64 characters.")
      .regex(/[A-Z]/, "Password must include at least one uppercase letter.")
      .regex(/[a-z]/, "Password must include at least one lowercase letter.")
      .regex(/[0-9]/, "Password must include at least one number.")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must include at least one special character."
      ),

    // ✅ Confirm password
    confirmPassword: z.string().min(1, "Please confirm your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

//   login schema
export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email({
    pattern: z.regexes.email,
    message: "Invalid email address",
  }),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
