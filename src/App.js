import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import EditorPage from './pages/EditorPage/EditorPage';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Toaster position="top-center" toastOptions={{
        success: {
          theme: {
            primary: "#7ed957",
          },
          style: {
            fontWeight: "700"
          }
        },
        error: {
          duration: 4000,
          style: {
            fontWeight: "700"
          }
        }
      }} />
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<Home />}>
          </Route>
          <Route path='/editor/:roomId' element={<EditorPage />}>
          </Route>
          <Route path='*' element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
