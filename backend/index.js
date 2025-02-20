import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

//all routes, pehle hi comments bana lene chahiye the
import authRoutes from './src/users/user.route.js';
import productRoutes from './src/products/products.route.js';
import reviewRoutes from './src/reviews/reviews.router.js';


dotenv.config();
const app = express()
const port = process.env.PORT || 3000

// middleware setup
app.use(express.json({limit: "25mb"}));
// app.use((express.urlencoded({limit: "25mb"})));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))


//Shopkaro1234
await mongoose.connect(process.env.DB_URL).then(()=>{
  console.log("MongoDB successfully connected");
}).catch(err=>{
  console.error("MongoDB connection error:",err);
  process.exit(1);
});
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/reviews', reviewRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
