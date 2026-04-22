import { Router } from "express";
import { getAllWeekData} from "../controllers/weekController.js";

const router=Router();

router.get('/api/weeks/:weekNumber', getAllWeekData);

export default router;
