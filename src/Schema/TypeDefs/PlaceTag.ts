import {GraphQLObjectType,GraphQLID,GraphQLString,GraphQLInt, GraphQLNonNull, GraphQLList} from 'graphql'
import { UserType } from './User';
import { Users } from '../../Entities/Users';
import { ActivityCommentsType } from './ActivityComments';
import { ActivitiesComments } from '../../Entities/ActivitiesComments';
import { ActivitiesImages } from '../../Entities/ActivitiesImages';
import { ActivityImagesType } from './ActivityImages';
import { PlaceTags } from '../../Entities/PlaceTags';
import { PlaceType } from './Place';
import { Places } from '../../Entities/Places';

export const PlaceTagType:GraphQLObjectType = new GraphQLObjectType({
    name:"PlaceTag",
    fields:()=>({
        plc_tag_id:{type:GraphQLID},
        plc_tag_name:{type:GraphQLString},
        places:{
            type:new GraphQLList(PlaceType),
            async resolve(parent,args){
                const place_tag = await PlaceTags.findOne({
                    where:{plc_tag_id:parent.plc_tag_id},
                    relations:['places']
                })
                return place_tag?.places
            },
        },
    })
});