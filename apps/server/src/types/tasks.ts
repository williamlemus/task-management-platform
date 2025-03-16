import { TaskOrderByWithRelationInputSchema } from '@server/prisma/generated/zod';
import { z } from 'zod';

export const GetTasksInputSchema = z.object({
  page: z.number().optional(),
  limit: z.number().optional(),
  sortBy: TaskOrderByWithRelationInputSchema.optional(),
  showDeleted: z.boolean().optional(),
});

export type GetTasksInput = z.infer<typeof GetTasksInputSchema>;
