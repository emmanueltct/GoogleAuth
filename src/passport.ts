import passport from 'passport';
import  {Strategy as GoogleStrategy} from 'passport-google-oauth20'
import dotenv from 'dotenv';
import Jwt from 'jsonwebtoken'

//passport configuration google authentication
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID as string,
    clientSecret:process.env.CLIENT_SECRET as string,
    callbackURL: process.env.CLIENT_CALLBACK
},

function(accessToken, refreshToken, profile, cb) {

        cb(null, profile)
}
));

passport.serializeUser((user: any, done) => {
  done(null, user);
});


passport.deserializeUser((user:any,done)=>{
  done(null, user);
})