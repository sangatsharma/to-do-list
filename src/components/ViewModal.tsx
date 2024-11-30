import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Task } from "@/types/store.types";
import EditComponent from "./Editor/EditComponent";

interface IViewModalProps {
  task: Task;
}

const ViewModal: React.FunctionComponent<IViewModalProps> = ({ task }) => {
  const editorContent = JSON.parse(task.description);
  return (
    <Dialog>
      <DialogTitle className="hidden">{task.task}</DialogTitle>
      <DialogTrigger className="bg-primary text-primary-foreground shadow hover:bg-primary/90 py-1 w-16  px-2 rounded-md ">
        View
      </DialogTrigger>
      <DialogContent className="">
        <DialogDescription></DialogDescription>{" "}
        <EditComponent
          task={task}
          defaultData={editorContent}
          index={task.id}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ViewModal;
