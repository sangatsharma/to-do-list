import * as React from "react";
import AlertDialogBox from "../components/AlertDialog";
import { Card, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { dateToString, isDeadlineOver } from "@/utils/dateFormater";
import SelectInput from "./Editor/SelectInput";
import ViewModal from "./ViewModal";
import useStore from "@/store/editorStore";
import { Task } from "@/types/store.types";
import { toast } from "react-toastify";
import {
  checkDeadlineAhead,
  playNotificationSound,
} from "@/utils/notification";

interface IToDoCardProps {
  item: Task;
}

const ToDoCard: React.FunctionComponent<IToDoCardProps> = ({ item }) => {
  const deleteTask = useStore((state) => state.deleteTask);
  const editTask = useStore((state) => state.editTask);

  // Options for task progress status
  const progressOptions = [
    { value: "todo", label: "To Do" },
    { value: "inprogress", label: "In Progress" },
    { value: "completed", label: "Completed" },
    { value: "overdue", label: "Overdue" },
  ];

  // Function to determine className based on task status
  const getStatusClass = (status: string) => {
    switch (status) {
      case "inprogress":
        return "bg-blue-500";
      case "completed":
        return "bg-green-500";
      case "overdue":
        return "bg-red-500 ";
      default:
        return "bg-yellow-500";
    }
  };
  // Function to determine className based on task priority
  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case "low":
        return "bg-green-500";
      case "medium":
        return "bg-blue-500";

      default:
        return "bg-red-500";
    }
  };

  // Check if the task's deadline is overdue
  React.useEffect(() => {
    const interval = setInterval(() => {
      if (isDeadlineOver(item.deadline) && item.status !== "overdue") {
        toast.warning(`Task "${item.task}" is overdue!`, {
          position: "top-right",
          autoClose: 5000,
          onOpen: playNotificationSound,
        });
        editTask({ ...item, status: "overdue" });
      }
      if (checkDeadlineAhead(item)) {
        toast.warning(`Task "${item.task}" deadline is in 10 minutes!`, {
          position: "top-right",
          autoClose: 5000,
          onOpen: playNotificationSound,
        });
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [item, editTask]);

  return (
    <Card className="flex w-full justify-between text-justify">
      <div>
        <CardHeader>
          <CardTitle className="md:text-xl text-sm flex">
            {item.task}
            <span
              className={`text-[12px] font-normal italic ${getPriorityClass(
                item.priority
              )} ml-2 text-white px-2 rounded-md`}
            >
              {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}
            </span>
          </CardTitle>
          <div>
            {item.updatedAt ? (
              <p className="text-[12px] opacity-50 italic">
                Updated at: {dateToString(item.updatedAt)}
              </p>
            ) : (
              <p className="text-[12px] opacity-50 italic">
                Created at: {dateToString(item.createdAt)}
              </p>
            )}
            <p className="text-[12px] opacity-50 italic">
              Deadline: {dateToString(item.deadline)}
            </p>
          </div>
        </CardHeader>
      </div>
      <CardFooter className="md:flex flex-col items-end gap-2 p-4">
        <div className="flex gap-2">
          <SelectInput
            label="Status"
            className={`w-32 text-white ${getStatusClass(item.status)}`}
            options={
              item.status === "overdue"
                ? [
                    { value: "todo", label: "To Do" },
                    { value: "overdue", label: "Overdue" },
                  ]
                : progressOptions
            }
            value={item.status}
            onValueChange={(value) => editTask({ ...item, status: value })}
          />
          <ViewModal task={item} />
        </div>
        <AlertDialogBox
          actionText="Yes"
          cancelText="No"
          title="Delete this task?"
          description={`Are you sure you want to delete this task: ${item.task}?`}
          onAction={() => deleteTask(item.id)}
        >
          <p className="bg-destructive text-primary-foreground py-1 px-2 rounded-md hover:bg-destructive/70">
            Delete
          </p>
        </AlertDialogBox>
      </CardFooter>
    </Card>
  );
};

export default ToDoCard;
