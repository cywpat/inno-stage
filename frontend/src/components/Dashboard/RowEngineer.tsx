import React from "react";
import { MdOutlineEditCalendar, MdEditNote } from "react-icons/md";

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

const RowEngineer = ({ stagingData }: { stagingData: StagingData }) => {
    let drawnInputId: string = `date_drawn_${stagingData.sales_order}`
    let returnedInputId: string = `date_returned_${stagingData.sales_order}`

    return (
        <>                
            <tr className='hover:bg-blue-100 border-b-2 border-slate-100'>
                <td className='p-3 text-sm'>
                    <span className='cursor-pointer'>{stagingData.sales_order}</span>
                </td>
                <td className='p-3 text-sm'>
                    <div className='pb-1'>
                        { stagingData.date_returned 
                        ? <span className='p-1.5 text-xs font-medium tracking-wider rounded-md bg-green-300'>Staging Completed</span>
                        : stagingData.date_drawn 
                        ? <span className='p-1.5 text-xs font-medium tracking-wider rounded-md bg-yellow-300'>Staging In Progress</span>
                        : <span className='p-1.5 text-xs font-medium tracking-wider rounded-md bg-red-300'>Ready To Be Staged</span>
                        }
                    </div>
                </td>
                <td className='p-3 text-sm'>
                    <div className="flex gap-3">
                        <div>
                            {stagingData.date_drawn ? stagingData.date_drawn : 'Not Yet Drawn'}
                        </div>
                        <div className="pt-1">
                            <span>
                                <label htmlFor={drawnInputId} className='cursor-pointer'><MdOutlineEditCalendar /></label>
                            </span>
                        </div>
                    </div>
                </td>                        
                <td className='p-3 text-sm'>
                    <div className="flex gap-3">
                        <div>
                            {stagingData.date_returned ? stagingData.date_returned : 'Not Yet Returned'}
                        </div>
                        <div className="pt-1">
                            <span>
                                <label htmlFor={returnedInputId} className='cursor-pointer'><MdOutlineEditCalendar /></label>
                            </span>
                        </div>
                    </div>
                </td>
                <td className='p-3 text-sm'>{stagingData.no_carton}</td>
            </tr>
        </>
    );
}

export default RowEngineer;