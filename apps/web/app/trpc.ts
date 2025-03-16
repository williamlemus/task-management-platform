import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from '@server/trpc/trpc.router';
import SuperJSON from "superjson";

export const trpc = createTRPCProxyClient<AppRouter>({
    links: [
        httpBatchLink({
            url: `http://localhost:4000/trpc`, // this matches what is in apps/server/src/trpc/trpc.router.ts. Also, use env for when deploying
        })
    ],
    transformer: SuperJSON
})