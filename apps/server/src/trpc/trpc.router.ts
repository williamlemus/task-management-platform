import { INestApplication, Injectable } from '@nestjs/common';
import { TrpcService } from './trpc.service';
import { z } from 'zod';
import * as trpcExpress from '@trpc/server/adapters/express';
import { TasksService } from '@server/modules/tasks/tasks.service';
import { GetTasksInputSchema } from '@server/types/tasks';
import {
  TaskUncheckedCreateInputSchema,
  TaskUpdateInputSchema,
  UserSelectSchema,
} from '@server/prisma/generated/zod';
import { UserService } from '@server/modules/user/user.service';

@Injectable()
export class TrpcRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly taskService: TasksService,
    private readonly userService: UserService,
  ) {}

  appRouter = this.trpc.router({
    getTasks: this.trpc.procedure
      .input(GetTasksInputSchema)
      .query(async ({ input }) => {
        return this.taskService.getTasks(input);
      }),
    createTask: this.trpc.procedure
      .input(TaskUncheckedCreateInputSchema)
      .mutation(async ({ input }) => {
        return this.taskService.createTask(input);
      }),
    updateTask: this.trpc.procedure
      .input(TaskUpdateInputSchema)
      .mutation(async ({ input }) => {
        const result = await this.taskService.updateTask(input);
        return result;
      }),
    deleteTask: this.trpc.procedure
      .input(z.object({ id: z.string().uuid() }))
      .mutation(async ({ input }) => this.taskService.deleteTask(input.id)),
    getUser: this.trpc.procedure.input(UserSelectSchema).query(async({input}) =>{
      return this.userService.getUser(input);
    })
  });

  async applyMiddleware(app: INestApplication) {
    // this will be the endpoint that the client will reference, so make sure it matches what will be in nextjs
    app.use(
      '/trpc',
      trpcExpress.createExpressMiddleware({ router: this.appRouter }),
    );
  }
}

export type AppRouter = TrpcRouter['appRouter'];
