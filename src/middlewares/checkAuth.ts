import passport from "passport";
import { Express,NextFunction,Request,Response } from "express";
import  Jwt  from "jsonwebtoken";
import '../passport'

function verifyAccessToken(token:any) {
    const secret = 'jwt';
    try {
      const decoded = Jwt.verify(token, secret);
      return { success: true, data: decoded };
    } catch (error) {
        // console.error(error)
      return { success: false};
    }
}


const checkAuth = async (req: Request, res: Response, next: NextFunction) => {

    try{
        
        const authHeader = req.headers['authorization'];
        const token = authHeader;  
        
        if (!token) {
             res.status(401).json({message:"Unauthorized Access"});
        }

        const result = verifyAccessToken(token);

        if (!result.success) {
             res.status(403).json({message:"Access token is invalid"});
        }
        
        req.user = result.data;

        next();

    }catch(err){
        console.log(err);
    }

}

export {checkAuth}