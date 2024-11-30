import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { Input } from "../ui/input";
import useStore from "../../store/editorStore";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { formSchema, form } from "../../utils/validationSchema";
import { OutputData } from "@editorjs/editorjs";
import Editor from "../Editor/Editor";
import { useState } from "react";
import SelectInput from "../Editor/SelectInput";
import { toast } from "react-toastify";

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
    control,
    formState: { errors },
  } = useForm<form>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      task: "",
      description: JSON.stringify(editorContent),
      createdAt: undefined,
      updatedAt: undefined,
      isUpdated: false,
      priority: "low",
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

    console.log("forms values", data);
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
      updatedAt: undefined,
      isUpdated: data.isUpdated,
      deadline: new Date(data.deadline),
      notified: false,
      warn: false,
      priority: data.priority,
      status: "todo",
    });
    toast.success(`Task "${data.task}" added in to do list.`, {
      position: "top-right",
      autoClose: 5000,
    });
    setShouldReset(true);
    reset();
  };
  const options = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
  ];

  return (
    <div className="flex-col w-full">
      <Card className="md:w-[650px] w-full">
        <CardHeader>
          <CardTitle className="text-2xl">
            {" "}
            <label htmlFor="task">Add task</label>
          </CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 ">
          <CardContent>
            <div className="flex flex-col space-y-1.5 gap-1">
              <Input
                {...register("task")}
                placeholder="Add new task"
                className="h-12"
                id="task"
              />
              {errors.task && (
                <p className="text-red-500">{errors.task.message}</p>
              )}
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col">
                  <label htmlFor="deadline" className="px-1">Set Deadline</label>
                  <input
                    aria-label="Date and time"
                    className="border border-gray-300 rounded-md h-12 p-2"
                    title="Date and time"
                    type="datetime-local"
                    {...register("deadline")}
                    placeholder="Set deadline"
                    id="deadline"
                  />
                  {errors.deadline && (
                    <p className="text-red-500">{errors.deadline.message}</p>
                  )}
                </div>
                <div className="flex flex-col">
                  <label htmlFor="priority" className="px-1">Set Priority</label>
                  <Controller
                    name="priority"
                    control={control}
                    render={({ field }) => (
                      <SelectInput
                      className="h-12"
                        value="low"
                        onValueChange={field.onChange}
                        label="Priority"
                        options={options}
                        {...register("priority")}
                      />
                    )}
                  />
                  {errors.priority && (
                    <p className="text-red-500">{errors.priority.message}</p>
                  )}
                </div>
              </div>

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
