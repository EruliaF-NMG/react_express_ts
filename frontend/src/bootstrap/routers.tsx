import { createBrowserRouter, RouterProvider } from "react-router-dom";
import authRoutes from "../components/modules/auth/auth.routes";

const router = createBrowserRouter([
    ...authRoutes,
]);

const Routes = () : JSX.Element => {
    return (
        <RouterProvider router={router} />
    );
};
  
export default Routes;