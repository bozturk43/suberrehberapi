import {GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString} from 'graphql';
import jwt from 'jsonwebtoken';
import { UserType } from '../TypeDefs/User';
import {Users} from '../../Entities/Users';
import { PlaceType } from '../TypeDefs/Place';
import { Places } from '../../Entities/Places';
import { In } from 'typeorm';


export const GET_ALL_PLACES ={
    type:new GraphQLList(PlaceType),
    resolve(){
        return Places.find();
    },
};
export const GET_PLACE_BY_ID = {
    type: PlaceType,
    args: {
      id: { type: GraphQLInt },
    },
    resolve(parent:any, args:any) {
      return Places.findOne({where:{plc_id:args.id}});
    },
  };
  export const GET_PLACES_BY_TAGS = {
    type: new GraphQLList(PlaceType), // Dönen tipinizin doğru olduğundan emin olun
    args: {
      tags: { type: new GraphQLList(GraphQLString) }, // Etiketleri doğru tipte tanımlayın
    },
    async resolve(parent:any,args:any) {
      const { tags } = args;
      const places = await Places.find({
        where: {
          place_tags: {
            plc_tag_name:In(tags),
          },
        },
      });
      return places;
    },
  };
  





