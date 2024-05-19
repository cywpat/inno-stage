import React from "react";
import { Route, Routes } from 'react-router-dom';

// import { linksArray } from "./components/Sidebar/Sidebar";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Engineer from "./pages/Engineer";
import ProjectManager from "./pages/ProjectManager";
import Logistics from "./pages/Logistics";
import Details from "./pages/Details";

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
    }
];

interface ComponentsMap {
    [key: string]: React.ComponentType;
}

const componentsMap: ComponentsMap = {
    '/': HomePage,
    '/login': Login,
    '/engineer': Engineer,
    '/projectmanager': ProjectManager,
    '/logistics': Logistics,
    '/details': Details,
};

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            {linksArray.map(link => (
                <Route key={link.to} path={link.to} element={React.createElement(componentsMap[link.to])} />
            ))}
        </Routes>
    );
};

export default AppRoutes;
