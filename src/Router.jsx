import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";

import DevGuide from "./pages/DevGuide/DevGuide";
import Landing from "./Pages/Landing/Landing";
import Login from "./Pages/authentication/Login";

import { Register } from "./Pages/authentication/Register";
import Board1 from "./components/boards/Board1";

/**
 * To add a new page, make a new element in the Pages folder and add a
 * new Route below linking that element to the corresponding URL path.
 */
export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing />,
    },
    {
      path: "/dev-guide",
      element: <DevGuide />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/about",
      element: <About />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/board1",
      element: <Board1 />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);
  return <RouterProvider router={router} />;
}
