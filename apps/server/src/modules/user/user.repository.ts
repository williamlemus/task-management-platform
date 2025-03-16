import { Injectable } from '@nestjs/common';
import {
  UserSelectSchema,
  UserWhereUniqueInputSchema,
} from '@server/prisma/generated/zod';
import { PrismaService } from '@server/prisma/prisma.service';
import { z } from 'zod';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async getUser(params: z.infer<typeof UserSelectSchema>) {
    const { success } = UserWhereUniqueInputSchema.safeParse(params);
    // For now, just return first user
    const user = await this.prisma.user.findFirst();
    return this.prisma.user.findFirst()
  }
}
