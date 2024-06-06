import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardPM from "../components/Dashboard/DashboardPM";
import Title from "../components/Title";

function ProjectManager() {
    const title: string = 'Project Manager Overview';

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
    
    const [stagingData, setStagingData] = useState<StagingData[]>([]);
    useEffect(() => {
        const interval = setInterval(() => {
            axios.get("http://localhost:8000/manyapps/projectmanager_table/").then(
                function (response) {              
                    console.log(response.data["data"])               
                    setStagingData(response.data["data"])
                }
            ).catch(
                function (error) {
                    console.log(error)
                }
            )
        }, 2000); //set your time here. repeat every 5 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <Title title={title} />
            <DashboardPM stagingData={stagingData}/>
        </>
    );
}

export default ProjectManager;