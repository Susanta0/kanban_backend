const jwt =require("jsonwebtoken")
const SECRET_KEY=process.env.SECRET_KEY

const auth=(req, res, next)=>{
    const header= req.headers["authorization"]
    const token = header?.split(" ")[1]
    if(!token){
        return res.status(400).send("token is not provided")
    }else{
        jwt.verify(token, SECRET_KEY , (err, decoded) =>{
            req.body.userId = decoded.userId,
            req.body.userName = decoded.userName
            next()
            console.log(decoded)
        });
    }
}

module.exports=auth