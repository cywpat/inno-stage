// utils/PrivateRoute.tsx
import React from "react";
import { Navigate } from 'react-router-dom';
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

interface PrivateRouteProps {
    element: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error("AuthContext must be used within an AuthProvider");
    }

    const { user } = authContext;

    return user ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
