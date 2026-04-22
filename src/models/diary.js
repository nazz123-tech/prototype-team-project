import { model, Schema } from "mongoose";

const diarySchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    minlength: 1,
    maxlength: 64,
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    minlength: 1,
    maxlength: 1000
  },
  date: {
    type: String,
    default: () => new Date().toISOString().split('T')[0],
    match: [/^\d{4}-\d{2}-\d{2}$/, 'Please use YYYY-MM-DD format']
  },
  emotions: {
    type: [Schema.Types.ObjectId],
    ref: 'Emotion',
    required: true,
  }
},
{
  versionKey:false,
  timestamps:true
}
);

export const Diary=model("Diary", diarySchema)
