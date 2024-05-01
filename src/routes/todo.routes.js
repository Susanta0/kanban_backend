const {Router}=require("express")
const todoModel = require("../models/todo.schema")
const auth = require("../middleware/auth.middleware")
const access = require("../middleware/access.middleware")
const todoRouter=Router()



todoRouter.get("/", auth,async (req, res)=>{
    const{userId,user}=req.body
    try {
        const todo= await todoModel.find({userId})
        return res.status(200).send({message:"all todos are here", todo})
    } catch (error) {
        return res.status(400).send(error)
    }
})

todoRouter.post("/addtodo", auth, async (req, res)=>{
    const {studentName, studentId, course, platform, start, end, status, userId, userName }=req.body
    try {
        const user= await todoModel.findOne({studentId})
        if(user){
            return res.status(400).send("this user details already added")
        }else{
            const todoDetails= await new todoModel({studentName, studentId, course, platform, start, end, status, userId, userName})
            await todoDetails.save()
            return res.status(201).send("user details add successfully")
        }
        
    } catch (error) {
        return res.status(400).send(error)
    }
})

todoRouter.patch("/edittodo/:id", auth, async(req, res)=>{
    const {course, status }= req.body
    try {
        const editTodo= await todoModel.findByIdAndUpdate(req.params.id,{course, status })
        await editTodo.save()
        return res.status(201).send({message:"userDetails updated successfully"})
    } catch (error) {
        return res.status(400).send(error)
    }
})

todoRouter.delete("/deletetodo/:id", auth, async(req, res)=>{
    try {
        const deleteTodo= await todoModel.findByIdAndDelete(req.params.id)
        return res.status(201).send({message:"userDetails delete successfully",deleteTodo})
    } catch (error) {
        return res.status(400).send(error)
    }
})

module.exports=todoRouter