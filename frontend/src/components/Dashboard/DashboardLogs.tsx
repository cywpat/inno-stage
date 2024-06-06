import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
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
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [sortBy, setSortBy] = useState<keyof StagingData | null>(null);

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

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className='px-8'>
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="mb-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
            <table className='w-full table-auto'>
                <thead className='border-b-2 border-black'>
                    <tr>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left cursor-pointer' onClick={() => handleSort('sales_order')}>SO #</th>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left cursor-pointer' onClick={() => handleSort('hardware_received')}>Location Of Hardware</th>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left cursor-pointer' onClick={() => handleSort('staging_status')}>Staging Status</th>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left cursor-pointer' onClick={() => handleSort('last_status_update')}>Last Status Update</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((data) => (
                        <RowLogs stagingData={data} key={data.sales_order} />
                    ))}
                </tbody>
            </table>

            {filteredData.map((data) => (
                <React.Fragment key={data.sales_order}>
                    <HwReceived stagingData={data} />
                </React.Fragment>
            ))} 
        </div>
    );
}

export default Dashboard;
