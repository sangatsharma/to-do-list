import { Task } from "@/types/store.types";
import * as React from "react";
import ToDoCard from "./TodoCard";
import {
  checkDeadlineAhead,
  playNotificationSound,
} from "@/utils/notification";
import { toast } from "react-toastify";
import { isDeadlineOver } from "@/utils/dateFormater";
import useStore from "@/store/editorStore";

interface IToDoListProps {
  tasks: Task[];
}

const ToDoList: React.FunctionComponent<IToDoListProps> = ({ tasks }) => {
  const editTask = useStore((state) => state.editTask);
  // Check if the task's deadline is overdue
  React.useEffect(() => {
    const interval = setInterval(() => {
      console.log("checking for overdue tasks");
      tasks.forEach((item) => {
        if (
          !item.notified &&
          isDeadlineOver(item.deadline) &&
          item.status !== "overdue"
        ) {
          toast.warning(`Task "${item.task}" is overdue!`, {
            position: "top-right",
            autoClose: 5000,
            onOpen: ()=>{playNotificationSound("notification")},
          });
          editTask({ ...item, status: "overdue", notified: true });
        }
        if (checkDeadlineAhead(item) && !item.warn) {
          const now = new Date();
          const date = new Date(item.deadline);
          const timeDiff = date.getTime() - now.getTime();
          const minutesDiff = Math.floor(timeDiff / (1000 * 60));
          toast.warning(
            `Task "${item.task}" deadline is in ${minutesDiff} minutes!`,
            {
              position: "top-right",
              autoClose: 5000,
              onOpen: ()=>{playNotificationSound("notification")},
            }
          );
          editTask({ ...item, warn: true });
        }
      });
    }, 60000);

    return () => clearInterval(interval);
  }, [tasks, editTask]);

  return (
    <div className="flex flex-col justify-start items-left md:w-[650px] w-full">
      {tasks.length === 0 ? (
        <p className="text-2xl w-full text-center ">No tasks to do</p>
      ) : (
        <p className="text-2xl w-full text-center">Task to do:</p>
      )}
      {tasks.map((item, index) => (
        <div key={index} className="flex justify-start p-2">
          <ToDoCard item={item} />
        </div>
      ))}
    </div>
  );
};

export default ToDoList;
