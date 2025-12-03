import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import Coverage from "../pages/Coverage/Coverage";
import About from "../components/About/About";
import ErrorElement from "../pages/ErrorElement/ErrorElement";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import Rider from "../pages/Rider/Rider";
import SendParcel from "../pages/sendParcel/SendParcel";
import MyParcels from "../pages/Dashboard/MyParcels";
import DashboardLayout from "../layouts/DashboardLayout";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentSuccess from "../pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancelled from "../pages/Dashboard/Payment/PaymentCancelled";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import ApproveRiders from "../pages/Dashboard/ApproveRiders/ApproveRiders";
import UsersManagement from "../pages/Dashboard/UsersManagement/UsersManagement";
import AdminRoute from "./AdminRoute/AdminRoute";
import AssignRiders from "../pages/Dashboard/AssignRiders/AssignRiders";
import AssignedDeliveries from "../pages/Dashboard/AssignedDeliveries/AssignedDeliveries";
import RiderRoute from "./RiderRoute/RiderRoute";
import CompletedDeliveries from "../pages/Dashboard/CompletedDeliveries/CompletedDeliveries";
import ParcelTrack from "../pages/ParcelTrack/ParcelTrack";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import Loading from "../pages/Loading/Loading";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorElement></ErrorElement>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/coverage",
        Component: Coverage,
        loader: () => fetch("/serviceCenters.json").then((res) => res.json()),
        hydrateFallbackElement: <Loading></Loading>,
      },
      {
        path: "parcel-track/:trackingId",
        Component: ParcelTrack,
        // loader: () => fetch("/serviceCenters.json").then((res) => res.json()),
      },
      {
        path: "/send-parcel",
        loader: () => fetch("/serviceCenters.json").then((res) => res.json()),
        hydrateFallbackElement: <Loading></Loading>,
        element: (
          <PrivateRoute>
            <SendParcel></SendParcel>
          </PrivateRoute>
        ),
      },

      {
        path: "/about",
        Component: About,
        // loader: () => fetch('/serviceCenters.json').then(res => res.json())
      },
      {
        path: "/rider",
        element: (
          <PrivateRoute>
            <Rider></Rider>
          </PrivateRoute>
        ),
        loader: () => fetch("/serviceCenters.json").then((res) => res.json()),
        hydrateFallbackElement: <Loading></Loading>,
      },
    ],
  },

  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/login",
        Component: Login,
      },

      {
        path: "/register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: DashboardHome,
      },
      {
        path: "my-parcels",
        Component: MyParcels,
      },
      {
        path: "payment/:parcelId",
        Component: Payment,
      },
      {
        path: "payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "payment-cancelled",
        Component: PaymentCancelled,
      },
      {
        path: "assign-riders",
        element: (
          <AdminRoute>
            <AssignRiders></AssignRiders>
          </AdminRoute>
        ),
      },
      {
        path: "approve-riders",
        element: (
          <AdminRoute>
            <ApproveRiders></ApproveRiders>
          </AdminRoute>
        ),
      },
      {
        path: "users-management",
        element: (
          <AdminRoute>
            <UsersManagement></UsersManagement>
          </AdminRoute>
        ),
      },
      {
        path: "payment-history",
        Component: PaymentHistory,
      },
      // rider router
      {
        path: "assigned-deliveries",
        element: (
          <RiderRoute>
            <AssignedDeliveries></AssignedDeliveries>
          </RiderRoute>
        ),
      },
      {
        path: "completed-deliveries",
        element: (
          <RiderRoute>
            <CompletedDeliveries></CompletedDeliveries>
          </RiderRoute>
        ),
      },
    ],
  },
]);
