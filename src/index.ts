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
import { PlaceImages } from './Entities/PlaceImages';
import { sendEmail } from './Services/MailService';
import * as dotenv from 'dotenv';
dotenv.config();
console.log("process env",process.env);

const main = async ()=>{
    await createConnection({
        type:"mysql",
        host: process.env.DB_CONFIG_HOST,
        database:process.env.DB_CONFIG_DATABASE,
        port:process.env.DB_CONFIG_PORT && parseInt(process.env.DB_CONFIG_PORT) || 0,
        username:process.env.DB_CONFIG_USERNAME,
        password:process.env.DB_CONFIG_PASSWORD,
        logging:true,
        synchronize:false,
        entities:[Users,Activities,ActivitiesComments,ActivitiesImages,Places,PlaceTags,PlaceTagsCategories,ActivityTags,PlaceImages]

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
