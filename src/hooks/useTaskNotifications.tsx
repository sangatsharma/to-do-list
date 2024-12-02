import useStore from "@/store/editorStore";
import { TTask } from "@/types/store.types";
import { isDeadlineOver } from "@/utils/dateFormater";
import {
  checkDeadlineAhead,
  playNotificationSound,
} from "@/utils/notification";
import { useEffect } from "react";
import { toast } from "react-toastify";

interface ITaskNotificationsProps {
  tasks: TTask[];
  editTask: (task: TTask) => void;
}
const useTaskNotifications = ({ tasks, editTask }: ITaskNotificationsProps) => {
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("checking for overdue tasks");
      const tasks = useStore.getState().tasks;
      tasks.forEach((item) => {
        if (
          !item.notified &&
          isDeadlineOver(item.deadline) &&
          item.status !== "overdue"
        ) {
          console.log(`Task "${item.task}" is overdue!`);
          toast.warning(`Task "${item.task}" is overdue!`, {
            position: "top-right",
            autoClose: 5000,
            onOpen: () => playNotificationSound("notification"),
          });
          const updatedItem = { ...item, status: "overdue", notified: true };
          editTask(updatedItem);
        }
        if (checkDeadlineAhead(item) && !item.warn) {
          const now = new Date();
          const date = new Date(item.deadline);
          const timeDiff = date.getTime() - now.getTime();
          const minutesDiff = Math.floor(timeDiff / (1000 * 60));
          console.log(
            `Task "${item.task}" deadline is in ${minutesDiff} minutes!`
          );
          toast.warning(
            `Task "${item.task}" deadline is in ${minutesDiff} minutes!`,
            {
              position: "top-right",
              autoClose: 5000,
              onOpen: () => playNotificationSound("notification"),
            }
          );
          const updatedItem = { ...item, warn: true };
          editTask(updatedItem);
        }
      });
    }, 60000);

    return () => clearInterval(interval);
  }, [tasks, editTask]);
};

export default useTaskNotifications;
