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
  





