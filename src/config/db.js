const {connect}=require("mongoose")
const connectDb= ()=>{
    connect(process.env.MONGODB_URL)
}
module.exports=connectDb