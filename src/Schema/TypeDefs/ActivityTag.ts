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

export const ActivityTagType:GraphQLObjectType = new GraphQLObjectType({
    name:"ActivityTag",
    fields:()=>({
        act_tag_id:{type:GraphQLID},
        act_tag_name:{type:GraphQLString},
    })
});