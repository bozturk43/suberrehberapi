import {GraphQLObjectType,GraphQLID,GraphQLString, GraphQLList} from 'graphql'
import { PostType } from './Post';
import { Posts } from '../../Entities/Posts';
import {Request,Response, NextFunction, } from 'express';

export const UserType = new GraphQLObjectType({
    name:"User",
    fields:()=>({
        usr_id:{type:GraphQLID},
        usr_first_name:{type:GraphQLString},
        usr_last_name:{type:GraphQLString},
        usr_email:{type:GraphQLString},
        usr_password:{type:GraphQLString},
        posts:{
            type:new GraphQLList(PostType),
            resolve(parent,args,context){
                if(!context.user){
                    throw new Error('Kimlik doğrulama gerekiyor');
                }
                return Posts.find({where:{usr_id:parent.usr_id}});
            }
        }
    })
});