import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { errors } from "celebrate";


import { connectMongoDB } from './db/connectToMongoDB.js';
import { logger } from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import cookieParser from 'cookie-parser';

import taskRoutes from './routes/taskRoutes.js'
import weekRoutes from './routes/weekRoutes.js'
import diaryRoutes from './routes/diaryRoutes.js'

const app = express();
const PORT = process.env.PORT ?? 3000;


app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(logger);

app.use(taskRoutes);
app.use(weekRoutes);
app.use(diaryRoutes);

app.use(notFoundHandler);
app.use(errorHandler);


await connectMongoDB();


app.listen(PORT,()=>{console.log(`Server is running on port ${PORT}`);});


