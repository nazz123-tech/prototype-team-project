import createHttpError from "http-errors";
import { MomState } from "../models/momState.js";
import { calcucaleWeek, calculateDays } from "../services/pregnancyService.js";
import { User } from "../models/user.js";
import { BabyState } from "../models/babyState.js";

export const getDashbordInfo =async (req,res)=>{
 const userId=req.user._id;
 const user = await User.findById(userId);
  if (!user) {
      throw createHttpError(404, "Користувача не знайдено");
    }
  const week = calculateWeek(user.dueDate);
  const days = calculateDays(user.dueDate,week);
  const babyState = await BabyState.findOne({ weekNumber: week });
  if(!babyState){
    throw createHttpError(404, "Дані про цей тиждень не існують")
  }
    const dayIndex = new Date().getDay();
    const adjustedIndex = dayIndex === 0 ? 6 : dayIndex - 1;
    const tipOfTheDay = babyState.momDailyTips[adjustedIndex] || babyState.momDailyTips[0];
  res.status(200).json({
    data: {
        currentWeek: week,
        daysToMeeting: days,
        baby: {
          analogy: babyState.analogy,
          size: babyState.babySize,
          weight: babyState.babyWeight,
          image: babyState.image,
          description: babyState.babyDevelopment,
          interestingFact: babyState.interestingFact
        },
        dailyAdvice: tipOfTheDay
      }
  })
}
export const getBabyStateByWeek =async (req,res)=>{
    const {currentWeek}=req.params;
    const week = parseInt(currentWeek, 10);
    const babyState= await BabyState.findOne({
      weekNumber: week,
    });
    if(!babyState){
      throw createHttpError(404, "Дані за цей тиждень відсутні")
    }
    res.status(200).json(babyState);
}
export const getMomStateByWeek =async (req,res)=>{
    const {currentWeek}=req.params;
    const week = parseInt(currentWeek, 10);
    const momState= await MomState.findOne({
      weekNumber: week,
    });
    if(!momState){
      throw createHttpError(404, "Дані за цей тиждень відсутні")
    }
    res.status(200).json(momState);
}



