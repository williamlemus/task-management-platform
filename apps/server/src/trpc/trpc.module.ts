import { Module } from "@nestjs/common";
import { TrpcService } from "./trpc.service";
import { TrpcRouter } from "./trpc.router";
import { TasksModule } from "@server/modules/tasks/tasks.module";
import { UserModule } from "@server/modules/user/user.module";

@Module({
    imports: [TasksModule, UserModule],
    providers: [TrpcService, TrpcRouter],
})

export class TrpcModule {}