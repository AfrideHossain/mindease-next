import { Schema, models, model } from "mongoose";

const JournalSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: { type: String },
    content: { type: String },
    mood: {
      type: String,
      enum: ["happy", "sad", "neutral", "anxious", "excited"],
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps }
);

const Journal = models?.Journal || model("Journal", JournalSchema);
export default Journal;
