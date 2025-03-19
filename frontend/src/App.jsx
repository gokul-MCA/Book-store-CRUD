import React from "react";
import Home from "./pages/home";
import { Route, Routes } from "react-router-dom";
import ToastProvider from "./contexts/toastProvider";
import Toaster from "./components/toaster";
import HomeLayout from "./layout/homeLayout";
import Contact from "./pages/contact";
import FilterBooks from "./pages/filterBooks";
import NotFound from "./pages/notFound";

const App = () => {
  return (
    <div className="relative min-h-screen">
      <ToastProvider>
        <Routes>
          <Route path="/" element={<HomeLayout />}>
            <Route index element={<Home/>}/>
            <Route path="books" element={<FilterBooks/>} />
            <Route path="contact" element={<Contact/>} />
          </Route>
            <Route path='*' element={<NotFound/>}/>
        </Routes>
        <Toaster />
      </ToastProvider>
    </div>
  );
}; 

export default App;
