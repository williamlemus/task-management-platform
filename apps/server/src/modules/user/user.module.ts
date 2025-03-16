import { PrismaModule } from "@server/prisma/prisma.module";
import { UserService } from "./user.service";
import { UserRepository } from "./user.repository";
import { Module } from "@nestjs/common";

@Module({
    imports: [PrismaModule],
    providers: [UserRepository, UserService],
    exports: [UserService],
})

export class UserModule {}