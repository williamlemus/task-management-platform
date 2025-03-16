import { PrismaModule } from "@server/prisma/prisma.module";
import { TasksService } from "./tasks.service";
import { TasksRepository } from "./tasks.repository";
import { Module } from "@nestjs/common";

@Module({
    imports: [PrismaModule],
    providers: [TasksRepository, TasksService],
    exports: [TasksService],
})

export class TasksModule {}