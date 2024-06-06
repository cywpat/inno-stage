import React from "react";
import { MdOutlineEditCalendar } from "react-icons/md";
import dayjs from "dayjs"; // Import dayjs for date manipulation

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
    let drawnInputId: string = `date_drawn_${stagingData.sales_order}`;
    let returnedInputId: string = `date_returned_${stagingData.sales_order}`;

    // Calculate the number of days since date drawn
    const daysSinceDrawn = stagingData.date_drawn
        ? dayjs().diff(dayjs(stagingData.date_drawn), 'day')
        : null;

    // Calculate the number of days between date drawn and date returned if both are available
    const daysDrawnToReturned = stagingData.date_drawn && stagingData.date_returned
        ? dayjs(stagingData.date_returned).diff(dayjs(stagingData.date_drawn), 'day')
        : null;

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
                <td className='p-3 text-sm'>
                    {/* Display the number of days between date drawn and date returned if available */}
                    {daysDrawnToReturned && (
                        <span>{daysDrawnToReturned} days</span>
                    )}
                    {/* Display the number of days since date drawn if date returned is not available */}
                    {!stagingData.date_returned && daysSinceDrawn && (
                        <span>{daysSinceDrawn} days</span>
                    )}
                </td>
                <td className='p-3 text-sm'>{stagingData.no_carton}</td>
            </tr>
        </>
    );
}

export default RowEngineer;
