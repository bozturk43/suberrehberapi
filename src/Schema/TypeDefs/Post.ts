    import {GraphQLObjectType,GraphQLID,GraphQLString,GraphQLInt, GraphQLNonNull, GraphQLList} from 'graphql'
    import { UserType } from './User';
    import { Users } from '../../Entities/Users';
import { CommentType } from './Comments';
import { Comments } from '../../Entities/Comments';

    export const PostType:GraphQLObjectType = new GraphQLObjectType({
        name:"Post",
        fields:()=>({
            pst_id:{type:GraphQLID},
            pst_title:{type:GraphQLString},
            pst_description:{type:GraphQLString},
            pst_type:{type:GraphQLInt},
            user:{
                type:UserType,
                resolve(parent,args){
                    return Users.findOne({where:{usr_id:parent.usr_id}});
                }
            },
            comments:{
                type:new GraphQLList(CommentType),
                resolve(parent,args){
                    return Comments.find({where:{pst_id:parent.pst_id}});
                }
            }

        })
    });