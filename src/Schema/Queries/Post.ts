import {GraphQLList} from 'graphql';
import { PostType } from '../TypeDefs/Post';
import {Posts} from '../../Entities/Posts';
export const GET_ALL_POSTS ={
    type:new GraphQLList(PostType),
    resolve(){
        return Posts.find();
    },
}