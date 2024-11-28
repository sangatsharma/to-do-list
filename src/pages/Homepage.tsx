import * as React from "react";
import MyForm from "../components/Form";
import useStore from "../store/editorStore";
import Editor from "../components/Editor/Editor";
interface IHomePageProps {}

//

const HomePage: React.FunctionComponent<IHomePageProps> = () => {
  const tasks = useStore((state) => state.tasks);
  return (
    <div className="flex flex-col p-2 justify-center items-center md:mx-[30%] mx-auto">
      <div>
        <MyForm />
      </div>
      {tasks.length === 0 ? (
        <p>No tasks to do</p>
      ) : (
        <div className="flex flex-col gap-2 mt-4 text-left justify-center items-center w-full">
          <p className="text-2xl w-full ">Task to do:</p>
          {tasks.map((task, index) => (
            <div key={index} className="w-full p-2 border rounded-md">
              <p className="text-2xl">{task.task}</p>
              <p>{task.description}</p>
            </div>
          ))}
        </div>
      )}
      {/* <Editor id="" onChange={} initialContent={} /> */}
    </div>
  );
};

export default HomePage;
