import {GraphQLFloat, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString} from 'graphql';
import jwt from 'jsonwebtoken';
import { UserType } from '../TypeDefs/User';
import {Users} from '../../Entities/Users';
import { PlaceType } from '../TypeDefs/Place';
import { Places } from '../../Entities/Places';
import { Between, In } from 'typeorm';


export const GET_ALL_PLACES ={
    type:new GraphQLList(PlaceType),
    resolve(context:any){
      if(!context.user){
        throw new Error('Kimlik doğrulama gerekiyor');
      }
        return Places.find();
    },
};
export const GET_PLACE_BY_ID = {
    type: PlaceType,
    args: {
      id: { type: GraphQLInt },
    },
    resolve(parent:any, args:any,context:any) {
      if(!context.user){
        throw new Error('Kimlik doğrulama gerekiyor');
      }
      return Places.findOne({where:{plc_id:args.id}});
    },
};
export const GET_PLACES_BY_TAGS = {
    type: new GraphQLList(PlaceType), // Dönen tipinizin doğru olduğundan emin olun
    args: {
      tags: { type: new GraphQLList(GraphQLString) }, // Etiketleri doğru tipte tanımlayın
    },
    async resolve(parent:any,args:any,context:any) {
        if(!context.user){
          throw new Error('Kimlik doğrulama gerekiyor');
        }
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
export const GET_PLACES_BY_LOCATION_DISTANCE = {
  type: new GraphQLList(PlaceType),
  args: {
    latitude: { type: GraphQLFloat }, // Kullanıcının konumunun enlem değeri
    longitude: { type: GraphQLFloat }, // Kullanıcının konumunun boylam değeri
    distance: { type: GraphQLFloat }, // Uzaklık yarıçapı (örneğin, kilometre cinsinden)
  },
  async resolve(parent:any,args:any,context:any) {
      if(!context.user){
        throw new Error('Kimlik doğrulama gerekiyor');
      }
      const { latitude, longitude, distance } = args;

      const minLatitude=latitude - distance / 111.32;
      const maxLatitude=latitude + distance / 111.32;
      const minLongtitude=longitude - distance / (111.32 * Math.cos((latitude * Math.PI) / 180));
      const maxLongtitude=longitude + distance / (111.32 * Math.cos((latitude * Math.PI) / 180));
      console.log(minLatitude,maxLatitude);
      console.log(minLongtitude,maxLongtitude);
    const places = await Places.find({
      where: {
        plc_latitude: Between(minLatitude,maxLatitude),
        plc_longtitude: Between (minLongtitude, maxLongtitude)
      },
    });
    return places;
  },
};
  





