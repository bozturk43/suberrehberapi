import {GraphQLString,GraphQLFloat, GraphQLList} from 'graphql'
import { Places } from '../../Entities/Places';
import { PlaceType } from '../TypeDefs/Place';
import { PlaceTags } from '../../Entities/PlaceTags';

export const CREATE_PLACE ={
    type:PlaceType,
    args:{
        plc_google_id:{type:GraphQLString},
        plc_name:{type:GraphQLString},
        plc_description:{type:GraphQLString},
        plc_longtitude:{type:GraphQLFloat},
        plc_latitude:{type:GraphQLFloat},
        plc_string_tags: { type: new GraphQLList(GraphQLString) }
    },
    resolve:async(parent:any,args:any)=>{
        const {plc_google_id,plc_name,plc_description,plc_longtitude,plc_latitude,plc_string_tags} = args;
        const tags = [];
        for (const tagName of plc_string_tags) {
          const existingTag = await PlaceTags.findOne({ where: { plc_tag_name: tagName } });
          if (existingTag) {
            tags.push(existingTag);
          } else {
            const newTag = new PlaceTags();
            newTag.plc_tag_name = tagName;
            await newTag.save();
            tags.push(newTag);
          }
        }
        const newPlace = new Places();
        newPlace.plc_google_id=plc_google_id;
        newPlace.plc_name = plc_name;
        newPlace.plc_description = plc_description;
        newPlace.plc_longtitude = plc_longtitude;
        newPlace.plc_latitude = plc_latitude;
        newPlace.place_tags=tags;
        await newPlace.save()
        return newPlace;
    }
}