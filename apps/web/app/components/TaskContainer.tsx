"use client";

import { trpc } from "../trpc";
import { useEffect, useState } from "react";
import { Task, StatusType, StatusSchema } from "@server/prisma/generated/zod";
import TaskItem from "./TaskItem";
import { Accordion, AccordionContent, AccordionTrigger } from "./ui/accordion";
import { AccordionItem } from "./ui/accordion";
import { AddEditDialog } from "./AddEditDialog";

export default function TaskContainer({ userId }: { userId: string | null }) {
  const [tasks, setTasks] = useState<Partial<Record<StatusType, Task[]>>>({});
  const [addTasks, setAddTasks] = useState(0);
  useEffect(() => {
    trpc.getTasks.query({}).then((res) => {
      const grouped = Object.groupBy(res, ({ status }) => status);
      setTasks(grouped);
    });
  }, [addTasks]);
  const handleAddClick = async (title: string, description?: string) => {
    if (userId) {
      await trpc.createTask.mutate({
        title,
        description,
        userId,
      });
    }
    setAddTasks((prevCount) => prevCount + 1);
  };
  const statusText = (statusEnum: StatusType) =>
    statusEnum === StatusSchema.Enum.InProgress ? "In progress" : statusEnum;
  return (
    <div className="flex, flex-col">
      <p className="font-sans text-3xl my-10">Task Management Platform</p>
      <div className="justify-self-end mx-20 py-5">
        <AddEditDialog handleEdit={handleAddClick} userId={userId} />
      </div>
      <Accordion type="multiple" className="container mx-auto w-[85%]">
        {/* also throw in one handler(ir two) for both edit and delete  */}
        {[
          StatusSchema.Enum.Pending,
          StatusSchema.Enum.InProgress,
          StatusSchema.Enum.Completed,
        ].map((statusEnum) => {
          return (
            <AccordionItem value={statusEnum} key={statusEnum}>
              <AccordionTrigger>
                <div className="font-sans size-2xl">
                  {statusText(statusEnum)}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:grid-cols-2 place-items-center">
                  {(tasks[statusEnum] ? tasks[statusEnum] : []).map(
                    ({ id, title, description, status }) => (
                      <TaskItem
                        key={id}
                        title={title}
                        description={description}
                        status={status}
                        id={id}
                        setAddTasks={setAddTasks}
                      />
                    )
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
