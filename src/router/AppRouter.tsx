import { lazy, Suspense } from "react";
const MainLayout = lazy(() => import("../App"));
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "@pages/Error"; // Error component can't be lazy-loaded if it's used in errorElement
import { SuspensePage } from "@components/.";
import LottieHandler from "@components/feedback/LottieHandler";

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
    element: (
      <Suspense
        fallback={
          <LottieHandler type="loadingFull" message="Loading please wait..." />
        }
      >
        <MainLayout />
      </Suspense>
    ),
    errorElement: <Error />,
    children: [
      {
        path: "/",
        index: true,
        element: (
          <SuspensePage>
            <Home />
          </SuspensePage>
        ),
      },
      {
        path: "/cart",
        element: (
          <SuspensePage>
            <Cart />
          </SuspensePage>
        ),
      },
      {
        path: "/wishlist",
        element: (
          <SuspensePage>
            <Wishlist />
          </SuspensePage>
        ),
      },
      {
        path: "/categories/products/:id",
        element: (
          <SuspensePage>
            <Products />
          </SuspensePage>
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
          <SuspensePage>
            <Categories />
          </SuspensePage>
        ),
      },
      {
        path: "/about-us",
        element: (
          <SuspensePage>
            <AboutUs />
          </SuspensePage>
        ),
      },
      {
        path: "/login",
        element: (
          <SuspensePage>
            <Login />
          </SuspensePage>
        ),
      },
      {
        path: "/register",
        element: (
          <SuspensePage>
            <Register />
          </SuspensePage>
        ),
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
