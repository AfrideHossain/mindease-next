import mongoose, { Schema, model, models } from "mongoose";
import bcrypt from "bcryptjs";


const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// define a pre hook (do something just before sent it to database)
UserSchema.pre("save", async (next) => {
  if (this.isModified(this.password)) {
    this.password = await bcrypt.hash(this.password, 20);
  }
  next();
});

const User = models.User || model("User", UserSchema);
export default User;
