import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { Input } from "./ui/input";
import useStore from "../store/store";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface ITaskFormProps {}

const schema = z.object({
  task: z.string().min(1, "Task is required"),
  description: z.string().min(1, "Description is required"),
  //   createdAt: z.date().default(() => new Date()),
});
// extract the inferred type
type User = z.infer<typeof schema>;
const MyForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<User>({
    resolver: zodResolver(schema),
  });

  const tasks = useStore((state) => state.tasks);
  const addTask = useStore((state) => state.addTask);

  const onSubmit = (data: User) => {
    addTask({ task: data.task, description: data.description });
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
              <textarea
                {...register("description")}
                placeholder="Add description"
                className="flex h-24 w-full rounded-md border border-input bg-transparent px-3 py-3 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              />
              {errors.task && (
                <p className="text-red-500">{errors.description?.message}</p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
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
