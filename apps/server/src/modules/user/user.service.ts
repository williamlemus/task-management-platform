import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import {
  UserSelectSchema,
} from '@server/prisma/generated/zod';
import { z } from 'zod';

@Injectable()
export class UserService {
  constructor(private repository: UserRepository) {}

  async getUser(params: z.infer<typeof UserSelectSchema>) {
    const tasks = await this.repository.getUser(params);
    return tasks;
  }
}
