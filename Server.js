import express from 'express';
import authRoutes from './routes/authRoutes.js'
import productRoutes from './routes/productRoutes.js'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
const PORT=process.env.PORT || 5000;
const app=express()
//
dotenv.config()

app.use(express.json());
app.use('/api/users',authRoutes)
app.use('/api/users',productRoutes)

app.use('/',(req,res)=>{
    res.send("thsis is starting")
})

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log('db connected successfully'))
.catch(error => console.log(error))

app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`);
})



