import express from 'express';
import cors from 'cors'
import { urlRouter } from './routers/urlRouter.ts';
import * as trpcExpress from '@trpc/server/adapters/express'


const app = express();

app.use(cors());

app.use('/trpc', trpcExpress.createExpressMiddleware({
    router: urlRouter
}))

app.listen(3000, ()=>{
    console.log('Server is running on port 3000');
    
})