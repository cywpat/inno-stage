import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import 'dayjs/locale/en-sg'
import axios from 'axios';
import RowLogs from "./RowLogs";
import HwReceived from "./UpdateHwReceived";

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

const Dashboard = ({ stagingData }: { stagingData: StagingData[] }) => {
    const today = new Date();

    const [data, setData] = useState<{ name: string }[]>([]);
    /* data will look something like this, it is a list of dictionaries
        [
        {'name': 'a'}, 
        {'name': 'b'}, 
        {'name': 'c'}
        ]
    */

    return (
        <div className='px-8'>
            <table className='w-full table-auto'>
                <thead className='border-b-2 border-black'>
                    <tr>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>SO #</th>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Location Of Hardware</th>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Staging Status</th>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Last Status Update</th>
                    </tr>
                </thead>
                <tbody>
                    {stagingData.map((data) => (
                        <RowLogs stagingData={data} />
                    ))}
                </tbody>
            </table>

            {stagingData.map((data) => (
                <>
                    <HwReceived stagingData={data} />
                </>
            ))} 
            
        </div>
    );
}

export default Dashboard;