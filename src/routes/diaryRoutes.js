import { Router } from "express";
import { createDiaryNote} from "../controllers/diaryController.js";

const router=Router();

router.post('/api/diary', createDiaryNote);

export default router;
