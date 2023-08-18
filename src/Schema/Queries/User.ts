import {GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString} from 'graphql';
import jwt from 'jsonwebtoken';
import { UserType } from '../TypeDefs/User';
import {Users} from '../../Entities/Users';
const JWT_SECRET = 'your_jwt_secret_key';
const LoginReturnType = new GraphQLObjectType({
  name:"LoginResult",
  fields:()=>({
    user: { type: UserType },
    token: { type: GraphQLString },
  })
})

export const GET_ALL_USERS ={
    type:new GraphQLList(UserType),
    resolve(){
        return Users.find();
    },
}
export const GET_USER_BY_ID = {
    type: UserType,
    args: {
      id: { type: GraphQLInt },
    },
    resolve(parent:any, args:any) {
      return Users.findOne({where:{usr_id:args.id}});
    },
  };
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





