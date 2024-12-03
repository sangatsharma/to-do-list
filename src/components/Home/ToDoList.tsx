import { TTask } from '@/types/store.types';
import ToDoCard from './TodoCard';
import useStore from '@/store/editorStore';
import useTaskNotifications from '@/hooks/useTaskNotifications';

interface IToDoListProps {
  tasks: TTask[];
}

const ToDoList: React.FunctionComponent<IToDoListProps> = ({ tasks }) => {
  const editTask = useStore((state) => state.editTask);
  useTaskNotifications({ tasks, editTask });

  return (
    <div className="flex flex-col justify-start items-left md:w-[650px] w-full">
      {tasks.length === 0 ? (
        <p className="text-2xl w-full text-center ">No tasks to do</p>
      ) : (
        <p className="text-2xl w-full text-center">Task to do:</p>
      )}
      {tasks.map((item, index) => (
        <div key={index} className="flex justify-start p-2">
          <ToDoCard item={item} />
        </div>
      ))}
    </div>
  );
};

export default ToDoList;
