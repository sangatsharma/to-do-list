import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { Input } from "./ui/input";
import useStore from "../store/editorStore";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { formSchema, User } from "../utils/validationSchema";
import { OutputData } from "@editorjs/editorjs";
import Editor from "./Editor/Editor";

const MyForm: React.FC = () => {
  const DEFAULT_INITIAL_DATA = {
    time: new Date().getTime(),
    blocks: [
      {
        type: "header",
        data: {
          text: "This is my awesome editor!",
          level: 1,
        },
      },
    ],
  };

  const [editorContent, setEditorContent] =
    React.useState<OutputData>(DEFAULT_INITIAL_DATA);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<User>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      task: "",
      description: undefined,
      createdAt: undefined,
      updatedAt: undefined,
      isUpdated: false,
    },
  });
  const tasks = useStore((state) => state.tasks);
  const addTask = useStore((state) => state.addTask);
  const onSubmit = (data: User) => {
    console.log("editorContent", editorContent);
    const now = new Date();
    if (!data.createdAt) {
      data.createdAt = now;
      data.updatedAt = undefined;
      data.isUpdated = false;
    } else {
      data.createdAt = data.createdAt;
      data.updatedAt = now;
      data.isUpdated = true;
    }
    data.updatedAt = now;
    addTask({
      id: tasks.length + 1,
      task: data.task,
      description: JSON.stringify(editorContent),
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      isUpdated: data.isUpdated,
      deadline: new Date(),
      completed: false,
    });
    setEditorContent(DEFAULT_INITIAL_DATA);
    reset();
  };

  return (
    <div className="flex-col">
      <Card className="md:w-[650px] w-full">
        <CardHeader>
          <CardTitle className="text-2xl">TO DO LIST</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 ">
          <CardContent>
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="name">Add task</label>
              <Input
                {...register("task")}
                placeholder="Add new task"
                className="h-12"
              />
              {errors.task && (
                <p className="text-red-500">{errors.task.message}</p>
              )}
              <label htmlFor="deadline">Set Deadline</label>
              <input
                aria-label="Date and time"
                className=""
                title="Date and time"
                type="datetime-local"
                {...register("deadline")}
                placeholder="Set deadline"
              />
              {errors.deadline && (
                <p className="text-red-500">{errors.deadline.message}</p>
              )}
              <label htmlFor="name">Description</label>
              <Editor
                id="editorjs"
                defaultData={editorContent}
                onChange={setEditorContent}
              />
              {errors.description?.message &&
                typeof errors.description.message === "string" && (
                  <p className="text-red-500">{errors.description.message}</p>
                )}
            </div>
          </CardContent>
          <CardFooter className="flex gap-4 justify-start">
            <Button type="submit" variant="default">
              Submit
            </Button>
            <Button variant="outline" onClick={() => reset()}>
              Reset
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default MyForm;
