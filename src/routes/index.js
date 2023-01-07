import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";

// layouts
import DashboardLayout from "../components/layouts/dashboard";
import AuthLayout from "../components/layouts/auth";

// config
import { DEFAULT_PATH } from "../config";
import LoadingScreen from "../components/LoadingScreen";
import ProtectedRoute from "../components/ProtectedRoute";

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [
        { path: "login", element: <LoginPage /> },
        { path: "register", element: <RegisterPage /> },
        { path: "reset-password", element: <ResetPasswordPage /> },
      ],
    },
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      ),
      children: [
        { element: <Navigate to={DEFAULT_PATH} replace />, index: true },
        {
          path: "app",
          element: (
            <ProtectedRoute>
              <GeneralApp />
            </ProtectedRoute>
          ),
        },
        { path: "settings", element: <Settings /> },
      ],
    },

    { path: "404", element: <Page404 /> },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}

const GeneralApp = Loadable(
  lazy(() => import("../pages/dashboard/GeneralApp"))
);
const Page404 = Loadable(lazy(() => import("../pages/Page404")));
const RegisterPage = Loadable(lazy(() => import("../pages/auth/Register")));
const LoginPage = Loadable(lazy(() => import("../pages/auth/Login")));
const Settings = Loadable(lazy(() => import("../pages/dashboard/Settings")));
const ResetPasswordPage = Loadable(
  lazy(() => import("../pages/auth/ResetPassword"))
);
