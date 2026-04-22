import createHttpError from "http-errors";
import { Task } from "../models/task.js";

export const createTask=async(req,res)=>{
  const task= await Task.create({
    ...req.body
  });
  res.status(201).json(task);
}
