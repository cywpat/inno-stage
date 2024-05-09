import React, { useState } from "react";
import Table from "../components/Table/Table";
import { TableColumn } from "react-data-table-component";
import Dashboard from "../components/Dashboard/DashboardEngineer";

function Engineer() {

    // interface DataRow {
    //     id: number;
    //     so: number;
    //     status: string;
    //     dateDrawn: Date;
    //     dateReturned: Date;
    //     noOfCartons: number;
    // };

    // const columns: TableColumn<DataRow>[] = [
    //     {
    //         name: 'SO#',
    //         selector: row => row.so,
    //         sortable: true,
    //     },
    //     {
    //         name: 'Status',
    //         selector: row => row.status,
    //     },
    //     {
    //         name: 'Date Drawn',
    //         selector: row => row.dateDrawn,
    //     },
    //     {
    //         name: 'Date Returned',
    //         selector: row => row.dateReturned,
    //     },
    //     {
    //         name: 'No. of Cartons',
    //         selector: row => row.noOfCartons,
    //     },
    // ];
    
    // const data: DataRow[] = [
    //     {
    //         id: 1,
    //         so: 123,
    //         status: 'Not Yet Started',
    //         dateDrawn: '',
    //         dateReturned: '',
    //         noOfCartons: 2
    //     },
    //     {
    //         id: 2,
    //         so: 234,
    //         status: 'In Progress',
    //         dateDrawn: '14/4/2024,
    //         dateReturned: '',
    //         noOfCartons: 2
    //     },
    //     {
    //         id: 3,
    //         so: 345,
    //         status: 'Completed',
    //         dateDrawn: '14/4/2024',
    //         dateReturned: '18/4/2024',
    //         noOfCartons: 5
    //     },
    // ]

    // const data: DataRow = [
    //     {
    //         id: 1, 
    //         so: 123, 
    //         status: 'Ready To Be Staged', 
    //         dateDrawn: 14-4-2024,
    //         dateReturned: 5-6-2024,
    //         noOfCartons: 3,
    //     },
    //     {
    //         id: 2, 
    //         so: 234, 
    //         status: 'Staging In Progress', 
    //         dateDrawn: '',
    //         dateReturned: 5-6-2024,
    //         noOfCartons: 3,
    //     },

    // ]

    
    return (
        <>
            <div className='p-8'>
                <h2 className='text-4xl font-bold'>Engineer Staging Status</h2>
            </div>
            {/* <Table columns={columns} data={data} /> */}
            <Dashboard />
        </>

    );
}

export default Engineer;