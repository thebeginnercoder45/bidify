import React from "react";
import SignUp from "./auth/SignUp";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Layout from "./components/Layout";
import NotFound from "./components/NotFound";
import SignIn from "./auth/SignIn";
import SellerSignUp from "./auth/SellerSignUp";
import DashboadLayout from "./dashboard/DashboadLayout";
import CreateItems from "./dashboard/CreateItems";
import MyItems from "./dashboard/MyItems";
import ItemDetails from "./components/AuctionItems/ItemDetails";
import ItemDet from "./dashboard/ItemDet";
import MyBiddings from "./components/MyBiddings";
import Auctions from "./components/Auctions";
import ManageItems from "./dashboard/ManageItems";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/my-biddings",
        element: <MyBiddings />,
      },
      {
        path: "/auctions",
        element: <Auctions />,
      },
      {
        path: "/item-details/:id",
        element: <ItemDetails />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/register-seller",
    element: <SellerSignUp />,
  },
  {
    path: "/dashboard",
    element: <DashboadLayout />,
    children: [
      {
        path: "create-auction-items",
        element: <CreateItems />,
      },
      {
        path: "my-auction-items",
        element: <MyItems />,
      },
      {
        path: "manage-auction-items/:id",
        element: <ManageItems />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
