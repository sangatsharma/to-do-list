import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as React from 'react';
import { Input } from '../ui/input';
import useStore from '../../store/editorStore';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { formSchema, form } from '../../utils/validationSchema';
import { OutputData } from '@editorjs/editorjs';
import Editor from '../Editor/Editor';
import { useState } from 'react';
import SelectInput from '../Editor/SelectInput';
import { toast } from 'react-toastify';
import { cn } from '@/lib/utils';

interface IEditorRef {
  clear: () => void;
}

const MyForm: React.FC = () => {
  const DEFAULT_INITIAL_DATA = {
    time: new Date().getTime(),
    blocks: [],
  };

  const [editorContent, setEditorContent] =
    useState<OutputData>(DEFAULT_INITIAL_DATA);
  const editorRef = React.useRef<IEditorRef | null>(null);

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
      task: '',
      description: JSON.stringify(editorContent),
      createdAt: undefined,
      updatedAt: undefined,
      isUpdated: false,
      priority: 'low',
    },
  });
  const tasks = useStore((state) => state.tasks);
  const addTask = useStore((state) => state.addTask);
  // Reset the form and editor content
  const handleReset = () => {
    if (editorRef.current) {
      editorRef.current.clear();
    }
    setEditorContent(DEFAULT_INITIAL_DATA);
    reset();
  };

  const onSubmit = (data: form) => {
    // Validate editor content manually
    if (editorContent.blocks.length === 0) {
      setError('description', {
        type: 'manual',
        message: 'Editor must have at least one block.',
      });
      return;
    }

    // Clear description error if validation passes
    clearErrors('description');
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
      status: 'todo',
    });
    setEditorContent(DEFAULT_INITIAL_DATA);

    toast.success(cn('Task', data.task, 'added in to do list.'), {
      position: 'top-right',
      autoClose: 5000,
    });
    handleReset();
  };
  const options = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
  ];

  return (
    <div className="flex-col w-full">
      <Card className="md:w-[650px] w-full">
        <CardHeader className="pl-7">
          <label htmlFor="task">Add task</label>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 ">
          <CardContent>
            <div className="flex flex-col space-y-1.5 gap-1">
              <Input
                {...register('task')}
                placeholder="Add new task"
                className="h-12"
                id="task"
              />
              {errors.task && (
                <p className="text-red-500">{errors.task.message}</p>
              )}
              <div className="flex flex-wrap gap-6">
                <div className="flex flex-col">
                  <label htmlFor="deadline" className="px-1">
                    Set Deadline
                  </label>
                  <input
                    aria-label="Date and time"
                    className="border border-gray-300 rounded-md h-12 p-2 w-[210px]"
                    title="Date and time"
                    type="datetime-local"
                    {...register('deadline')}
                    placeholder="Set deadline"
                    id="deadline"
                  />
                  {errors.deadline && (
                    <p className="text-red-500">{errors.deadline.message}</p>
                  )}
                </div>
                <div className="flex flex-col">
                  <label htmlFor="priority" className="px-1">
                    Set Priority
                  </label>
                  <Controller
                    name="priority"
                    control={control}
                    defaultValue="low"
                    render={({ field: { value, onChange } }) => (
                      <SelectInput
                        className="h-12 w-[180px]"
                        value={value}
                        onValueChange={onChange}
                        label="Priority"
                        id="priority"
                        options={options}
                      />
                    )}
                  />
                  {errors.priority && (
                    <p className="text-red-500">{errors.priority.message}</p>
                  )}
                </div>
              </div>
              <div>
                <label htmlFor="editorjs" className="pl-1">
                  Description
                </label>
                <Editor
                  ref={editorRef}
                  id="editorjs"
                  defaultData={editorContent}
                  onChange={setEditorContent}
                />
                {errors.description && (
                  <p className="text-red-500">{errors.description.message}</p>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex gap-4 justify-start">
            <Button type="submit" variant="default">
              Submit
            </Button>
            <Button variant="outline" type="button" onClick={handleReset}>
              Reset
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default MyForm;
