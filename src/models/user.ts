import{DataTypes,Model,Optional} from "sequelize"
import sequelizeConnection  from "../db/dbCongig";


interface UserAttributes{
  id?:number,
  names?:string
  email?:string
  profile?:string
  googleId?:string
  createdAt?:Date,
  updatedAt?:Date
}

export interface UserInput extends Optional <UserAttributes,'id'>{}

export interface UserOutPuts extends Required<UserAttributes>{}

class User extends Model <UserAttributes,UserInput>implements UserAttributes{
  public id!:number;
  public names!:string;
  public email!:string;
  public profile!:string;
  public googleId!:string;
  public createdAt!:Date;
  public updatedAt!:Date;
}


  User.init({
    id:{
      allowNull:false,
      autoIncrement:true,
      primaryKey:true,
      type:DataTypes.BIGINT
    },
    names: {
       allowNull:false,
       type:DataTypes.STRING
    },
    email: {
      allowNull:false,
       type:DataTypes.STRING
    },
    profile: {
      allowNull:false,
       type:DataTypes.STRING
    },
    googleId: {
      allowNull:false,
       type:DataTypes.STRING
    },
  }, {
    timestamps:true,
    sequelize:sequelizeConnection,
    underscored:false
  });

 export default User