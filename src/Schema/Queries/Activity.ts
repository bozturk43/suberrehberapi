import {GraphQLFloat, GraphQLList, GraphQLString} from 'graphql';
import { Activities } from '../../Entities/Activities';
import { ActivityType } from '../TypeDefs/Activity';
import { Between, In } from 'typeorm';

export const GET_ALL_ACTIVITIES ={
    type:new GraphQLList(ActivityType),
    resolve(){
        return Activities.find();
    },
}
export const GET_ACTIVITIES_BY_TAGS = {
    type: new GraphQLList(ActivityType), 
    args: {
      tags: { type: new GraphQLList(GraphQLString) },
    },
    async resolve(parent:any,args:any,context:any) {
        if(!context.user){
          throw new Error('Kimlik doğrulama gerekiyor');
        }
      const { tags } = args;
      const activities = await Activities.find({
        where: {
          activity_tags: {
            act_tag_name:In(tags),
          },
        },
      });
      return activities;
    },
};
export const GET_ACTIVITIES_BY_LOCATION_DISTANCE = {
    type: new GraphQLList(ActivityType),
    args: {
      latitude: { type: GraphQLFloat }, 
      longitude: { type: GraphQLFloat }, 
      distance: { type: GraphQLFloat },
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
      const activities = await Activities.find({
        where: {
          act_latitude: Between(minLatitude,maxLatitude),
          act_longtitude: Between (minLongtitude, maxLongtitude)
        },
      });
      return activities;
    },
  };