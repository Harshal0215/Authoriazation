// const {Schema} = require('mongoose')
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
const UserSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        min:9,
        max:20,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    }
},{timestamps:true})
    UserSchema.pre('save',async function(next){
        console.log(this);
        if(this.password && this.isModified('password'))
        {
            const salt =  await bcrypt.genSalt(10);
            this.password =  await bcrypt.hash(this.password,salt)
        }
        next()
    })
const User = mongoose.model('User',UserSchema)
export default User