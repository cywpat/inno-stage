import React, {useState, useEffect} from "react";
import Title from "../components/Title";
import SODetails from "../components/SODetails";
import axios from "axios";

interface SOData {
    sales_order: number; 
    project_name: string;
    client_name: string;
    project_manager: string;
    engineer: string;
    date_creation: string;
    client_po_number: number;
    date_closed: string;
    service_unit: string;
    business_unit: string;
    tsr_number: string;
    project_id: string;
    delivery_order_criteria: string;
    hardware_received: string; 
    logistic_pic: string;
    revenue: number;
    gp: number; 
}



function Details() {
    // let today: Date = new Date();
    // let date_creation: string = today.toDateString();
    // let delivery_fc_month: string = today.toDateString();
    // let delivery_ac_month: string = today.toDateString();
    const [soData, setSoData] = useState<SOData[]>([]);
    /* staging data will look something like this, it is a list of dictionaries
        [
            { "sales_order": "809056", "staging_status": "Not Yet", "date_drawn": null, "date_returned": null, "no_carton": null, "last_status_update": null },
            { "sales_order": "801686", "staging_status": "Not Yet", "date_drawn": null, "date_returned": null, "no_carton": null, "last_status_update": null },
            { "sales_order": "819876", "staging_status": "Not Yet", "date_drawn": null, "date_returned": null, "no_carton": null, "last_status_update": null } ]
        ]
    */
    useEffect(() => {
        const interval = setInterval(() => {
            const data = {
                sales_order: "827704" 
            };
            axios.post("http://localhost:8000/manyapps/detailed_so/", { data }).then(response => {
                setSoData(response.data["data"])
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });

        }, 2000); //set your time here. repeat every 5 seconds
        return () => clearInterval(interval);
    }, []);

    let title: string = 'Sales Order Details'
    return (
        <>
            <Title title={title}/>
            {soData.map((data) => (
                <SODetails soData={data}/>
            ))}
        </>   
    );
}

export default Details;