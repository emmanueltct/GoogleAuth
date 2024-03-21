import express, { Request, Response } from 'express';
import User from '../models/user';
import nodemailer from 'nodemailer'; 
import upload from '../config/multerConfig'; 
import cloudinary from '../config/cloudinary';


const userProfile = async (req: Request, res: Response) => {
 // console.log("show me");
const user1= await User.findOne({where:{id:1}});


  try {
    if(user1){
    const userId = user1.id as number | undefined; 
    
    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return user profile
    return res.status(200).json({ user });
  } }catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server Error' });
  }
};


const updateProfile = async (req: Request, res: Response) => {
  try {

    const { names} = req.body;
 console.log(req.body)
    // Static ID for testing (replace with your desired static ID)
    const staticUserId = 1;

    const user = await User.findByPk(staticUserId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
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
      user.names = names;
      user.profile = result.secure_url; // Store the Cloudinary URL

      // Delete old image from Cloudinary if it exists
      if (oldProfile) {
        try {
          const publicId = oldProfile.split('/').pop()?.split('.')[0]; // Extract public_id
          await cloudinary.uploader.destroy(publicId as string); // Delete old image from Cloudinary
        } catch (deleteError) {
          console.error('Error deleting old image from Cloudinary:', deleteError);
        }
      }
    } else {
      // If no file was uploaded, update user's names
      user.names = names;
    }

    // Save updated user data
    await user.save();
    

    // Respond with success message
    return res.status(200).json({ message: 'Profile updated successfully', user });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server Error' });
  }
};




const notifyProfileUpdate = async (email: string) => {
  // Implement your email notification logic here
  // Example using nodemailer
  /*
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER || 'your_email@gmail.com',
      pass: process.env.EMAIL_PASS || 'your_password',
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER || 'your_email@gmail.com',
      to: email,
      subject: 'Profile Update Notification',
      text: 'Your profile has been successfully updated.',
    });

    console.log('Profile update notification sent');
  } catch (error) {
    console.error('Error sending email:', error);
  }
  */
};

export { userProfile, updateProfile };
