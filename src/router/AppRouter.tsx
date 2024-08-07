import { lazy, Suspense } from "react";
const MainLayout = lazy(() => import("../App"));
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "@pages/Error"; // Error component can't be lazy-loaded if it's used in errorElement
import { SuspensePage, ProtecteRoute } from "@components/.";
import LottieHandler from "@components/feedback/LottieHandler";

const Home = lazy(() => import("@pages/Home"));
const Products = lazy(() => import("@pages/Products"));
const AboutUs = lazy(() => import("@pages/AboutUs"));
const SignUp = lazy(() => import("@pages/SignUp"));
const SignIn = lazy(() => import("@pages/SignIn"));
const Cart = lazy(() => import("@pages/Cart"));
const Wishlist = lazy(() => import("@pages/Wishlist"));
const Account = lazy(() => import("@pages/Account"));
const Orders = lazy(() => import("@pages/Orders"));
const ProfileLayout = lazy(() => import("@pages/ProfileLayout"));
const ProductPage = lazy(() => import("@pages/ProductPage"));

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
            <ProtecteRoute>
              <Wishlist />
            </ProtecteRoute>
          </SuspensePage>
        ),
      },
      {
        path: "/product/:id",
        element: (
          <SuspensePage>
            <ProductPage />
          </SuspensePage>
        ),
      },
      {
        path: "/products",
        element: (
          <SuspensePage>
            <Products />
          </SuspensePage>
        ),
      },
      {
        path: "/products/:id",
        element: (
          <SuspensePage>
            <Products />
          </SuspensePage>
        ),
        loader: ({ params }) => {
          const categories = ["gym", "formal", "casual", "party"];
          if (
            typeof params.id !== "string" ||
            !/^[a-z]+$/i.test(params.id) ||
            !categories.includes(params.id)
          )
            throw new Response("Bad Request", {
              status: 400,
              statusText: "category not found",
            });
          return true;
        },
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
        path: "/signIn",
        element: (
          <SuspensePage>
            <ProtecteRoute inSignin={true}>
              <SignIn />
            </ProtecteRoute>
          </SuspensePage>
        ),
      },
      {
        path: "/SignUp",
        element: (
          <SuspensePage>
            <ProtecteRoute inSignin={true}>
              <SignUp />
            </ProtecteRoute>
          </SuspensePage>
        ),
      },
      {
        path: "/profile",
        element: (
          <SuspensePage>
            <ProtecteRoute>
              <ProfileLayout />
            </ProtecteRoute>
          </SuspensePage>
        ),
        children: [
          {
            index: true,
            element: (
              <SuspensePage>
                <Account />
              </SuspensePage>
            ),
          },
          {
            path: "orders",
            element: (
              <SuspensePage>
                <Orders />
              </SuspensePage>
            ),
          },
        ],
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
