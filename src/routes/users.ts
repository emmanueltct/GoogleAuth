
import { Router } from "express";
import userSignup from "../controllers/signupControllers";
import userLogin from "../controllers/userLogin";
import { updateProfile, userProfile } from "../controllers/userProfile";
import  upload  from "../config/multerConfig";
import { profile } from "console";
import { isValidImageUpdate } from "../middleware/uploadImageMiddleware";
import { isValidUser } from "../middleware/userValidation";


const userRoutes=Router()

userRoutes.post('/signup',userSignup)
userRoutes.post('/login',userLogin)
userRoutes.get('/profile',userProfile)
userRoutes.patch('/profile',upload.single("profile"),isValidImageUpdate,isValidUser,updateProfile)



export default userRoutes;