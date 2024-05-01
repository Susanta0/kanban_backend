const {Router}=require("express")
const userModel = require("../models/user.schema")
const userRouter=Router()
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
require("dotenv").config()
const SECRET_KEY = process.env.SECRET_KEY

userRouter.post("/register", async (req, res)=>{
    const {name, userName, email, password, role}=req.body
    try {
        const user= await userModel.findOne({email})
        if(user){
            res.status(400).send("user allready registered")
        }else{
            bcrypt.hash(password, 5, async(err, hash)=> {
                if(err){
                    return res.status(400).send("something went wrong")
                }
                const userDetails= new userModel({name, userName, email, password:hash, role})
                await userDetails.save()
                return res.status(201).send("user register successfully")
            });
        }
    } catch (error) {
        return res.status(400).send(error)
    }
})

userRouter.post("/login", async (req, res)=>{
    const{email, password}=req.body
    try {
        const user= await userModel.findOne({email})
        if(!user){
            return res.status(400).send("you should register first")
        }else{
            bcrypt.compare(password, user.password, async (err, result)=> {
                if(result){
                    const token = jwt.sign({ userId:user._id, userName:user.userName }, SECRET_KEY );
                    return res.status(200).send({message:"user login successfully", token})
                }else{
                    return res.status(400).send("wrong password")
                }
            });
        }
    } catch (error) {
        return res.status(400).send(error)
    }
})



module.exports=userRouter