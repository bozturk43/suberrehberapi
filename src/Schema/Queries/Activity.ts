import {GraphQLList} from 'graphql';
import { Activities } from '../../Entities/Activities';
import { ActivityType } from '../TypeDefs/Activity';
export const GET_ALL_ACTIVITIES ={
    type:new GraphQLList(ActivityType),
    resolve(){
        return Activities.find();
    },
}