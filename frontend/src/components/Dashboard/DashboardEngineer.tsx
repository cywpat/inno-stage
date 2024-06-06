import React, { useState } from "react";
import UpdateDate from "./UpdateDate";
import RowEngineer from "./RowEngineer";

interface StagingData {
    sales_order: number; 
    engineer: string;
    staging_status: string;
    hardware_received: string;
    date_drawn: string;
    date_returned: string;
    no_carton: number;
    last_status_update: string;
    [key: string]: any; // Index signature
}

const Dashboard = ({ stagingData }: { stagingData: StagingData[] }) => {
    const [sortBy, setSortBy] = useState<keyof StagingData | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');

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

    return (
        <>
            <div className='px-8'>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    />
                </div>
                <table className='w-full table-auto'>
                    <thead className='border-b-2 border-black'>
                        <tr>
                            <th className='p-3 text-sm font-semibold tracking-wide text-left cursor-pointer' onClick={() => handleSort('sales_order')}>SO #</th>
                            <th className='p-3 text-sm font-semibold tracking-wide text-left cursor-pointer' onClick={() => handleSort('staging_status')}>Staging Status</th>
                            <th className='p-3 text-sm font-semibold tracking-wide text-left cursor-pointer' onClick={() => handleSort('date_drawn')}>Date Drawn</th>
                            <th className='p-3 text-sm font-semibold tracking-wide text-left cursor-pointer' onClick={() => handleSort('date_returned')}>Date Returned</th>
                            <th className='p-3 text-sm font-semibold tracking-wide text-left cursor-pointer' onClick={() => handleSort('date_returned')}>No. of days for staging</th>
                            <th className='p-3 text-sm font-semibold tracking-wide text-left cursor-pointer' onClick={() => handleSort('no_carton')}>No. of Cartons</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((data) => (
                            data.hardware_received === 'KC' ? <RowEngineer stagingData={data} key={data.sales_order} /> : null
                        ))}
                    </tbody>
                </table>
                {filteredData.map((data) => (
                    <React.Fragment key={data.sales_order}>
                        <UpdateDate 
                            update='drawn'
                            stagingData={data}
                        />
                        <UpdateDate
                            update='returned'
                            stagingData={data}
                        />
                    </React.Fragment>
                ))}
            </div>
        </>
    );
}

export default Dashboard;
