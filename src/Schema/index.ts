import {GraphQLSchema,GraphQLObjectType} from 'graphql';
import {GET_ALL_USERS, GET_USER_BY_ID,LOGIN_USER} from './Queries/User';
import {GET_ALL_POSTS} from './Queries/Post';
import {CREATE_USER} from './Mutations/User';

const RootQuery = new GraphQLObjectType({
    name:"RootQuery",
    fields:{
        getAllUsers:GET_ALL_USERS,
        getUserByUserId:GET_USER_BY_ID,
        getAllPosts:GET_ALL_POSTS,
        userLogin:LOGIN_USER
    }
});
const RootMutation = new GraphQLObjectType({
    name:"Mutation",
    fields:{
        createUser:CREATE_USER
    }
});
const AuthQueries = new GraphQLObjectType({
    name:"AuthQueries",
    fields:{
        userLogin:LOGIN_USER
    }
});

const AuthMutation = new GraphQLObjectType({
    name:"AuthMutation",
    fields:{
        createUser:CREATE_USER
    }
});
export const schema = new GraphQLSchema({
    query:RootQuery,
    // mutation:RootMutation, //Auth Gerektiren mutationlar oluşturulduğund aktif edilecek.
})
export const authSchema = new GraphQLSchema({
    query:AuthQueries,
    mutation:AuthMutation,
})