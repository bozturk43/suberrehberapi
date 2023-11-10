import {GraphQLObjectType,GraphQLID,GraphQLString,GraphQLInt, GraphQLNonNull} from 'graphql'
import { ActivityType } from './Activity';
import { Activities } from '../../Entities/Activities';
import { PlaceType } from './Place';
import { Places } from '../../Entities/Places';

export const PlaceImagesType:GraphQLObjectType = new GraphQLObjectType({
    name:"PlaceImages",
    fields:()=>({
        plc_img_id:{type:GraphQLID},
        plc_img_url:{type:GraphQLString},
        place:{
            type:PlaceType,
            resolve(parent,args){
                return Places.findOne({where:{plc_id:parent.plc_id}});
            }
        }

    })
});