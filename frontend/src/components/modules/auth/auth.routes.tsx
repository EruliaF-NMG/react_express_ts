import { RouteObject } from "react-router-dom";
import LoginRegister from "./pages/login-register";

const authRoutes : RouteObject[] = [
        {
            path: "/",
            element: <LoginRegister />
        },
        {
            path: "/login",
            element: <LoginRegister />
        }
];

export default authRoutes;