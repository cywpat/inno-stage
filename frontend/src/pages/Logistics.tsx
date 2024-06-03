import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Title from "../components/Title";
import DashboardLogs from "../components/Dashboard/DashboardLogs";

function Logistics() {
    const title: string = 'Logistics View'

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

    const [data, setData] = useState<StagingData[]>([]);
    /* staging data will look something like this, it is a list of dictionaries
        [
        {'sales_order': '827697', 'engineer': 'Rui, Goh, Tay, Chen', 'staging_status': 'Not Yet', 'date_drawn': None, 'no_carton': None, 'last_status_update': None}, 
        {'sales_order': '817940', 'engineer': 'Lim, Lee, Zhao Chee, Tay, Tan', 'staging_status': 'Not Yet', 'date_drawn': None, 'no_carton': None, 'last_status_update': None}, 
        {'sales_order': '833151', 'engineer': 'Lim, Yang', 'staging_status': 'Not Yet', 'date_drawn': None, 'no_carton': None, 'last_status_update': None}
        ]
    */
    useEffect(() => {
        // fetch data
        axios.get("http://localhost:8000/manyapps/staging_table/").then(
            function (response) {                             
                setData(response.data["data"])
            }
        ).catch(
            function (error) {
                console.log(error)
            }
        )
    }, []);

    const today: Date = new Date();
    const date: string = today.toDateString();
    const last_update: string = `${today.toDateString()} ${today.toLocaleTimeString()}`;

    const stagingData: StagingData[] = [
        {'sales_order': 827697, 'engineer': 'Rui, Goh, Tay, Chen', 'staging_status': '', 'hardware_received': 'Not Yet', 'date_drawn': '', 'date_returned': '', 'no_carton': 2, 'last_status_update': last_update}, 
        {'sales_order': 254642, 'engineer': 'Lim, Lee, Zhao Chee, Tay, Tan', 'staging_status': '', 'hardware_received': 'OMNI', 'date_drawn': '', 'date_returned': '', 'no_carton': 2, 'last_status_update': last_update}, 
        {'sales_order': 365634, 'engineer': 'Lim, Yang', 'staging_status': 'Ready To Be Staged', 'hardware_received': 'KC', 'date_drawn': '', 'date_returned': '', 'no_carton': 2, 'last_status_update': last_update}, 
        {'sales_order': 523753, 'engineer': 'Lim, Yang', 'staging_status': 'Staging In Progress', 'hardware_received': 'KC', 'date_drawn': date, 'date_returned': '', 'no_carton': 2, 'last_status_update': last_update}, 
        {'sales_order': 923473, 'engineer': 'Lim, Yang', 'staging_status': 'Staging Completed', 'hardware_received': 'KC', 'date_drawn': date, 'date_returned': date, 'no_carton': 2, 'last_status_update': last_update}, 
        {'sales_order': 709235, 'engineer': 'Lim, Yang', 'staging_status': 'Staging Completed', 'hardware_received': 'Client', 'date_drawn': date, 'date_returned': date, 'no_carton': 2, 'last_status_update': last_update},         
    ]
    
    return (
        <>
            <Navbar />
            <Title title={title} />

            <DashboardLogs 
                stagingData={stagingData}
            />
        </>

    );
}

export default Logistics;