import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "../view/homepage/Homepage";


const RouterPath = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Homepage />,
        },
    ]);
    return <RouterProvider router={router} />
}

export default RouterPath;