import React from "react";
import DashboardPM from "../components/Dashboard/DashboardPM";
import Navbar from "../components/Navbar";
import Title from "../components/Title";

function ProjectManager() {
    const title: string = 'Project Manager View';

    interface StagingData {
        sales_order: number; 
        engineer: string;
        staging_status: string;
        hardware_received: string;
        date_drawn: string;
        date_returned: string;
        no_carton: number;
        last_status_update: string;
    }
    
    const today: Date = new Date();
    const date: string = today.toDateString();
    const last_update: string = `${today.toDateString()} ${today.toLocaleTimeString()}`;

    const stagingData: StagingData[] = [
        {'sales_order': 827697, 'engineer': 'Rui, Goh, Tay, Chen', 'staging_status': '', 'hardware_received': 'Not Yet', 'date_drawn': '', 'date_returned': '', 'no_carton': 2, 'last_status_update': last_update}, 
        {'sales_order': 254642, 'engineer': 'Lim, Lee, Zhao Chee, Tay, Tan', 'staging_status': '', 'hardware_received': 'OMNI', 'date_drawn': '', 'date_returned': '', 'no_carton': 2, 'last_status_update': last_update}, 
        {'sales_order': 365634, 'engineer': 'Lim, Yang', 'staging_status': 'Ready To Be Staged', 'hardware_received': 'KC', 'date_drawn': '', 'date_returned': '', 'no_carton': 2, 'last_status_update': last_update}, 
        {'sales_order': 523753, 'engineer': 'Lim, Yang', 'staging_status': 'Staging In Progress', 'hardware_received': 'KC', 'date_drawn': '', 'date_returned': date, 'no_carton': 2, 'last_status_update': last_update}, 
        {'sales_order': 923473, 'engineer': 'Lim, Yang', 'staging_status': 'Staging Completed', 'hardware_received': 'KC', 'date_drawn': date, 'date_returned': date, 'no_carton': 2, 'last_status_update': last_update}, 
        {'sales_order': 709235, 'engineer': 'Lim, Yang', 'staging_status': 'Staging Completed', 'hardware_received': 'Client', 'date_drawn': date, 'date_returned': date, 'no_carton': 2, 'last_status_update': last_update},         
    ]

    return (
        <>
            <Navbar />
            <Title title={title} />
            <DashboardPM stagingData={stagingData}/>
        </>
    );
}

export default ProjectManager;