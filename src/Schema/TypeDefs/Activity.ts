import {GraphQLObjectType,GraphQLID,GraphQLString,GraphQLInt, GraphQLNonNull, GraphQLList} from 'graphql'
import { UserType } from './User';
import { Users } from '../../Entities/Users';
import { ActivityCommentsType } from './ActivityComments';
import { ActivitiesComments } from '../../Entities/ActivitiesComments';
import { ActivitiesImages } from '../../Entities/ActivitiesImages';
import { ActivityImagesType } from './ActivityImages';
import { ActivityTagType } from './ActivityTag';
import { Activities } from '../../Entities/Activities';

export const ActivityType:GraphQLObjectType = new GraphQLObjectType({
    name:"Activity",
    fields:()=>({
        act_id:{type:GraphQLID},
        act_name:{type:GraphQLString},
        act_description:{type:GraphQLString},
        act_date:{type:GraphQLString},
        act_images:{
            type:new GraphQLList(ActivityImagesType),
            resolve(parents,args){
                return ActivitiesImages.find({where:{activity:parents.act_id}})
            }
        },
        act_comment:{
            type:new GraphQLList(ActivityCommentsType),
            resolve(parents,args){
                return ActivitiesComments.find({where:{act_id:parents.act_id}})
            }
        },
        users:{
            type:new GraphQLList(UserType),
            resolve(parent,args){
                return Users.find({where:{usr_id:parent.usr_id}});
            }
        },
        activity_tags:{
            type:new GraphQLList(ActivityTagType),
            async resolve(parent,args){
                const activity = await Activities.findOne({
                    where:{act_id:parent.act_id},
                    relations:['activity_tags']
                })
                return activity?.activity_tags
            },
        },
    })
});