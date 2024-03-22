import express, {Request, Response } from 'express';
import {USER} from '../types/userTypes';
import passport, { session } from 'passport';
import  {Strategy as GoogleStrategy} from 'passport-google-oauth20'
import dotenv from 'dotenv';
import Jwt from 'jsonwebtoken'
import User from '../models/user';
import '../passport'

dotenv.config()


const userSignup = async(req:Request,res:Response)=>{

    try{   
        const user = req?.user as USER

        const checkUser = await User.findOne({ where: { email: `${user.emails[0].value}` } })   

        if(checkUser){      
            const body = {
                id:checkUser?.id, 
                email:checkUser?.email                   
            };              
            const token = Jwt.sign(body, "jwt", { expiresIn: '1h' });   
            res.status(201).json(
                {
                    message:`Successful Signed in `,
                    user:checkUser?.dataValues,
                    token:token
                }                   
            )
        }
        else{

            const newUser =  await User.findOrCreate({
                where:{
                    names: user?.displayName,
                    email: user?.emails[0].value,
                    profile: user?.photos[0].value,
                    googleId: user?.id
                }
            });

            const nUser = newUser[0].dataValues

            const body = {
                id:nUser?.id, 
                email:nUser?.email                   
            };

            const token = Jwt.sign(body, "jwt", { expiresIn: '1h' });   
            
            res.status(201).json({
                message:'signed Up successfully',
                user: newUser,
                token:token
            })
        }        
    }
    catch(err){
        res.status(500).json({message: err})
    }
        
}
const users =async(req:Request, res:Response)=>{
    try{
        const user = await User.findAll()
        // console.log(user)
        res.status(200).json(user)
    }catch(err){
        res.status(500).json({message: err})
    }
}

export  {userSignup, users}