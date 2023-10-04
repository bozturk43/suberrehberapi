import {GraphQLSchema,GraphQLObjectType} from 'graphql';
import {GET_ALL_USERS, GET_USER_BY_ID} from './Queries/User';
import { GET_ACTIVITIES_BY_LOCATION_DISTANCE, GET_ACTIVITIES_BY_TAGS, GET_ALL_ACTIVITIES } from './Queries/Activity';
import {CREATE_USER,LOGIN_USER, UPDATE_USER_PREFERENCES} from './Mutations/User';
import { GET_ALL_PLACES, GET_PLACES_BY_LOCATION_DISTANCE, GET_PLACES_BY_TAGS } from './Queries/Place';
import { CREATE_PLACE } from './Mutations/Place';
import { CREATE_ACTIVITY } from './Mutations/Activity';
import { CREATE_PLACE_TAG_CATEGORY } from './Mutations/PlaceTagCategory';
import { GET_ALL_PLACE_TAG_CATEGORIES, GET_PLACE_TAG_CATEGORY_BY_ID } from './Queries/PlaceTagCategory';

const RootQuery = new GraphQLObjectType({
    name:"RootQuery",
    fields:{
        getAllUsers:GET_ALL_USERS,
        getUserByUserId:GET_USER_BY_ID,
        getAllActivities:GET_ALL_ACTIVITIES,
        getAllPlaces:GET_ALL_PLACES,
        getPlacesByTag:GET_PLACES_BY_TAGS,
        getPlacesByLocationAndDistance:GET_PLACES_BY_LOCATION_DISTANCE,
        getActivitiesByTags:GET_ACTIVITIES_BY_TAGS,
        getActivitiesByLocationAndDistance:GET_ACTIVITIES_BY_LOCATION_DISTANCE,
        getAllPlaceTagsCategories : GET_ALL_PLACE_TAG_CATEGORIES,
    }
});
const RootMutation = new GraphQLObjectType({
    name:"Mutation",
    fields:{
        createPlace:CREATE_PLACE,
        createActivity:CREATE_ACTIVITY,
        createPlaceTagCategory:CREATE_PLACE_TAG_CATEGORY,
        updateUserPreferences:UPDATE_USER_PREFERENCES
    }
});
const AuthQueries = new GraphQLObjectType({
    name:"AuthQueries",
    fields:{
        getUserByUserId:GET_USER_BY_ID,
        getAllPlaceTagsCategories:GET_ALL_PLACE_TAG_CATEGORIES,
        getPlaceTagCategoryById:GET_PLACE_TAG_CATEGORY_BY_ID,
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