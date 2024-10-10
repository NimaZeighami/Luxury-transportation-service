import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../Pages/Error/Error";
import Layout from "../Components/Layout/Layout";
import Manager from "../Pages/Manager/Manager";
import Driver from "../Pages/Driver/Driver";
import Passenger from "../Pages/Passenger/Passenger";
import Login from "../Pages/Login/Login";
import TripsHistory from "../Pages/Manager/TripsHistory";
import Home from "../Pages/Home/Home";
import ServiceRequest from "../Pages/Service Request/ServiceRequest";
import SuccessfulRequest from "../Pages/Successful Request/SuccessfulRequest";

const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "manager",
        element: <Manager />,
      },
      {
        path: "manager/trips-history",
        element: <TripsHistory />,
      },
      {
        path: "driver",
        element: <Driver />,
      },
      {
        path: "passenger",
        element: <Passenger />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "dashboard/passenger/service-request",
    element: <ServiceRequest />,
  },
  {
    path: "dashboard/passenger/successful-request",
    element: <SuccessfulRequest />,
  },
]);

export default router;
