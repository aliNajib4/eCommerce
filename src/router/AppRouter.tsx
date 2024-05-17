import MainLayout from "../App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Home,
  Products,
  Categories,
  AboutUs,
  Login,
  Register,
  Error,
} from "@pages/.";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        index: true,
        element: <Home />,
      },
      {
        path: "/products/:id",
        element: <Products />,
        loader: ({ params }) => {
          console.log(params);
          if (typeof params.id !== "string" || !/^[1-9]+$/i.test(params.id))
            throw new Response("Bad Request", {
              status: 400,
              statusText: "category not found",
            });
          return true;
        },
      },
      {
        path: "/categories",
        element: <Categories />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
