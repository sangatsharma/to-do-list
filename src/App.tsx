import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage";
import EditPage from "./pages/EditPage";
import useStore from "./store/store";

function App() {
  const tasks = useStore((state) => state.tasks);
  console.log("Tasks:", tasks);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Edit" element={<EditPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
