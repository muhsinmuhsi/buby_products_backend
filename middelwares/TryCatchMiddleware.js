const TryCatchMiddleware=(handler)=>{
    return async (req,res,next)=>{
        try {
            await handler(req,res,next);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                status:'failue',
                messege:'error',
                error_messege:error.messege
            });
        }
        return 
    }
}

export default TryCatchMiddleware;