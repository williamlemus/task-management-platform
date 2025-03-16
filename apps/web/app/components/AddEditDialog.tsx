import { Task, StatusSchema, StatusType } from "@server/prisma/generated/zod";
import { Button } from "@web/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@web/app/components/ui/dialog";
import { Input } from "@web/app/components/ui/input";
import { Label } from "@web/app/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@web/app/components/ui/select";
import { useState } from "react";
import { Textarea } from "./ui/textarea";

export function AddEditDialog({
  handleEdit,
  title,
  description,
  status,
  userId,
  id,
}: Partial<Pick<Task, "title" | "description" | "status" | "id">> & {
  handleEdit: (
    newTitle: string,
    newDescription: string,
    newStatus: StatusType
  ) => void;
  userId?: string | null;
}) {
  const [newTitle, setNewTitle] = useState(title || "");
  const [newDescription, setNewDescription] = useState(description || "");
  const [newStatus, setNewStatus] = useState<string | StatusType>(status || "");
  const [open, setOpen] = useState(false);
  // task having id in props means it's an edit task dialog
  const isNewTask = !id;
  const clearState = () => {
    setOpen(false);
    setNewDescription("");
    setNewTitle("");
    setNewStatus("");
  }
  // This is for when the user exits the dialog and goes back into the same one
  const resetState = () => {
    setNewDescription(description || "");
    setNewTitle(title || "");
    setNewStatus(status || "");
  }
  const handleSubmit = async () => {
    await handleEdit(
      newTitle,
      newDescription,
      StatusSchema.safeParse(newStatus)?.data || StatusSchema.enum.Pending
    );
    clearState();
  };
  const actionText = isNewTask ? "+ Add" : "Edit";
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">{actionText}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" onCloseAutoFocus={clearState} onOpenAutoFocus={resetState}>
        <DialogHeader>
          <DialogTitle>{actionText} task</DialogTitle>
          <DialogDescription>
            Make changes to your task here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={newTitle}
              className="col-span-3"
              onChange={(e) => setNewTitle(e.currentTarget.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              value={newDescription}
              className="col-span-3"
              onChange={(e) => setNewDescription(e.currentTarget.value)}
            />
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Select
              value={newStatus}
              onValueChange={(e) => setNewStatus(String(e))}
            >
              <SelectTrigger className="w-[180px]" value={newStatus}>
                <SelectValue placeholder="Select New Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  <SelectItem value={StatusSchema.enum.Pending}>
                    {StatusSchema.Enum.Pending}
                  </SelectItem>
                  <SelectItem value={StatusSchema.Enum.InProgress}>
                    In Progress
                  </SelectItem>
                  <SelectItem value={StatusSchema.Enum.Completed}>
                    {StatusSchema.Enum.Completed}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={!userId && !id && !newTitle}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
