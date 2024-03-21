import express, { Express, Request, Response } from 'express';
import mailNotification from '../notification/notification';


const userProfile=async(req:Request,res:Response)=>{
    console.log('hello');
 
}


const updateProfile=async(req:Request,res:Response)=>{
    const userData={
        name:'Prince Rwigimba',
        profile:'profile',
    }
     const email= 'emmanuelmunezero@gmail.com';
mailNotification(userData,email)
return res.send();
}


export{ userProfile, updateProfile}