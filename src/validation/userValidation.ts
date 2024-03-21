import Joi from "joi";
import User from "../models/user"

export const userValidation=(Users:User)=>{
    const userValidationSChema=Joi.object<User>().keys({
        names:Joi.string().min(3).max(40).regex(/^([a-zA-Z]{3,})+((\s)[a-zA-Z]{2,})?$/).required().label("Names")
        .messages({
          "string.min": "Provided name is too short! please write both names", 
          "string.max": "Provided name is too long! not greater than 40 characters",  
          "object.regex": "invalid name!! ",
          "string.pattern.base": "Name sholud not contain any number or symbols"
        }),
      
    })

    return userValidationSChema.validate(Users)
}

