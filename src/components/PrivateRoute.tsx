import React, { ReactElement } from "react";
import { Route, Navigate } from "react-router-dom";

interface PrivateRouteProps {
  component: React.ComponentType;
  isAuthenticated: boolean;
  path: string;
}

const PrivateRoute = ({
  component: Component,
  isAuthenticated,
  path,
}: PrivateRouteProps): JSX.Element => {
  return isAuthenticated ? <Component /> : <Navigate to={path} replace />;
};

export default PrivateRoute;
