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

const HwReceived = ({ stagingData }: { stagingData: StagingData }) => {
    let inputId: string =  `hw_received_${stagingData.sales_order}`

    return (
        <>
            <input type="checkbox" id={inputId} className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box flex flex-col">
                    <h3 className="font-bold text-lg m-2">Update Hardware Received Status</h3>
                    <h2 className="m-2">SO #{stagingData.sales_order}</h2>
                    <span className='m-2'>
                        <select className="select select-bordered w-3/5 max-w-xs">
                            <option disabled selected>Hardware Received Status</option>
                            <option>Not Yet</option>
                            <option>OMNI</option>
                            <option>KC</option>
                        </select>
                    </span>
                    <div className="modal-action">
                    <label htmlFor={inputId} className="btn">Submit</label>
                    <label htmlFor={inputId} className="btn">Cancel</label>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HwReceived