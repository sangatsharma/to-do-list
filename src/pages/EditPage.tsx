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
interface IEditPageProps {}

const EditPage: React.FunctionComponent<IEditPageProps> = () => {
  const tasks = useStore((state) => state.tasks);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col  mt-4  items-center text-left md:mx-[30%] px-2 mx-6">
        <p className="text-2xl w-full ">Task to do:</p>
        {tasks.map((item, index) => (
          <div key={index} className="w-full p-2">
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-xl">{item.task}</CardTitle>
                <CardDescription className="text-md">
                  {item.description}
                </CardDescription>
              </CardHeader>

              <CardFooter className="flex gap-4 p-4">
                <AlertDialogBox
                  actionText="Yes"
                  cancelText="No"
                  title="Delete this task ?"
                  description={`Are you sure you want to delete this task : ${item.task}?`}
                >
                  {" "}
                  <span className="bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 h-9 px-4 py-2 rounded-sm">
                    Delete
                  </span>
                </AlertDialogBox>
                <Button variant="destructive">Delete</Button>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditPage;
