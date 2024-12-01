import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage";
import EditPage from "./pages/EditPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ViewPage from "./pages/ViewPage";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Edit" element={<EditPage />} />
        <Route path="/View" element={<ViewPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
