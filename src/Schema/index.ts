import {GraphQLSchema,GraphQLObjectType} from 'graphql';
import {GET_ALL_USERS, GET_USER_BY_ID} from './Queries/User';
import { GET_ALL_ACTIVITIES } from './Queries/Activity';
import {CREATE_USER,LOGIN_USER} from './Mutations/User';
import { GET_ALL_PLACES, GET_PLACES_BY_LOCATION_DISTANCE, GET_PLACES_BY_TAGS } from './Queries/Place';
import { CREATE_PLACE } from './Mutations/Place';

const RootQuery = new GraphQLObjectType({
    name:"RootQuery",
    fields:{
        getAllUsers:GET_ALL_USERS,
        getUserByUserId:GET_USER_BY_ID,
        getAllActivities:GET_ALL_ACTIVITIES,
        getAllPlaces:GET_ALL_PLACES,
        getPlacesByTag:GET_PLACES_BY_TAGS,
        getPlacesByLocationAndDistance:GET_PLACES_BY_LOCATION_DISTANCE,
    }
});
const RootMutation = new GraphQLObjectType({
    name:"Mutation",
    fields:{
        createUser:CREATE_USER,
        createPlace:CREATE_PLACE
    }
});
const AuthQueries = new GraphQLObjectType({
    name:"AuthQueries",
    fields:{
        getUserByUserId:GET_USER_BY_ID,
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
    mutation:RootMutation,
})
export const authSchema = new GraphQLSchema({
    query:AuthQueries,
    mutation:AuthMutation,
})