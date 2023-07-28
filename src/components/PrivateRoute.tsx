import React, { ReactElement } from "react";
import { Route, Navigate } from "react-router-dom";

interface PrivateRouteProps {
  component: React.ComponentType;
  isAuthenticated: boolean;
  path: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  isAuthenticated,
  path,
}) => {
  return isAuthenticated ? (
    <Route path={path} element={<Component />} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
