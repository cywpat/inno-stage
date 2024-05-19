import React from "react";
import { MdOutlineEditCalendar, MdEditNote } from "react-icons/md";

interface StagingData {
    sales_order: number; 
    engineer: string;
    staging_status: string;
    date_drawn: string;
    date_returned: string;
    no_carton: number;
    last_status_update: string;
}

const RowEngineer = ({ stagingData }: { stagingData: StagingData[] }) => {
    return (
        <>
            {stagingData.map((data) => (
                <tr className='hover:bg-blue-100'>
                    <td className='p-3 text-sm'>
                        <span className='cursor-pointer'>{data.sales_order}</span>
                    </td>
                    <td className='p-3 text-sm'>
                        <div className='pb-1'>
                            { data.date_returned 
                            ? <span className='p-1.5 text-xs font-medium tracking-wider rounded-md bg-green-300'>{data.staging_status}</span>
                            : data.date_drawn 
                            ? <span className='p-1.5 text-xs font-medium tracking-wider rounded-md bg-yellow-300'>{data.staging_status}</span>
                            : <span className='p-1.5 text-xs font-medium tracking-wider rounded-md bg-red-300'>{data.staging_status}</span>
                            }
{/* 
                            {
                                data.date_returned ? 'green' : data.date_drawn ? 'yellow' : 'red'
                            } */}

                            {/* <span className='p-1.5 text-xs font-medium tracking-wider rounded-md bg-red-300'>{data.staging_status}</span> */}
                        </div>
                    </td>
                    <td className='p-3 text-sm'>
                        <div className="flex gap-3">
                            <div>
                                {data.date_drawn ? data.date_drawn : 'Not Yet Drawn'}
                            </div>
                            <div className="pt-1">
                                <span>
                                    <label htmlFor="date_drawn" className='cursor-pointer'><MdOutlineEditCalendar /></label>
                                </span>
                            </div>
                        </div>
                    </td>                        
                    <td className='p-3 text-sm'>
                        <div className="flex gap-3">
                            <div>
                                {data.date_returned ? data.date_returned : 'Not Yet Returned'}
                            </div>
                            <div className="pt-1">
                                <span>
                                    <label htmlFor="date_returned" className='cursor-pointer'><MdOutlineEditCalendar /></label>
                                </span>
                            </div>
                        </div>
                    </td>
                    <td className='p-3 text-sm'>{data.no_carton}</td>
                </tr>
            ))}
        </>
    );
}

export default RowEngineer;