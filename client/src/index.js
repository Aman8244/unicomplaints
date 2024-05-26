import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import Complaints from './pages/Complaints';
import ComplaintDetail from './pages/ComplaintDetail';
import PlagarismCheck from './pages/PlagarismCheck';
import { ClerkProvider } from '@clerk/clerk-react'
import Auth from './pages/Auth';
 
const PUBLISHABLE_KEY = "pk_test_aW52aXRpbmctbWVlcmthdC04LmNsZXJrLmFjY291bnRzLmRldiQ";
console.log(PUBLISHABLE_KEY)
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <App />
    ),
  },
  {
    path: "/complaints",
    element: (
      <Complaints />
    )
  },
  {
    path: "/complaint/:complaintId",
    element: (<ComplaintDetail />)
  },
  {
    path: "/copy",
    element: <PlagarismCheck />
  },
  {
    path:"/signin",
    element:<Auth/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <RouterProvider router={router}></RouterProvider>
    </ClerkProvider>
  </>
);

