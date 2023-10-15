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
import { PlaceTagType } from './PlaceTag';
import { PlaceTagsCategories } from '../../Entities/PlaceTagsCategories';

export const PlaceTagCategoryType:GraphQLObjectType = new GraphQLObjectType({
    name:"PlaceTagCategory",
    fields:()=>({
        plc_tag_cat_id:{type:GraphQLID},
        plc_tag_cat_name:{type:GraphQLString},
        plc_tags:{
            type:new GraphQLList(PlaceTagType),
            async resolve(parent,args){
                const category = await PlaceTagsCategories.findOne({
                    where:{plc_tag_cat_id:parent.plc_tag_cat_id},
                    relations:['plc_tags']
                })
                return category?.plc_tags
            },
        },
    })
});