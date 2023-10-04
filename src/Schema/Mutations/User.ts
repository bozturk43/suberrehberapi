import {GraphQLObjectType,GraphQLID,GraphQLString, GraphQLNonNull, GraphQLList, GraphQLInt} from 'graphql'
import { UserType } from "../TypeDefs/User";
import {Users} from "../../Entities/Users";
import jwt from 'jsonwebtoken';
import { In } from 'typeorm';
import { PlaceTags } from '../../Entities/PlaceTags';
import { PlaceTagsCategories } from '../../Entities/PlaceTagsCategories';
const JWT_SECRET = 'your_jwt_secret_key';

const LoginReturnType = new GraphQLObjectType({
  name:"LoginResult",
  fields:()=>({
    user: { type: UserType },
    token: { type: GraphQLString },
  })
})

export const CREATE_USER ={
    type:UserType,
    args:{
        usr_first_name:{type:GraphQLString},
        usr_last_name:{type:GraphQLString},
        usr_email:{type:GraphQLString},
        usr_password:{type:GraphQLString},
        usr_device_id:{type:GraphQLString}
    },
    resolve:async(parent:any,args:any)=>{
        const {usr_first_name,usr_last_name,usr_email,usr_password,usr_device_id} = args;
        const newUser = new Users();
        newUser.usr_first_name=usr_first_name;
        newUser.usr_last_name=usr_last_name;
        newUser.usr_email=usr_email;
        newUser.usr_password=usr_password;
        newUser.usr_device_id=usr_device_id;
        await newUser.save();
        return newUser;
    }
}
export const LOGIN_USER = {
    type: LoginReturnType, // Token dönecek
    args: {
        usr_email: { type: new GraphQLNonNull(GraphQLString) },
        usr_password :{ type: new GraphQLNonNull(GraphQLString)}
    },
    async resolve(parent: any, args: any) {
        const { usr_email,usr_password } = args;
        const user = await Users.findOne({ where: { usr_email } });
        if(user && user.usr_password === usr_password){
          const token = jwt.sign(
            { userId: user.usr_id, usr_email: user.usr_email },
            JWT_SECRET,
            { expiresIn: '12h' } // Tokenın süresini belirtin (örneğin, 2 saat)
        );
            const result = {
              user,token
            }
        return result;
        }
        else{
          return "E Mail ya da Şifre Hatalı"
        }
    },
};
export const UPDATE_USER_PREFERENCES ={
  type:UserType,
  args:{
      usr_id:{type:GraphQLInt},
      plc_tag_cat_id_list:{type: new GraphQLList(GraphQLInt)},
      plc_tag_id_list: {type: new GraphQLList(GraphQLInt)},
  },
  resolve:async(parent:any,args:any,context:any)=>{
    if(!context.user){
      throw new Error('Kimlik doğrulama gerekiyor');
    }
      const {usr_id,plc_tag_cat_id_list,plc_tag_id_list} = args;

      const user:Users | null = await Users.findOne({where:{usr_id:usr_id,}});

      //Kategori geldi ise kategori ekle
      if (plc_tag_cat_id_list && plc_tag_cat_id_list.length > 0) {
        const existingCategories = user?.usr_pref_plc_tag_cats || [];
        for (const categoryId of plc_tag_cat_id_list) {
          if (!existingCategories.some((category) => category.plc_tag_cat_id === categoryId)) {
            // Eğer kategori tercihi yoksa, yeni bir kategori ekleyin
            const category = await PlaceTagsCategories.findOne({where:{ plc_tag_cat_id: categoryId }});
            if (user && category) {
              if (!user.usr_pref_plc_tag_cats) {
                user.usr_pref_plc_tag_cats = []; // Eğer tanımlı değilse, boş bir dizi oluştur
              }
              user?.usr_pref_plc_tag_cats.push(category);
            }
          }
        }
      }
      //Tag geldi ise tag ekle
      if (plc_tag_id_list && plc_tag_id_list.length > 0) {
        const existingTags = user?.usr_pref_plc_tags || [];
        for (const tagId of plc_tag_id_list) {
          if (!existingTags.some((tag) => tag.plc_tag_id === tagId)) {
            const tag = await PlaceTags.findOne({where:{ plc_tag_id: tagId }});
            if (user && tag) {
              if (!user.usr_pref_plc_tag_cats) {
                user.usr_pref_plc_tag_cats = []; // Eğer tanımlı değilse, boş bir dizi oluştur
              }
              user?.usr_pref_plc_tags.push(tag);
            }
          }
        }
      }
      await user?.save();
      return user;
  }
}