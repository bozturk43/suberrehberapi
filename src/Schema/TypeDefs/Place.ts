import {GraphQLObjectType,GraphQLID,GraphQLString,GraphQLInt, GraphQLNonNull, GraphQLList} from 'graphql'
import { PlaceTags } from '../../Entities/PlaceTags';
import { PlaceTagType } from './PlaceTag';
import { Places } from '../../Entities/Places';

export const PlaceType:GraphQLObjectType = new GraphQLObjectType({
    name:"Place",
    fields:()=>({
        plc_id:{type:GraphQLID},
        plc_google_id:{type:GraphQLString},
        plc_name:{type:GraphQLString},
        plc_description:{type:GraphQLString},
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