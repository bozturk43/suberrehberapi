import {GraphQLObjectType,GraphQLID,GraphQLString} from 'graphql'
import { UserType } from "../TypeDefs/User";
import {Users} from "../../Entities/Users";

export const CREATE_USER ={
    type:UserType,
    args:{
        usr_first_name:{type:GraphQLString},
        usr_last_name:{type:GraphQLString},
        usr_email:{type:GraphQLString},
        usr_password:{type:GraphQLString},
    },
    resolve(parent:any,args:any){
        const {usr_first_name,usr_last_name,usr_email,usr_password} = args;
        Users.insert({
            usr_first_name,
            usr_last_name,
            usr_email,
            usr_password
        });
        return args;
    }
}