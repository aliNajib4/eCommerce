import { lazy, Suspense } from "react";
import MainLayout from "../App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "@pages/Error"; // Error component can't be lazy-loaded if it's used in errorElement

const Home = lazy(() => import("@pages/Home"));
const Products = lazy(() => import("@pages/Products"));
const Categories = lazy(() => import("@pages/Categories"));
const AboutUs = lazy(() => import("@pages/AboutUs"));
const Login = lazy(() => import("@pages/Login"));
const Register = lazy(() => import("@pages/Register"));
const Cart = lazy(() => import("@pages/Cart"));
const Wishlist = lazy(() => import("@pages/Wishlist"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        index: true,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Cart />
          </Suspense>
        ),
      },
      {
        path: "/wishlist",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Wishlist />
          </Suspense>
        ),
      },
      {
        path: "/categories/products/:id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Products />
          </Suspense>
        ),
        loader: ({ params }) => {
          if (typeof params.id !== "string" || !/^[a-z]+$/i.test(params.id))
            throw new Response("Bad Request", {
              status: 400,
              statusText: "category not found",
            });
          return true;
        },
      },
      {
        path: "/categories",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Categories />
          </Suspense>
        ),
      },
      {
        path: "/about-us",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AboutUs />
          </Suspense>
        ),
      },
      {
        path: "/login",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "/register",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Register />
          </Suspense>
        ),
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
