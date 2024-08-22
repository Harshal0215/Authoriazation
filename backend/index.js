import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import colors from 'colors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from './models/User.js'
import jwt from 'jsonwebtoken'
dotenv.config()
const app = express()
app.use(cors({
    origin:[
        'http://localhost:5173'
    ]
}))
app.use(express.json())
app.get('/',(req,res)=>{
    res.send('hey')
})
mongoose.connect(`${process.env.MONGO_URI}`).then(()=>{
    app.listen(3001,()=>{
        console.log('server is listening'.red);
    })
}).catch((err)=>{
    console.log(err.message);
})
app.post('/create',async(req,res)=>{
    const {email,name,password} = req.body;
    const user = new User({email,name,password})
    const token = await jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"30m"})
    await user.save()
    res.json({user,token})
})

