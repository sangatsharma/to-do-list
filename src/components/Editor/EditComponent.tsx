import * as React from "react";
import useStore from "../../store/editorStore";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import AlertDialogBox from "../AlertDialog";
import Editor from "./Editor";
import { Task } from "../../types/store.types";
import { OutputData } from "@editorjs/editorjs";
import { dateToString } from "../../utils/dateFormater";

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
    //check for if edit task isnew or not
    console.log(editorContent, "editorContent");
    if (task.description !== JSON.stringify(editorContent).trim()) {
      editTask({
        ...task,
        description: JSON.stringify(editorContent),
        updatedAt: new Date(),
        isUpdated: true,
      });
    }

    setReadOnly(true);
  };

  const createdDate = dateToString(task.createdAt);
  const updateDate = task.updatedAt
    ? dateToString(task.updatedAt)
    : "Not updated yet";

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col justify-between">
          <CardTitle className="text-xl">{task.task}</CardTitle>
          {task.isUpdated ? (
            <p className="text-[12px] opacity-50 italic">
              Updated at: {updateDate}
            </p>
          ) : (
            <p className="text-[12px] opacity-50 italic">
              created at: {createdDate}
            </p>
          )}
          <p className="text-[12px] opacity-50 italic">
            Deadline: {dateToString(task.deadline)}
          </p>
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
          className={`${readOnly ? "py-2" : "hidden"}`}
        >
          Edit
        </Button>
        <Button
          variant="default"
          className={`${readOnly ? "hidden" : "py-2"}`}
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
          <span className="bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90  px-4 py-2 rounded-md">
            Delete
          </span>
        </AlertDialogBox>
      </CardFooter>
    </Card>
  );
};

export default EditComponent;
