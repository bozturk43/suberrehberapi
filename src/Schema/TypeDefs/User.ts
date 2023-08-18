import {GraphQLObjectType,GraphQLID,GraphQLString, GraphQLList} from 'graphql'
import {Request,Response, NextFunction, } from 'express';
import { ActivityType } from './Activity';
import { Activities } from '../../Entities/Activities';

export const UserType = new GraphQLObjectType({
    name:"User",
    fields:()=>({
        usr_id:{type:GraphQLID},
        usr_first_name:{type:GraphQLString},
        usr_last_name:{type:GraphQLString},
        usr_email:{type:GraphQLString}, 
        usr_password:{type:GraphQLString},
        activities:{
            type:new GraphQLList(ActivityType),
            resolve(parents,args,context){
                if(!context.user){
                    throw new Error('Kimlik doğrulama gerekiyor');
                }
                return Activities.find({where:{act_id:parents.act_id}})
            }
        }
    })
});