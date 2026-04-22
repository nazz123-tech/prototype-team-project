import { model,Schema } from "mongoose";
const emotionSchema = new Schema({
  title: { type: String, required: true }
}, { collection: 'emotions', versionKey: false });

export const Emotion=model("Emotion",emotionSchema)
