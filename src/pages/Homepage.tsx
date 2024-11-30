import * as React from "react";
import MyForm from "../components/Home/Form";
import useStore from "../store/editorStore";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import ToDoList from "@/components/Home/ToDoList";
("../components/CustomModal");

interface IHomePageProps {}

const HomePage: React.FunctionComponent<IHomePageProps> = () => {
  const tasks = useStore((state) => state.tasks);
  const navigate = useNavigate();

  return (
    <div className="flex lg:flex-row flex-col items-center lg:items-start p-2 pt-4 gap-2 justify-center w-auto">
      <Button
        variant="default"
        className="right-2 top-2 fixed z-10"
        onClick={() => navigate("/edit")}
      >
        Edit Page
      </Button>
      <div className="w-full xl:w-auto md:w-auto flex flex-col justify-center items-center">
        <p className="text-xl w-full text-left p-2 font-bold">To Do LIST</p>
        <MyForm />
      </div>
      <ToDoList tasks={tasks} />
    </div>
  );
};

export default HomePage;
