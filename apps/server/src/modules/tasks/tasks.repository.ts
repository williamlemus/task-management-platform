import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  TaskCreateInputSchema,
  TaskUpdateInputSchema,
  UserWhereUniqueInputSchema,
} from '@server/prisma/generated/zod';
import { PrismaService } from '@server/prisma/prisma.service';
import { GetTasksInput } from '@server/types/tasks';
import { z } from 'zod';

@Injectable()
export class TasksRepository {
  constructor(private prisma: PrismaService) {}
  PAGE_SIZE = 20;

  async createTask(params: { data: Prisma.TaskCreateInput }) {
    const data = TaskCreateInputSchema.parse(params.data);
    return this.prisma.task.create({ data });
  }

  async getTasks(params: GetTasksInput) {
    const { page, limit, sortBy: orderBy, showDeleted } = params;
    let skip = 0;
    if (!!page && !!limit) {
      skip = page * limit;
    }
    let where: Prisma.TaskWhereInput | undefined;
    if (showDeleted) {
      where = {
        deletedAt: { not: null },
      };
    } else {
      where = {
        deletedAt: { equals: null },
      };
    }
    return this.prisma.task.findMany({ take: limit, skip, orderBy, where });
  }

  async updateTask(params: z.infer<typeof TaskUpdateInputSchema>) {
    const { status, title, description } = params;
    const { id } = UserWhereUniqueInputSchema.parse({ id: params.id });
    return this.prisma.task.update({
      data: { status, title, description },
      where: { id },
    });
  }

  async deleteTask(id: string) {
    if (!id) {
      return {};
    }
    return this.prisma.task.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
