import {GraphQLFloat, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString} from 'graphql';
import { PlaceTagCategoryType } from '../TypeDefs/PlaceTagCategory';
import { PlaceTagsCategories } from '../../Entities/PlaceTagsCategories';

export const GET_ALL_PLACE_TAG_CATEGORIES={
  type:new GraphQLList(PlaceTagCategoryType),
  resolve(){
    return PlaceTagsCategories.find();
  }
};
export const GET_PLACE_TAG_CATEGORY_BY_ID={
  type : PlaceTagCategoryType,
  args: {
    id:{type:GraphQLInt}
  },
  resolve(parent:any,args:any){
    return PlaceTagsCategories.findOne({where:{plc_tag_cat_id:args.id}})
  }
};





