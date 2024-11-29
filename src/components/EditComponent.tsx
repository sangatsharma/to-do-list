import * as React from "react";
import useStore from "../store/editorStore";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import AlertDialogBox from "../components/AlertDialog";
import Editor from "../components/Editor/Editor";
import { Task } from "../types/store.types";
import { OutputData } from "@editorjs/editorjs";
import { create } from "domain";
import { dateToString } from "../utils/dateFormater";

interface IEditComponentProps {
  task: Task;
  index: number;
  defaultData: OutputData;
}

const EditComponent: React.FunctionComponent<IEditComponentProps> = ({
  task,
  index,
  defaultData,
}) => {
  const deleteTask = useStore((state) => state.deleteTask);
  const editTask = useStore((state) => state.editTask);

  const [readOnly, setReadOnly] = React.useState(true);
  const [editorContent, setEditorContent] =
    React.useState<OutputData>(defaultData);
  const handleEditSave = () => {
    editTask({
      ...task,
      description: JSON.stringify(editorContent),
      updatedAt: new Date(),
      isUpdated: true,
    });
    setReadOnly(true);
  };

  const createdDate = dateToString(task.createdAt);
  const date=new Date(task.createdAt);
  const time=date.getTime();
  console.log(time,"time");
  const updateDate = task.updatedAt
    ? dateToString(task.updatedAt)
    : "Not updated yet";

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col justify-between">
          <CardTitle className="text-xl">{task.task}</CardTitle>
          {task.isUpdated ? (
            <p className="text-[12px] opacity-50">Updated at: {updateDate}</p>
          ) : (
            <p className="text-[12px] opacity-50">created at: {createdDate}</p>
          )}
        </div>

        <CardDescription className="text-md">
          <Editor
            id={`editorjs-${index}`}
            defaultData={editorContent}
            onChange={setEditorContent}
            className="h-42"
            readOnly={readOnly}
          />
        </CardDescription>
      </CardHeader>

      <CardFooter className="flex gap-4 p-4">
        <Button
          variant="default"
          onClick={() => setReadOnly(false)}
          className={`${readOnly ? "" : "hidden"}`}
        >
          Edit
        </Button>
        <Button
          variant="default"
          className={`${readOnly ? "hidden" : ""}`}
          onClick={handleEditSave}
        >
          Save
        </Button>
        <AlertDialogBox
          actionText="Yes"
          cancelText="No"
          title="Delete this task ?"
          description={`Are you sure you want to delete this task : ${task.task}?`}
          onAction={() => {
            deleteTask(task.id);
          }}
        >
          {" "}
          <span className="bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 h-9 px-4 py-2 rounded-sm">
            Delete
          </span>
        </AlertDialogBox>
      </CardFooter>
    </Card>
  );
};

export default EditComponent;
