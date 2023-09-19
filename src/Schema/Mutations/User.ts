import {GraphQLObjectType,GraphQLID,GraphQLString, GraphQLNonNull} from 'graphql'
import { UserType } from "../TypeDefs/User";
import {Users} from "../../Entities/Users";
import jwt from 'jsonwebtoken';
const JWT_SECRET = 'your_jwt_secret_key';

const LoginReturnType = new GraphQLObjectType({
  name:"LoginResult",
  fields:()=>({
    user: { type: UserType },
    token: { type: GraphQLString },
  })
})

export const CREATE_USER ={
    type:UserType,
    args:{
        usr_first_name:{type:GraphQLString},
        usr_last_name:{type:GraphQLString},
        usr_email:{type:GraphQLString},
        usr_password:{type:GraphQLString},
        usr_device_id:{type:GraphQLString}
    },
    resolve(parent:any,args:any){
        const {usr_first_name,usr_last_name,usr_email,usr_password,usr_device_id} = args;
        Users.insert({
            usr_first_name,
            usr_last_name,
            usr_email,
            usr_password,
            usr_device_id
        });
        return args;
    }
}
export const LOGIN_USER = {
    type: LoginReturnType, // Token dönecek
    args: {
        usr_email: { type: new GraphQLNonNull(GraphQLString) },
        usr_password :{ type: new GraphQLNonNull(GraphQLString)}
    },
    async resolve(parent: any, args: any) {
        const { usr_email,usr_password } = args;
        const user = await Users.findOne({ where: { usr_email } });
        if(user && user.usr_password === usr_password){
          const token = jwt.sign(
            { userId: user.usr_id, usr_email: user.usr_email },
            JWT_SECRET,
            { expiresIn: '12h' } // Tokenın süresini belirtin (örneğin, 2 saat)
        );
            const result = {
              user,token
            }
        return result;
        }
        else{
          return "E Mail ya da Şifre Hatalı"
        }
    },
};