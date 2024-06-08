import React, { useEffect, useState } from "react";
import axios from 'axios';
import RowPM from "./RowPM";
import AssignEngineer from "./UpdateAssignEngineer";
import HwReceived from "./UpdateHwReceived";
import SODetails from "../SODetails";

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
    client_industry_sector: string;
    tsr_number: string;
    project_id: string;
    delivery_order_criteria: string;
    hardware_received: string; 
    logistic_pic: string;
    delivery_status: string;
    delivery_ac_month: string;
    delivery_fc_month: string;
    revenue: number;
    gp: number; 
}

const Dashboard = ({ stagingData }: { stagingData: StagingData[] }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [sortBy, setSortBy] = useState<keyof StagingData | null>(null);
    const [soData, setSoData] = useState<SOData[]>([]);


    const handleSort = (column: keyof StagingData) => {
        if (sortBy === column) {
            setSortBy(null);
        } else {
            setSortBy(column);
        }
    };

    const sortedData = sortBy ? [...stagingData].sort((a, b) => {
        if (a[sortBy] < b[sortBy]) return -1;
        if (a[sortBy] > b[sortBy]) return 1;
        return 0;
    }) : stagingData;

    const filteredData = sortedData.filter(data =>
        Object.values(data).some(value =>
            typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const [searchEngineerResults, setSearchEngineerResults] = useState<{ name: string }[]>([]);

    useEffect(() => {
        // fetch data
        axios.get("http://localhost:8000/manyapps/assignengineer_table/")
            .then(response => {                             
                setSearchEngineerResults(response.data["data"]);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);

    const handleSearchEngineerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            const data = {
                sales_order: "833151" 
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

    return (
        <div className='px-8'>
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchEngineerChange}
                className="mb-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
            <table className='w-full table-auto'>
                <thead className='border-b-2 border-black'>
                    <tr>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left cursor-pointer' onClick={() => handleSort('sales_order')}>SO #</th>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left cursor-pointer' onClick={() => handleSort('hardware_received')}>Location of Hardware</th>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left cursor-pointer' onClick={() => handleSort('staging_status')}>Staging Status</th>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left cursor-pointer' onClick={() => handleSort('engineer')}>Assigned Engineer</th>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left cursor-pointer' onClick={() => handleSort('last_status_update')}>Last Status Update</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((data) => (
                        <RowPM stagingData={data} key={data.sales_order} />
                    ))}
                </tbody>
            </table>

            {soData.map((data) => (
                <SODetails soData={data} />
            ))}
            
            {filteredData.map((data) => (
                <React.Fragment key={data.sales_order}>
                    <AssignEngineer stagingData={data} searchEngineerResults={searchEngineerResults}/>
                </React.Fragment>
            ))}            
        </div>
    );
}

export default Dashboard;
