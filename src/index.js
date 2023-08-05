import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import EmptyPage from './EmptyPage';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/empty",
    element: <EmptyPage />,
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

reportWebVitals();