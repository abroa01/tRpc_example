//creating a proxy object

import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";

// createTRPCProxyClient -- convert http call to trpc call
// httpBatchLink --  batch your request all together
import { UrlRouter } from '../../../backend/src/routers/urlRouter'

const trpcClient = createTRPCProxyClient<UrlRouter>({
    links:[
        httpBatchLink({
            url: 'http://localhost:3000/trpc'
        }),
    ]
})

export default trpcClient;