import { StatusType, Task } from "@server/prisma/generated/zod";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { WarningDialog } from "./WarningDialog";
import { AddEditDialog } from "./AddEditDialog";
import { trpc } from "../trpc";
import { Dispatch, SetStateAction } from "react";

export default function TaskItem({
  title,
  id,
  description,
  status,
  setAddTasks,
}: Pick<Task, "title" | "description" | "status" | "id"> & {
  setAddTasks: Dispatch<SetStateAction<number>>;
}) {
  const handleDeleteClick = async () => {
    await trpc.deleteTask.mutate({ id });
    setAddTasks((prevState: number) => prevState + 1);
  };
  const handleUpdateClick = async (
    newTitle: string,
    newDescription: string,
    newStatus: StatusType
  ) => {
    await trpc.updateTask.mutate({
      id,
      title: newTitle,
      description: newDescription,
      status: newStatus,
    });
    setAddTasks((prevState: number) => prevState + 1);
  };
  return (
    <Card className="m-4 w-[240px] min-h-[240px] flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{description}</p>

      </CardContent>
      <CardFooter className="flex justify-between">
        <WarningDialog handleDelete={handleDeleteClick} />
        <AddEditDialog
          handleEdit={handleUpdateClick}
          title={title}
          description={description}
          status={status}
          id={id}
        />
      </CardFooter>
    </Card>
  );
}
