import {GraphQLObjectType,GraphQLID,GraphQLString,GraphQLInt, GraphQLNonNull, GraphQLList, GraphQLFloat} from 'graphql'
import { PlaceTagType } from './PlaceTag';
import { Places } from '../../Entities/Places';
import { PlaceImagesType } from './PlaceImages';

export const PlaceType:GraphQLObjectType = new GraphQLObjectType({
    name:"Place",
    fields:()=>({
        plc_id:{type:GraphQLID},
        plc_google_id:{type:GraphQLString},
        plc_name:{type:GraphQLString},
        plc_description:{type:GraphQLString},
        plc_longtitude:{type:GraphQLFloat},
        plc_latitude:{type:GraphQLFloat},
        plc_images:{
            type:new GraphQLList(PlaceImagesType),
            async resolve(parent,args){
                const place = await Places.findOne({
                    where:{plc_id:parent.plc_id},
                    relations:['plc_images']
                })
                return place?.plc_images
            },
        },
        plc_tags:{
            type:new GraphQLList(PlaceTagType),
            async resolve(parent,args){
                const place = await Places.findOne({
                    where:{plc_id:parent.plc_id},
                    relations:['place_tags']
                })
                return place?.place_tags
            },
        },
    })
});