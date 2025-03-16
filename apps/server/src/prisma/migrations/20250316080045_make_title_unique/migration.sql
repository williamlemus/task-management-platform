/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Task` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Task_title_idx";

-- CreateIndex
CREATE UNIQUE INDEX "Task_title_key" ON "Task"("title");
