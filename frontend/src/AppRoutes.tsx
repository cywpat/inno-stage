import React from "react";
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';
import { AuthProvider } from "./context/AuthContext";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Engineer from "./pages/Engineer";
import ProjectManager from "./pages/ProjectManager";
import Logistics from "./pages/Logistics";
import Details from "./pages/Details";
import Navbar from "./components/Navbar";

const AppRoutes: React.FC = () => {
    return (
        <AuthProvider>
            <Navbar/>
            <Routes>
                <Route path="/" element={<PrivateRoute element={<HomePage />} />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/Engineer" element={<PrivateRoute element={<Engineer />} />} />
                <Route path="/Projectmanager" element={<PrivateRoute element={<ProjectManager />} />} />
                <Route path="/Logistics" element={<PrivateRoute element={<Logistics />} />} />
                <Route path="/Details" element={<PrivateRoute element={<Details />} />} />
            </Routes>
        </AuthProvider>
    );
};

export default AppRoutes;
