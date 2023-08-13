import express from 'express';
import {graphqlHTTP} from 'express-graphql';
import cors from 'cors';
import { createConnection } from 'typeorm';
import { schema,authSchema } from './Schema';
import {Users} from './Entities/Users'
import { Posts } from './Entities/Posts';
import { Comments } from './Entities/Comments';
import {authenticate} from './Middleware/Middleware'
const main = async ()=>{
    await createConnection({
        type:"mysql",
        host: "suberrehber.cfk1r0gutwxe.eu-north-1.rds.amazonaws.com",
        database:"SuberRehber_test",
        port:3306,
        username:"root",
        password:"01081992",
        logging:true,
        synchronize:false,
        entities:[Users,Posts,Comments]

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
