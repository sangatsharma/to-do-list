import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage";
import EditPage from "./pages/EditPage";
import useStore from "./store/editorStore";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const tasks = useStore((state) => state.tasks);


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
