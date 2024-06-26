import mailNotification from '../notification/notification';
import express, { Request, Response } from 'express';
import User from '../models/user';
import nodemailer from 'nodemailer'; 
import upload from '../config/multerConfig'; 
import cloudinary from '../config/cloudinary';

interface user{
  id:string,
  email:string,
}

const userProfile = async (req: Request, res: Response) => {
 // console.log("show me");
  try {
          const user = req.user as user
          // console.log(user.id)
          const user1= await User.findByPk(user.id);    
          // Return user profile
          return res.status(200).json({ user1 }); 

    }catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server Error' });
  }
};



const updateProfile = async (req: Request, res: Response) => {
  try {

    const userData={
      name:'',
      profile:'',
    }
    // Static ID for testing (replace with your desired static ID)
    const u = req.user as user
    // console.log(u)
    const user = await User.findByPk(u.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if(req.body.names){

      user.names = req.body.names;
      userData.name=req.body.names;
    }

    // Check if there is a file uploaded
    if (req.file) {
      // If file was uploaded, assuming it's an image
      const oldProfile = user.profile;
      
      // Upload new image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'profiles', // Optional: Upload to a specific folder in Cloudinary
        // Add any other Cloudinary upload options here
      });

      // Update user's names, profile image URL, and keep existing profile info
      user.profile = result.secure_url; // Store the Cloudinary URL
      userData.profile = result.secure_url;

      // Delete old image from Cloudinary if it exists
      if (oldProfile) {
        try {
          const publicId = oldProfile.split('/').pop()?.split('.')[0]; // Extract public_id
          await cloudinary.uploader.destroy(publicId as string); // Delete old image from Cloudinary
        } catch (deleteError) {
          console.error('Error deleting old image from Cloudinary:', deleteError);
        }
      }
    }
    // Save updated user data
    await user.save();
  
   const email= user.email;
   
   const userNotification = await mailNotification(userData,email);
  

    return res.status(200).json({ message: 'Profile updated successfully', user });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server Error' });
  }
};

export { userProfile, updateProfile };
