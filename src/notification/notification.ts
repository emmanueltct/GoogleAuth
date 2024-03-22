import nodemailer from 'nodemailer';
import { Interface } from 'readline';
import { Optional } from 'sequelize';

interface UPDATEDATA{
    name:string,
    profile:string
}
const mailNotification=(userData:Optional<UPDATEDATA,'name'&'profile'>,email:string)=>{


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
    
    user:'atlptestauth@gmail.com',
    pass:'vtpz vbis ipjc vior'
    }
  });
  let message=' '

if(userData.name){
    message += 'name: '+ userData.name + '<br/>'
}
if(userData.profile){
    message += 'profile: '+userData.profile +'<br/>'
}
  const mailOptions = {
    from: 'atlptestauth@gmail.com',
    to: email,
    subject: 'User information update',
    html: `<h3><u>Welcome</u></h3>
    <p> You have updated the following information :<br/> <b>${message}<br/>Thank you</b> </p>`
  };
  
  transporter.sendMail(mailOptions, function(error: Error | null, info: nodemailer.SentMessageInfo){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
  export  default mailNotification