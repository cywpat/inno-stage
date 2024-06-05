import React, { useEffect, useState } from "react";
import DashboardEngineer from "../components/Dashboard/DashboardEngineer";
import axios from "axios";
import Title from "../components/Title";

function Engineer() {
    const title: string = 'Engineer Staging Status'

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

    const [stagingData, setStagingData] = useState<StagingData[]>([]);
    /* staging data will look something like this, it is a list of dictionaries
        [
            { "sales_order": "809056", "staging_status": "Not Yet", "date_drawn": null, "date_returned": null, "no_carton": null, "last_status_update": null },
            { "sales_order": "801686", "staging_status": "Not Yet", "date_drawn": null, "date_returned": null, "no_carton": null, "last_status_update": null },
            { "sales_order": "819876", "staging_status": "Not Yet", "date_drawn": null, "date_returned": null, "no_carton": null, "last_status_update": null } ]
        ]
    */
    useEffect(() => {
        // fetch data
        axios.get("http://localhost:8000/manyapps/staging_table/").then(
            function (response) { 
                console.log(response.data["data"])                            
                setStagingData(response.data["data"])
            }
        ).catch(
            function (error) {
                console.log(error)
            }
        )
    }, []);

    const today: Date = new Date();
    const date: string = today.toDateString();
    const last_update: string = `${today.toDateString()} ${today.toTimeString()}`;

    return (
        <>
            <Title title={title} />
            <DashboardEngineer 
                stagingData={stagingData}
            />
        </>

    );
}

export default Engineer;