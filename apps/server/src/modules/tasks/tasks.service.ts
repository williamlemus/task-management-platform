import { Injectable } from '@nestjs/common';
import { TasksRepository } from './tasks.repository';
import { Prisma, Task } from '@prisma/client';
import {
  TaskUncheckedCreateInputSchema,
  TaskUpdateInputSchema,
} from '@server/prisma/generated/zod';
import { z } from 'zod';

@Injectable()
export class TasksService {
  constructor(private repository: TasksRepository) {}

  async createTask(params: z.infer<typeof TaskUncheckedCreateInputSchema>) {
    const { userId, description, title } = params;
    const task = await this.repository.createTask({
      data: {
        title,
        description,
        user: {
          connect: { id: userId },
        },
      },
    });

    return task;
  }

  async getTasks(params: {
    page?: number;
    limit?: number;
    sortBy?: Prisma.TaskOrderByWithRelationInput;
    showDelete?: boolean;
  }) {
    const tasks = await this.repository.getTasks(params);
    return tasks;
  }

  async updateTask(params: z.infer<typeof TaskUpdateInputSchema>) {
    return this.repository.updateTask(params);
  }

  async deleteTask(id: string) {
    return this.repository.deleteTask(id);
  }
}
