import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Homepage';
import EditPage from './pages/EditPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ViewPage from './pages/ViewPage';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './config/queryClient';
import InfiniteScroll from './pages/InfiniteScroll';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Edit" element={<EditPage />} />
          <Route path="/View" element={<ViewPage />} />
          <Route path="/Scroll" element={<InfiniteScroll />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
