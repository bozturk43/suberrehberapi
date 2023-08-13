import {GraphQLObjectType,GraphQLID,GraphQLString,GraphQLInt, GraphQLNonNull} from 'graphql'
import { UserType } from './User';
import { Users } from '../../Entities/Users';
import { Posts } from '../../Entities/Posts';
import { PostType } from './Post';

export const CommentType:GraphQLObjectType = new GraphQLObjectType({
    name:"Comment",
    fields:()=>({
        cmt_id:{type:GraphQLID},
        cmt_description:{type:GraphQLString},
        cmt_type:{type:GraphQLInt},
        post:{
            type:PostType,
            resolve(parent,args){
                return Posts.findOne({where:{pst_id:parent.pst_id}});
            }
        },
        user:{
            type:UserType,
            resolve(parent,args){
                return Users.findOne({where:{usr_id:parent.usr_id}});
            }
        }

    })
});