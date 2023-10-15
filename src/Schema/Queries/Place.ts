import {GraphQLFloat, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString} from 'graphql';
import jwt from 'jsonwebtoken';
import { UserType } from '../TypeDefs/User';
import {Users} from '../../Entities/Users';
import { PlaceType } from '../TypeDefs/Place';
import { Places } from '../../Entities/Places';
import { Between, In } from 'typeorm';
import { PlaceTags } from '../../Entities/PlaceTags';
import { PlaceTagsCategories } from '../../Entities/PlaceTagsCategories';
import { getPlacesByLocationDistance } from '../../Helpers/Place';


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
    const places = await Places.find({
      where: {
        plc_latitude: Between(minLatitude,maxLatitude),
        plc_longtitude: Between (minLongtitude, maxLongtitude)
      },
    });
    return places;
  },
};
export const GET_PLACES_BY_USER_PREFERENCES_WITH_USERID = {
  type: new GraphQLList(PlaceType), 
    args: {
      userId: { type:GraphQLInt }, 
      latitude: { type: GraphQLFloat }, 
      longitude: { type: GraphQLFloat }, 
      distance: { type: GraphQLFloat }, 
    },
    async resolve(parent:any,args:any,context:any) {
      const { userId,latitude,longitude,distance } = args;
      const user = await Users.findOne({
        where:{usr_id:userId},
        relations: ['usr_pref_plc_tag_cats','usr_pref_plc_tag_cats.plc_tags','usr_pref_plc_tags'],
      });
      if(user){
        let prefferedTags:PlaceTags[] = user.usr_pref_plc_tags;
        const prefferedTagCats:PlaceTagsCategories[]= user.usr_pref_plc_tag_cats;
        prefferedTagCats.map((item)=>{
          item.plc_tags.map((tag)=>{
            prefferedTags.push(tag);
          })
        })
          const places = await getPlacesByLocationDistance(latitude,longitude,distance);

          if(!places){
            return "Bu konum ve mesafe için herhangi bir mekan bulunamadı."
          }
          else {
            if(!prefferedTagCats && !prefferedTags){
              return places;
            }
            else{
              const filteredPlaces = places.filter((place) => {
                return prefferedTags.some((preferredTag) =>
                  place.place_tags.some((tag) => tag.plc_tag_name === preferredTag.plc_tag_name)
                );
              });
              return filteredPlaces;
            }
          }
          

      }
    },
}

  





