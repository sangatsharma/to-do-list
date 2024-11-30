import * as React from "react";
import MyForm from "../components/Form";
import useStore from "../store/editorStore";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import ToDoCard from "@/components/TodoCard";
("../components/CustomModal");

interface IHomePageProps {}

const HomePage: React.FunctionComponent<IHomePageProps> = () => {
  const tasks = useStore((state) => state.tasks);
  const navigate = useNavigate();

  return (
    <div className="flex xl:flex-row  flex-col items-center xl:items-start  p-2 pt-4 gap-2 justify-center w-auto">
      <Button
        variant="default"
        className="right-2 top-2 fixed z-10"
        onClick={() => navigate("/edit")}
      >
        Edit Page
      </Button>
      <div className="w-full xl:w-auto flex flex-col justify-center items-center">
        <p className="text-2xl w-full text-left font-bold">To Do LIST</p>
        <MyForm />
      </div>
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
    </div>
  );
};

export default HomePage;
