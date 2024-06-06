import React, { useState, useEffect } from "react";
import axios from "axios";
import Title from "../components/Title";
import Charts from "../components/Charts";

function Finance() {
    const title: string = 'Finance Overview'

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

    const [stagingData, setStagingData] = useState<StagingData[][]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            axios.get("http://localhost:8000/manyapps/finance_table/").then(
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

            <Charts 
                // hardwareData={stagingData[0]} 
                // stagingData={stagingData[1]}
                stagingData={stagingData}
            />
        </>

    );
}

export default Finance;