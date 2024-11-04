import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../Pages/Error/Error";
import Layout from "../Components/Layout/Layout";
import Manager from "../Pages/Manager/ManagingTrips";
import Driver from "../Pages/DriverTrips/DriverTrips";
import PassengerTrips  from "../Pages/PassengerTrips/PassengerTrips";
import Login from "../Pages/Login/Login";
import TripsHistory from "../Pages/Manager/TripsHistory";
import Home from "../Pages/Home/Home";
import ServiceRequest from "../Pages/Service Request/ServiceRequest";
import SuccessfulRequest from "../Pages/Successful Request/SuccessfulRequest";
import ManagingUsers from "../Pages/Manager/ManagingUsers";

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
        path: "manager/managing-users",
        element: <ManagingUsers />,
      },
      {
        path: "driver",
        element: <Driver />,
      },
      {
        path: "passenger",
        element: <PassengerTrips />,
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
