import { Request,Response } from "express";
import { Router } from "express";
import {userSignup,users }from "../controllers/signupControllers";
import userLogin from "../controllers/userLogin";
import { updateProfile, userProfile } from "../controllers/userProfile";
import passport from "passport";
import '../controllers/signupControllers'
import { checkAuth } from "../middlewares/checkAuth";


const userRoutes = Router()

userRoutes.get('/profile',checkAuth,userProfile)
userRoutes.patch('/profile',checkAuth,updateProfile)

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