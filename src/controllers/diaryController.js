import createHttpError from "http-errors";
import { Diary } from "../models/diary.js";
import { Emotion } from "../models/emotion.js";

export const createDiaryNote=async(req,res)=>{
  if (!req.body.emotions || req.body.emotions.length === 0) {
            return res.status(400).json({ message: "Поле emotions не може бути порожнім" });
        }
    const diaryNote= await Diary.create({
      ...req.body
    })
    const populatedDiaryNote= await Diary.findById(diaryNote._id).populate('emotions')
    res.status(201).json(populatedDiaryNote);
}
