import {GraphQLString,GraphQLFloat, GraphQLList} from 'graphql'
import { Activities } from '../../Entities/Activities';
import { ActivityType } from '../TypeDefs/Activity';
import { ActivityTags } from '../../Entities/ActivityTags';

export const CREATE_ACTIVITY = {
  type:ActivityType,
  args:{
    act_name:{type:GraphQLString},
    act_description:{type:GraphQLString},
    act_date:{type:GraphQLString},
    act_longtitude:{type:GraphQLFloat},
    act_latitude:{type:GraphQLFloat},
    act_string_tags:{type: new GraphQLList(GraphQLString)},
  },
  resolve:async(parent:any,args:any)=>{
    const {act_name,act_description,act_date,act_longtitude,act_latitude,act_string_tags} = args;
    const tags = [];
    for (const tagName of act_string_tags) {
      const existingTag = await ActivityTags.findOne({ where: { act_tag_name: tagName } });
      if (existingTag) {
        tags.push(existingTag);
      } else {
        const newTag = new ActivityTags();
        newTag.act_tag_name = tagName;
        await newTag.save();
        tags.push(newTag);
      }
    }
    const newActivity = new Activities();
    newActivity.act_name=act_name;
    newActivity.act_description = act_description;
    newActivity.act_date = new Date(act_date);
    newActivity.act_longtitude = act_longtitude;
    newActivity.act_latitude = act_latitude;
    newActivity.activity_tags=tags;
    await newActivity.save()
    return newActivity;
}

}