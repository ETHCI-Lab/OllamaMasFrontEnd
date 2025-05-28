import { createHashRouter } from "react-router";
import { Home } from "../view/home";
import { Login } from "../view/login";

export const router = createHashRouter([
    {
        path: '/:sid',
        element: <Home />,
    },
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/login',
        element: <Login />,
    },
])