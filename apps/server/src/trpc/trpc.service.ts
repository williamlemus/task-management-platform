import { Injectable } from "@nestjs/common";
import { initTRPC } from "@trpc/server";
import SuperJSON from "superjson";

@Injectable()
export class TrpcService {
    trpc = initTRPC.create({
        transformer: SuperJSON,
    })
    procedure = this.trpc.procedure;
    router = this.trpc.router;
    mergeRouters = this.trpc.mergeRouters;
}