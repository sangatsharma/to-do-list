import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage";
import EditPage from "./pages/EditPage";
import useStore from "./store/editorStore";
import { useEffect } from "react";
import { checkDeadlines, playNotificationSound } from "./utils/notification";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const tasks = useStore((state) => state.tasks);
  console.log("Tasks:", tasks);

  useEffect(() => {
    const interval = setInterval(() => {
      const todosNearDeadline = checkDeadlines(useStore.getState().tasks);
      console.log("Todos near deadline:", todosNearDeadline);
      todosNearDeadline.forEach((todo) => {
        toast.warning(`Task "${todo.task}" is due soon!`, {
          position: "top-right",
          autoClose: 5000,
          onOpen: playNotificationSound,
        });
      });
    }, 60000);

    return () => clearInterval(interval);
  }, []);
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Edit" element={<EditPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
