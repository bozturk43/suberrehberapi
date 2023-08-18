import {GraphQLObjectType,GraphQLID,GraphQLString,GraphQLInt, GraphQLNonNull} from 'graphql'
import { ActivityType } from './Activity';
import { Activities } from '../../Entities/Activities';

export const ActivityImagesType:GraphQLObjectType = new GraphQLObjectType({
    name:"ActivityImages",
    fields:()=>({
        img_id:{type:GraphQLID},
        img_data:{type:GraphQLString},
        activity:{
            type:ActivityType,
            resolve(parent,args){
                return Activities.findOne({where:{act_id:parent.act_id}});
            }
        }

    })
});