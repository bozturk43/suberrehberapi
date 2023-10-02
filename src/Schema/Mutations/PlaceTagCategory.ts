import {GraphQLString,GraphQLList,GraphQLInt} from 'graphql';
import { PlaceTags } from '../../Entities/PlaceTags';
import { In } from 'typeorm';
import { PlaceTagsCategories } from '../../Entities/PlaceTagsCategories';
import { PlaceTagCategoryType } from '../TypeDefs/PlaceTagCategory';


export const CREATE_PLACE_TAG_CATEGORY ={
    type:PlaceTagCategoryType,
    args:{
        plc_tag_cat_name:{type:GraphQLString},
        plc_tag_id_list: { type: new GraphQLList(GraphQLInt) }
    },
    resolve:async(parent:any,args:any,context:any)=>{

      if(!context.user){
        throw new Error('Kimlik doğrulama gerekiyor');
      }
        const {plc_tag_cat_name,plc_tag_id_list} = args;
        const tags:PlaceTags[] = await PlaceTags.find({where:{plc_tag_id:In(plc_tag_id_list)}});
        console.log("Bulunan Tagler",tags);
        if(tags === null)
          return {message:"Tag Listesi Boş En Az 1 Tag girmelisiniz."};
        const newCategory = new PlaceTagsCategories();
        newCategory.plc_tag_cat_name = plc_tag_cat_name;
        newCategory.plc_tags=tags;
        await newCategory.save()
        return newCategory;
    }
}