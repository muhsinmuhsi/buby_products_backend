import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const usertocken=(req,res,next)=>{
    try {
        const tocken=req.headers["authorization"]
        console.log(req.headers);
        
        if(!tocken){
            return res.status(403).json({messege:'tocken not provided'})
        }
        jwt.verify(tocken,process.env.JWT_SECRET,(error,decode)=>{
            if(error){
                res.status(401).json({messege:'unauthorized'})
            }
            req.email=decode.email;
            console.log(decode,'decode');
        
            next();            
        })
    } catch (error) {
    res.status(500).json({ message: "Server error" });
    next(error);
    }
}