import {GraphQLSchema,GraphQLObjectType} from 'graphql';
import {GET_ALL_USERS, GET_USER_BY_ID} from './Queries/User';
import { GET_ALL_ACTIVITIES } from './Queries/Activity';
import {CREATE_USER,LOGIN_USER} from './Mutations/User';
import { GET_ALL_PLACES, GET_PLACES_BY_TAGS } from './Queries/Place';

const RootQuery = new GraphQLObjectType({
    name:"RootQuery",
    fields:{
        getAllUsers:GET_ALL_USERS,
        getUserByUserId:GET_USER_BY_ID,
        getAllActivities:GET_ALL_ACTIVITIES,
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
        getUserByUserId:GET_USER_BY_ID,
        getAllPlaces:GET_ALL_PLACES,
        getPlacesByTag:GET_PLACES_BY_TAGS
    }
});

const AuthMutation = new GraphQLObjectType({
    name:"AuthMutation",
    fields:{
        createUser:CREATE_USER,
        userLogin:LOGIN_USER
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