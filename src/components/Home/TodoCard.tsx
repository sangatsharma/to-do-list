import * as React from "react";
import AlertDialogBox from "../AlertDialog";
import { Card, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { dateToString } from "@/utils/dateFormater";
import SelectInput from "../Editor/SelectInput";
import useStore from "@/store/editorStore";
import { TTask } from "@/types/store.types";
import { toast } from "react-toastify";
import { Button } from "../ui/button";
import { playNotificationSound } from "@/utils/notification";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface IToDoCardProps {
  item: TTask;
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
  // const editorContent = JSON.parse(item.description);
  const navigate = useNavigate();

  return (
    <Card className="flex w-full justify-between">
      <div>
        <CardHeader>
          <CardTitle className="md:text-xl text-sm">
            {item.task}
            <span
              className={cn(
                "text-[12px] p-1 font-normal italic ml-2 text-white px-2 rounded-md",
                getPriorityClass(item.priority)
              )}
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
      <CardFooter className="flex flex-col items-end gap-2 p-4">
        <div className="flex flex-col gap-2 md:flex-row items-end">
          <SelectInput
            label="Status"
            className={cn(
              "md:w-32 w-auto text-[10px] md:text-[14px]  text-white",
              getStatusClass(item.status)
            )}
            options={
              item.status === "overdue"
                ? [
                    { value: "todo", label: "To Do" },
                    { value: "overdue", label: "Overdue" },
                  ]
                : progressOptions
            }
            value={item.status}
            onValueChange={(value) => {
              if (value === "completed") playNotificationSound("completed");
              editTask({ ...item, status: value });
            }}
          />
          <Button
            onClick={() =>
              navigate("/view", {
                state: { task: item },
              })
            }
          >
            View
          </Button>
        </div>
        <AlertDialogBox
          actionText="Yes"
          cancelText="No"
          title="Delete this task?"
          description={`Are you sure you want to delete this task: ${item.task}?`}
          onAction={() => {
            toast.info(`Task "${item.task}" is deleted successfully.`, {
              position: "top-right",
              autoClose: 5000,
            });
            deleteTask(item.id);
          }}
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
