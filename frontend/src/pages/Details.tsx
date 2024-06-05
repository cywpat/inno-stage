import React from "react";
import Navbar from "../components/Navbar";
import Title from "../components/Title";
import SODetails from "../components/SODetails";

interface SOData {
    sales_order: number; 
    project_name: string;
    client_name: string;
    project_manager: string;
    engineer: string;
    date_creation: string;
    client_PO_number: number;
    date_closed: string;
    service_unit: string;
    business_unit: string;
    tsr_number: string;
    project_id: string;
    industry_key: string; 
    delivery_order_criteria: string;
    delivery_status: string; 
    delivery_fc_month: string;
    delivery_ac_month: string;
    logistic_pic: string;
    sum_revenue: number;
    sum_gp: number; 
    staging_status: string;
}



let today: Date = new Date();
let date_creation: string = today.toDateString();
let delivery_fc_month: string = today.toDateString();
let delivery_ac_month: string = today.toDateString();

const soData: SOData[] = [
    {'sales_order': 834080, 'project_name': 'DSTA_Budgeting', 'client_name': 'Ministry of Defence Defence Finance Organisation', 'project_manager': 'Sivaraj Kuppusamy', 'engineer': 'Neo Jia Ming, Cheah Yik Tung', 'date_creation': date_creation, 'client_PO_number': 3000469860, 'date_closed': '', 'service_unit': 'PS,MS', 'business_unit': 'Customer Interactive Solutions, Infrastructure/ Networking, Security', 'tsr_number': 'TSR-SG-FY24-11172', 'project_id': 'SGD/0824890', 'industry_key': 'Public Sector', 'delivery_order_criteria': 'Bundled Order', 'delivery_status': 'Fully received in warehouse', 'delivery_fc_month': delivery_fc_month, 'delivery_ac_month': delivery_ac_month, 'logistic_pic': 'Prakash', 'sum_revenue': 198650.8889, 'sum_gp': 51057.11, 'staging_status': 'Ready For Staging'},
]

function Details() {
    let title: string = 'Sales Order Details'
    return (
        <>
            <Navbar />
            <Title title={title}/>
            {soData.map((data) => (
                <SODetails soData={data}/>
            ))}
        </>   
    );
}

export default Details;