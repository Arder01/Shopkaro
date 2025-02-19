import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import authRoutes from './src/users/user.route.js';

dotenv.config();
const app = express()
const port = process.env.PORT || 3000

//middleware setup

app.use(express.json({limit:'25mb'}));
app.use(express.urlencoded({extended:true,limit:'25mb'}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors({
  origin: 'http://localhost:5174',
  credentials: true 
}));



//Shopkaro1234
await mongoose.connect(process.env.DB_URL).then(()=>{
  console.log("MongoDB successfully connected");
}).catch(err=>{
  console.error("MongoDB connection error:",err);
  process.exit(1);
});
app.use('/api/auth', authRoutes);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
