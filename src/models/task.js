import { model, Schema } from 'mongoose';

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: 1,
      maxlength: 96,
    },
    date: {
      type: String,
      required: true,
      default: () => new Date().toISOString().split('T')[0],
      match: [/^\d{4}-\d{2}-\d{2}$/, 'Please use YYYY-MM-DD format'],
    },
    isDone: {
      type: Boolean,
      default: false,
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

export const Task=model("Task",taskSchema);
