import React from "react";

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

const RowPM = ({ stagingData }: { stagingData: StagingData }) => {
    // let engInputId: string = `assign_eng_${stagingData.sales_order}`
    // let hwInputId: string = `hw_received_${stagingData.sales_order}`

    return (
        <>
            <tr className='hover:bg-blue-100 border-b-2 border-slate-100'>
                <td className='p-3 text-sm'>
                    <span className='cursor-pointer'>{stagingData.sales_order}</span>
                </td>
                <td className='p-3 text-sm'>
                    <div className='flex gap-3'>
                        <div className='pb-1'>
                            { stagingData.hardware_received == 'Client'
                            ? <span className='p-1.5 text-xs font-medium tracking-wider rounded-md bg-green-500'>Delivered To Client</span>
                            : stagingData.hardware_received == 'KC' 
                            ? <span className='p-1.5 text-xs font-medium tracking-wider rounded-md bg-green-300'>Received At KC</span>
                            : stagingData.hardware_received == 'OMNI'
                            ? <span className='p-1.5 text-xs font-medium tracking-wider rounded-md bg-yellow-300'>Received At OMNI</span>
                            : <span className='p-1.5 text-xs font-medium tracking-wider rounded-md bg-red-300'>Not Yet Received</span>
                            }
                            {/* <span className='p-1.5 text-xs font-medium tracking-wider rounded-md bg-red-300'>Not Yet Received</span> */}
                        </div>
                        {/* <div className='pt-1'>
                            <label htmlFor={hwInputId} className="cursor-pointer"><MdEditNote /></label>
                        </div> */}
                    </div>
                </td>
                <td className='p-3 text-sm'>
                    <div className='flex gap-3'>
                        <div className='pb-1'>
                            { stagingData.hardware_received == 'Client' 
                            ? <span className='p-1.5 text-xs font-medium tracking-wider rounded-md bg-green-300'>{stagingData.staging_status}</span>
                            : stagingData.hardware_received == 'OMNI' || stagingData.hardware_received == 'Not Yet'
                            ? <span className='p-1.5 text-xs font-medium tracking-wider rounded-md bg-gray-300'>Not Received For Staging</span>
                            : stagingData.staging_status == 'Ready To Be Staged'
                            ? <span className='p-1.5 text-xs font-medium tracking-wider rounded-md bg-red-300'>{stagingData.staging_status}</span>
                            : stagingData.staging_status == 'Staging In Progress'
                            ? <span className='p-1.5 text-xs font-medium tracking-wider rounded-md bg-yellow-300'>{stagingData.staging_status}</span>
                            : <span className='p-1.5 text-xs font-medium tracking-wider rounded-md bg-green-300'>{stagingData.staging_status}</span>
                            }
                            {/* <span className='p-1.5 text-xs font-medium tracking-wider rounded-md bg-red-300'>Not Yet</span> */}
                        </div>
                    </div>
                </td>
                {/* <td className='p-3 text-sm'>
                    <div className='flex'>
                        { stagingData.engineer 
                        ? stagingData.engineer.split(',').map((eng) => (
                            <div className='pb-1'>
                                <span className='pr-1'>
                                    <span className='p-1.5 text-xs font-medium tracking-wider rounded-md bg-gray-300'>{eng}</span>
                                </span>
                            </div>
                          ))
                        : <div>To Be Assigned</div>
                        }                        
                        <div className='pt-1 pl-2'>
                            <label className='cursor-pointer' htmlFor={engInputId}><MdEditNote /></label>
                        </div>
                    </div>
                </td> */}
                <td className='p-3 text-sm'>{stagingData.last_status_update}</td>
            </tr>
        </>
    )
}

export default RowPM;