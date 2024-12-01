import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AlertDialogBox from "@/components/AlertDialog";
import CustomModal from "@/components/CustomModal";
import EditComponent from "@/components/Editor/EditComponent";
import BlockRenderer from "@/components/Renderer/BlockRenderer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useStore from "@/store/editorStore";
import { Task } from "@/types/store.types";
import { dateToString } from "@/utils/dateFormater";
import { getTaskById } from "@/utils/localStorageHelpers";
import { OutputData } from "@editorjs/editorjs";
import { toast } from "react-toastify";

interface IViewPageProps {}

const ViewPage: React.FunctionComponent<IViewPageProps> = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const DATA = location.state;

  const todo = DATA?.task;

  const [isModalOpen, setIsModalOpen] = React.useState({
    view: false,
    editstatus: false,
  });

  const [task, setTask] = React.useState<Task>(todo);
  const deleteTask = useStore((state) => state.deleteTask);

  useEffect(() => {
    if (!location.state) {
      navigate("/");
    }
  }, [location.state, navigate]);

  // Fetch the task from localStorage on component mount
  useEffect(() => {
    if (todo?.id) {
      const storedTask = getTaskById(todo.id);
      if (storedTask) {
        setTask(storedTask);
      } else {
        navigate("/"); 
      }
    }
  }, [todo, navigate]);

  if (!todo) {
    return null;
  }

  const createdDate = dateToString(task.createdAt);
  const updateDate = task.updatedAt
    ? dateToString(task.updatedAt)
    : "Not updated yet";

  return (
    <div className="flex justify-center p-4 text-left w-full">
      <Card className="w-full p-8">
        <CardHeader>
          <div className="flex flex-col justify-between">
            <CardTitle className="text-xl">{task.task}</CardTitle>
            {task.isUpdated ? (
              <p className="text-[12px] opacity-50 italic">
                Updated at: {updateDate}
              </p>
            ) : (
              <p className="text-[12px] opacity-50 italic">
                Created at: {createdDate}
              </p>
            )}
            <p className="text-[12px] opacity-50 italic">
              Deadline: {dateToString(task.deadline)}
            </p>
          </div>

          <CardDescription className="text-md">
            <div className="p-4 editorContent">
              <BlockRenderer
                data={JSON.parse(task.description) as OutputData}
              />
            </div>
          </CardDescription>
        </CardHeader>

        <CardFooter className="flex gap-4 p-4">
          <Button
            onClick={() => setIsModalOpen({ ...isModalOpen, view: true })}
          >
            View
          </Button>
          <CustomModal
            isOpen={isModalOpen.view}
            onClose={() => {
              setIsModalOpen({ view: false, editstatus: false });
              const task = getTaskById(todo.id);
              if (task) {
                setTask(task);
              } else {
                navigate("/");
              }
            }}
            title="View Task"
          >
            <EditComponent
              task={task}
              defaultData={JSON.parse(task.description)}
              index={task.id}
            />
          </CustomModal>
          <AlertDialogBox
            actionText="Yes"
            cancelText="No"
            title="Delete this task?"
            description={`Are you sure you want to delete this task: ${task.task}?`}
            onAction={() => {
              deleteTask(task.id);
              navigate("/");
              toast.success(`Task ${task.task} deleted successfully`);
            }}
          >
            {" "}
            <span className="bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 px-4 py-2 rounded-md">
              Delete
            </span>
          </AlertDialogBox>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ViewPage;
