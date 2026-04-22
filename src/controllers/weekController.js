import createHttpError from "http-errors";
import { MomState } from "../models/momState.js";

export const getAllWeekData = async (req, res, next) => {
    const { weekNumber } = req.params;

    const filter = { $match: { weekNumber: Number(weekNumber) } };

    const magnit = {
  $lookup: {
    from: "baby_states",
    localField: "weekNumber",
    foreignField: "weekNumber",
    as: "baby_info"
  }
    };

    const unpack = { $unwind: "$baby_info" };

    const week = await MomState.aggregate([
  filter,
  magnit,
  unpack
    ]);

if(!week){
  throw createHttpError(404, "Week not found")
}

res.json(week[0])
};
