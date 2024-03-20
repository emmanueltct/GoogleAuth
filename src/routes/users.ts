
import { Router } from "express";
import userSignup from "../controllers/signupControllers";
import userLogin from "../controllers/userLogin";
import { updateProfile, userProfile } from "../controllers/userProfile";

const userRoutes=Router()

userRoutes.post('/signup',userSignup)
userRoutes.post('/login',userLogin)
userRoutes.get('/profile',userProfile)
userRoutes.patch('/profile',updateProfile)



export default userRoutes;