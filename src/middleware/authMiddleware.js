import jwt from 'jsonwebtoken';

function authMiddleware(req,res,next){

    const token=req.headers['authorization'];
    try {
        jwt.verify(token,process.env.JWT_SECRET,(error,decoded)=>{
            if(error){
                return res.status(401).json({message:'Invalid Token'})
            }
            req.userId=decoded.id;
            next();
        })
    } catch (error) {
        console.log(error.message);
        res.sendStatus(401);
    }
}

export default authMiddleware;