
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAppSelector } from "../types/type";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }:PrivateRouteProps) => {

   const user = useAppSelector(state => state.auth.user);
   // const fullState = useAppSelector(state => state);
   // console.log("Full Redux state:", JSON.stringify(fullState));

   // console.log("Redux user slice:", user);
   // console.log("Boolean(user):", !!user);
//    alert("PrivateRoute rendered");

   return user
      ? children
      : <Navigate to="/login" />
};

export default PrivateRoute;