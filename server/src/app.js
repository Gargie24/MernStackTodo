import express from 'express';
import apiRoute,{apiProtected} from './routes/api.js';
import mongoose from 'mongoose';
import {DB_CONNECT} from './utils/constants.js'
import AuthMiddleware from "./middlewares/AuthMiddleware.js"
import cors from 'cors';
const app = express();
const PORT = 8000;
app.use(cors())
mongoose.connect(DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('Connected to MongoDB');
});
app.use(express.json())
app.use('/api/',apiRoute);
app.use('/api/',AuthMiddleware,apiProtected);
app.listen(PORT,()=>console.log("server is running"))