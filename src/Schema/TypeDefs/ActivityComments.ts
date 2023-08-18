import {GraphQLObjectType,GraphQLID,GraphQLString,GraphQLInt, GraphQLNonNull} from 'graphql'
import { UserType } from './User';
import { Users } from '../../Entities/Users';
import { ActivityType } from './Activity';
import { Activities } from '../../Entities/Activities';

export const ActivityCommentsType:GraphQLObjectType = new GraphQLObjectType({
    name:"ActivityComments",
    fields:()=>({
        cmt_id:{type:GraphQLID},
        cmt_description:{type:GraphQLString},
        user:{
            type:UserType,
            resolve(parent,args){
                return Users.findOne({where:{usr_id:parent.usr_id}});
            }
        },
        activity:{
            type:ActivityType,
            resolve(parent,args){
                return Activities.findOne({where:{act_id:parent.act_id}});
            }
        }

    })
});