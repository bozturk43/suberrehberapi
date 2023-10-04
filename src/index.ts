import express from 'express';
import {graphqlHTTP} from 'express-graphql';
import cors from 'cors';
import { createConnection } from 'typeorm';
import { schema,authSchema } from './Schema';
import {Users} from './Entities/Users'
import { ActivitiesComments } from './Entities/ActivitiesComments';
import {authenticate} from './Middleware/Middleware'
import { Activities } from './Entities/Activities';
import { ActivitiesImages } from './Entities/ActivitiesImages';
import { Places } from './Entities/Places';
import { PlaceTags } from './Entities/PlaceTags';
import { ActivityTags } from './Entities/ActivityTags';
import { PlaceTagsCategories } from './Entities/PlaceTagsCategories';
import { fetchAndSavePlaces } from './Services/GoogleService';
const main = async ()=>{
    await createConnection({
        type:"mysql",
        host: "suberrehber.cfk1r0gutwxe.eu-north-1.rds.amazonaws.com",
        database:"WanderLing_test",
        port:3306,
        username:"root",
        password:"01081992",
        logging:true,
        synchronize:false,
        entities:[Users,Activities,ActivitiesComments,ActivitiesImages,Places,PlaceTags,PlaceTagsCategories,ActivityTags]

    });
    const app = express()
    app.use(cors())
    app.use(express.json())

    app.use("/app",authenticate,graphqlHTTP({
        schema:schema,
        graphiql:true
    }))

    app.use("/login",graphqlHTTP({
        schema:authSchema,
        graphiql:true
    }))

    app.listen(3001,()=>{
        console.log("SERVER IS RUNNING ON 3001")
    })

}

main().catch((err)=>{
    console.log(err)
});
