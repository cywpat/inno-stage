import React from "react";
import UpdateDate from "./UpdateDate";
import RowEngineer from "./RowEngineer";

// interface DashboardProps {
//     data: [];
//     setData: DataRow[];
// }

// const [data, setData] = useState<{ DashboardProps }[]>([]);

// {data, setData}: DashboardProps

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

    return (
        <>
            <div className='px-8'>
            <table className='w-full table-auto'>
                <thead className='border-b-2 border-black'>
                    <tr>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>SO #</th>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Status</th>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Date Drawn</th>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Date Returned</th>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>No. of Cartons</th>
                    </tr>
                </thead>
                <tbody>
                    {stagingData.map((data) => (
                        data.hardware_received == 'KC' ? <RowEngineer stagingData={data} /> : ''
                    ))}
                </tbody>
            </table>

            {stagingData.map((data) => (
                <>
                    <UpdateDate 
                        update='drawn'
                        stagingData={data}
                    />

                    <UpdateDate
                        update='returned'
                        stagingData={data}
                    />
                </>
            ))}
            </div>
        </>
    );
}

export default Dashboard;