import { Controller, useForm } from "react-hook-form";
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
import Editor from "./Editor/Editor";

interface ITaskFormProps {}

const MyForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
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
      description: data.description,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      isUpdated: data.isUpdated,
    });
    console.log("Form Data:", data);
    reset();
  };

  return (
    <div className="flex-col p-4">
      <Card className="w-[650px]">
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
              <label htmlFor="name">Description</label>
              {/* <textarea
                {...register("description")}
                placeholder="Add description"
                className="flex h-24 w-full rounded-md border border-input bg-transparent px-3 py-3 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              /> */}
           <Editor id="editor-content"  />
              {errors.description?.message &&
                typeof errors.description.message === "string" && (
                  <p className="text-red-500">{errors.description.message}</p>
                )}
            </div>
          </CardContent>
          <CardFooter className="flex gap-4">
            <Button variant="outline" onClick={() => reset()}>
              Reset
            </Button>
            <Button type="submit" variant="default" size="lg">
              Submit
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default MyForm;
