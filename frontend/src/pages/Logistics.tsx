import React, { useEffect, useState } from "react";
import axios from "axios";
import Title from "../components/Title";
import DashboardLogs from "../components/Dashboard/DashboardLogs";

function Logistics() {
    const title: string = 'Logistics Overview'

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
    const [stagingData, setStagingData] = useState<StagingData[]>([]);
    useEffect(() => {
        // fetch data
        axios.get("http://localhost:8000/manyapps/logistics_table/").then(
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
    const last_update: string = `${today.toDateString()} ${today.toLocaleTimeString()}`;
    
    return (
        <>
            <Title title={title} />

            <DashboardLogs 
                stagingData={stagingData}
            />
        </>

    );
}

export default Logistics;