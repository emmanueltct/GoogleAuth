import { Request,Response } from "express";
import { Router } from "express";
import passport from "passport";
import userLogin from "../controllers/userLogin";
import { updateProfile, userProfile } from "../controllers/userProfile";
import  upload  from "../config/multerConfig";
import { profile } from "console";
import { isValidImageUpdate } from "../middleware/uploadImageMiddleware";
import { isValidUser } from "../middleware/userValidation";
import { checkAuth } from "../middleware/checkAuth";
import '../controllers/signupControllers'
import {userSignup,users }from "../controllers/signupControllers";
const userRoutes=Router()



userRoutes.patch('/profile',checkAuth,upload.single("profile"),isValidImageUpdate,isValidUser,updateProfile)
userRoutes.get('/profile',checkAuth,userProfile)

userRoutes.get('/',users)

userRoutes.get('/signup',
passport.authenticate('google', { scope: ["profile","email"] }));

userRoutes.get('/callback',
    passport.authenticate('google',
    {failureRedirect: '/failure'}),
    userSignup    
)

userRoutes.get('/failure', async(req:Request,res:Response)=>{
    try{

        console.log('failure to login')
        res.status(401).send('Login failed')

    }catch(err){
        console.log(err)
    }
})

export default userRoutes;