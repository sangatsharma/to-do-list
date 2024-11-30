import * as React from "react";

import useStore from "../store/editorStore";
import { Button } from "../components/ui/button";

import EditComponent from "../components/Editor/EditComponent";
import { useNavigate } from "react-router-dom";
interface IEditPageProps {}

const EditPage: React.FunctionComponent<IEditPageProps> = () => {
  const tasks = useStore((state) => state.tasks);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center m-4">
      <Button
        variant="default"
        className="right-2 top-2 fixed z-10"
        onClick={() => navigate("/")}
      >
        Home Page
      </Button>
      <div>
        {tasks.length === 0 ? (
          <p>No tasks to do</p>
        ) : (
          <p className="text-2xl w-full text-center ">Task to do:</p>
        )}
      </div>

      <div className={` w-full md:grid md:grid-cols-3 gap-2 flex flex-col`}>
        {tasks.map((item, index) => {
          const editorContent = JSON.parse(item.description);
          return (
            <div key={index} className="p-2 w-full">
              <EditComponent
                task={item}
                index={index}
                defaultData={editorContent}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EditPage;

{
  /* <Card>
  <CardHeader>
    <CardTitle className="text-xl">{item.task}</CardTitle>
    <CardDescription className="text-md">
      <Editor
        id={`editorjs-${index}`}
        defaultData={editorContent}
        onChange={() => {}}
        className="h-42"
      />
    </CardDescription>
  </CardHeader>

  <CardFooter className="flex gap-4 p-4">
    <Button variant="default">Edit</Button>
    <AlertDialogBox
      actionText="Yes"
      cancelText="No"
      title="Delete this task ?"
      description={`Are you sure you want to delete this task : ${item.task}?`}
      onAction={() => {
        deleteTask(item.id);
      }}
    >
      {" "}
      <span className="bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 h-9 px-4 py-2 rounded-sm">
        Delete
      </span>
    </AlertDialogBox>
  </CardFooter>
</Card>; */
}
