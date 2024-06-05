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
import Finance from "./pages/Finance";
import Navbar from "./components/Navbar";

interface Link {
    label: string;
    // icon: JSX.Element;
    to: string;
    notification: number;
}

export const linksArray: Link[] = [
    {
        label: "Home Page",
        // icon: <FaHome />,
        to: "/",
        notification: 0,
    },
    {
        label: "Login",
        // icon: <FaHome />,
        to: "/login",
        notification: 0,
    },
    {
        label: "Engineer Staging View",
        // icon: <FaChartBar />,
        to: "/engineer",
        notification: 0,
    },
    {
        label: "Project Manager View",
        // icon: <FaFileUpload />,
        to: "/projectmanager",
        notification: 0,
    },
    {
        label: "Logistics View",
        // icon: <FaLink />,
        to: "/logistics",
        notification: 0,
    },
    {
        label: "Details",
        // icon: <FaCloudSun />,
        to: "/details",
        notification: 0,
    },
    {
        label: "Finance",
        // icon: <FaCloudSun />,
        to: "/finance",
        notification: 0,
    }
];

interface ComponentsMap {
    [key: string]: React.ComponentType;
}

const componentsMap: ComponentsMap = {
    '/': HomePage,
    '/login': LoginPage,
    '/engineer': Engineer,
    '/projectmanager': ProjectManager,
    '/logistics': Logistics,
    '/details': Details,
    '/finance': Finance,
};

const AppRoutes: React.FC = () => {
    return (
        <AuthProvider>
            <Navbar/>
            <Routes>
                <Route path="/" element={<PrivateRoute element={<HomePage />} />} />
                <Route path="/login" element={<LoginPage />} />
                {/* <Route path="/Engineer" element={<PrivateRoute element={<Engineer />} />} />
                <Route path="/Projectmanager" element={<PrivateRoute element={<ProjectManager />} />} />
                <Route path="/Logistics" element={<PrivateRoute element={<Logistics />} />} /> */}
                <Route path="/Details" element={<PrivateRoute element={<Details />} />} />
                {/* <Route path="/Finance" element={<PrivateRoute element={<Finance />} />} /> */}
                <Route path="/Engineer" element={<Engineer />} />   
                <Route path="/Projectmanager" element={<ProjectManager />} />
                <Route path="/Logistics" element={<Logistics />} />
                <Route path="/Finance"  element={<Finance />} />
            </Routes>
        </AuthProvider>
    );
};

export default AppRoutes;
