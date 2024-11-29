import * as React from "react";
import MyForm from "../components/Form";
import useStore from "../store/editorStore";
import { Card, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import AlertDialogBox from "../components/AlertDialog";
import { useNavigate } from "react-router-dom";
interface IHomePageProps {}

const HomePage: React.FunctionComponent<IHomePageProps> = () => {
  const tasks = useStore((state) => state.tasks);
  const deleteTask = useStore((state) => state.deleteTask);
  const navigate = useNavigate();
  return (
    <div className="flex md:flex-row flex-col  p-2 pt-4 gap-2 justify-center w-auto ">
      <Button
        variant="default"
        className="mt-4 right-5 bottom-5 fixed"
        onClick={() => navigate("/edit")}
      >
        Edit Page
      </Button>
      <MyForm />

      <div className="flex flex-col justify-start items-left md:w-[650px] w-full">
        {tasks.length === 0 ? (
          <p className="text-2xl w-full text-center ">No tasks to do</p>
        ) : (
          <p className="text-2xl w-full text-center">Task to do:</p>
        )}
        {tasks.map((item, index) => (
          <div key={index} className="flex justify-start p-2">
            <Card className="flex w-full justify-between text-justify">
              <div>
                <CardHeader>
                  <CardTitle className="md:text-xl text-sm">{item.task}</CardTitle>
                </CardHeader>
              </div>
              <CardFooter className="flex gap-4 p-4">
                <Button variant="default">View</Button>
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
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
