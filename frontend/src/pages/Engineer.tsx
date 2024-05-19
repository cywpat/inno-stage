import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import { TableColumn } from "react-data-table-component";
import DashboardEngineer from "../components/Dashboard/DashboardEngineer";
import axios from "axios";
import Navbar from "../components/Navbar";
import Title from "../components/Title";
import { time } from "console";

function Engineer() {

    interface DataRow {
        // id: number;
        sales_order: number;
        engineer: string;
        staging_status: string;
        date_drawn: Date;
        no_carton: number;
        last_status_update: string;
    };

    interface StagingData {
        sales_order: number; 
        engineer: string;
        staging_status: string;
        date_drawn: string;
        date_returned: string;
        no_carton: number;
        last_status_update: string;
    }

    const [data, setData] = useState<DataRow[]>([]);
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
    const last_update: string = `${today.toDateString()} ${today.toTimeString()}`;

    const stagingData: StagingData[] = [
        {'sales_order': 827697, 'engineer': 'Rui, Goh, Tay, Chen', 'staging_status': 'Ready To Be Staged', 'date_drawn': '', 'date_returned': '', 'no_carton': 2, 'last_status_update': last_update}, 
        {'sales_order': 254642, 'engineer': 'Lim, Lee, Zhao Chee, Tay, Tan', 'staging_status': 'Staging In Progress', 'date_drawn': date, 'date_returned': '', 'no_carton': 2, 'last_status_update': last_update}, 
        {'sales_order': 365634, 'engineer': 'Lim, Yang', 'staging_status': 'Staging Completed', 'date_drawn': date, 'date_returned': date, 'no_carton': 2, 'last_status_update': last_update}, 
    ]


    // const columns: TableColumn<DataRow>[] = [
    //     {
    //         name: 'SO#',
    //         selector: row => row.sales_order,
    //         sortable: true,
    //     },
    //     {
    //         name: 'Status',
    //         selector: row => row.staging_status,
    //     },
    //     {
    //         name: 'Date Drawn',
    //         selector: row => row.date_drawn,
    //     },
    //     {
    //         name: 'Last Status Update',
    //         selector: row => row.last_status_update,
    //     },
    //     {
    //         name: 'No. of Cartons',
    //         selector: row => row.no_carton,
    //     },
    // ];

    const title: string = 'Engineer Staging Status'
    
    return (
        <>
            <Navbar />
            <Title title={title} />
            {/* <div className='p-8'>
                <h2 className='text-4xl font-bold'>Engineer Staging Status</h2>
            </div> */}

            {/* <Table columns={columns} data={data} /> */}
            <DashboardEngineer 
                // data={data}
                // setData={setData}
                stagingData={stagingData}
            />
        </>

    );
}

export default Engineer;