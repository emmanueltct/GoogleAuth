import { Request, Response, NextFunction } from 'express';
import User from '../models/user';
import { userValidation } from '../validation/userValidation';

import passport from 'passport';




export const isValidUser=async(req:Request,res:Response,next:NextFunction)=>{
    const valid=userValidation(req.body)
    if(valid.error){
        const errors=valid.error;
        const err=errors?.details[0].message
        const inputError=err.replace(/['"]+/g, '')
        return res.status(403).json({ inputError});
    }else{
        next()
    }
}


   