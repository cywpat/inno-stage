import React, { useState } from "react";
import axios from "axios";

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
    const [hardware_received, setHardware_received] = useState<string>('');

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setHardware_received(e.target.value);
    };

    const postLocation = () => {
        const data = {
            sales_order: stagingData.sales_order, 
            hardware_received: hardware_received
        };

        try {
            axios.post("http://localhost:8000/manyapps/logistics_table/", { data })
            .catch(error => {
              console.error("Error fetching data:", error);
            });
         
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <input type="checkbox" id={inputId} className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box flex flex-col">
                    <h3 className="font-bold text-lg m-2">Update Hardware Received Status</h3>
                    <h2 className="m-2">SO #{stagingData.sales_order}</h2>
                    <span className='m-2'>
                        <select 
                            className="select select-bordered w-3/5 max-w-xs" 
                            value={hardware_received} 
                            onChange={handleSelectChange}
                        >
                            <option value="" disabled>Hardware Received Status</option>
                            <option value="Not Yet">Not Yet</option>
                            <option value="OMNI">OMNI</option>
                            <option value="KC">KC</option>
                            <option value="Client">Client</option>
                        </select>
                    </span>
                    <div className="modal-action">
                        <label htmlFor={inputId} className="btn" onClick={postLocation}>Submit</label>
                        <label htmlFor={inputId} className="btn">Cancel</label>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HwReceived;
