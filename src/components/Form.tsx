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
import { formSchema, form } from "../utils/validationSchema";
import { OutputData } from "@editorjs/editorjs";
import Editor from "./Editor/Editor";
import { useState } from "react";

const MyForm: React.FC = () => {
  const DEFAULT_INITIAL_DATA = {
    time: new Date().getTime(),
    blocks: [],
  };

  const [editorContent, setEditorContent] =
    useState<OutputData>(DEFAULT_INITIAL_DATA);
  const [shouldReset, setShouldReset] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<form>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      task: "",
      description: JSON.stringify(editorContent),
      createdAt: undefined,
      updatedAt: undefined,
      isUpdated: false,
    },
  });
  const tasks = useStore((state) => state.tasks);
  const addTask = useStore((state) => state.addTask);

  const onSubmit = (data: form) => {
    // Validate editor content manually
    if (editorContent.blocks.length === 0) {
      setError("description", {
        type: "manual",
        message: "Editor must have at least one block.",
      });
      return;
    }

    // Clear description error if validation passes
    clearErrors("description");

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

    setShouldReset(true);
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
                className="border border-gray-300 rounded-md h-12 p-2"
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
                shouldReset={shouldReset}
              />
              {errors.description && (
                <p className="text-red-500">{errors.description.message}</p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex gap-4 justify-start">
            <Button type="submit" variant="default">
              Submit
            </Button>
            <Button variant="outline" type="reset">
              Reset
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default MyForm;
