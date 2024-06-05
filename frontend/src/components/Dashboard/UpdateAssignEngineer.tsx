import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMinus, FaPlus } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

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

const AssignEngineer = ({ stagingData, searchEngineerResults }: { stagingData: StagingData, searchEngineerResults: {name: string}[] }) => {
    let inputId: string =  `assign_eng_${stagingData.sales_order}`

    return (
        <>
            <input type="checkbox" id={inputId} className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box flex flex-col">
                    <h3 className="font-bold text-lg m-2">Assign Engineer(s)</h3>
                    <h2 className="m-2">SO #{stagingData.sales_order}</h2>
                    <div className="m-2">
                        <p>Status</p>                        
                        { stagingData.hardware_received == 'KC' 
                        ? <span className='p-1.5 text-xs font-medium tracking-wider rounded-md bg-green-300'>Received At KC</span>
                        : stagingData.hardware_received == 'OMNI'
                        ? <span className='p-1.5 text-xs font-medium tracking-wider rounded-md bg-yellow-300'>Received At OMNI</span>
                        : <span className='p-1.5 text-xs font-medium tracking-wider rounded-md bg-red-300'>Not Yet Received</span>
                        }
                    </div>
                    <div className="m-2">
                        <p>Engineer(s)</p>
                        <div className="flex">
                            { stagingData.engineer 
                            ? stagingData.engineer.split(',').map((eng) => (
                                <div className='pb-1'>
                                    <div className='pr-1'>
                                        <div className='flex p-1.5 text-xs font-medium tracking-wider rounded-md bg-gray-300 cursor-pointer'>
                                            <span className="pr-1">{eng}</span>
                                            <span className="pt-0.5"><RxCross2 color="red"/></span>
                                        </div>
                                    </div>
                                </div>
                            ))
                            : <div>To Be Assigned</div>
                            }          
                        </div>
                    </div>
                    
                    <div className="relative m-2 rounded-md shadow-sm w-1/2 max-w-xs">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <span className="text-gray-500 sm:text-sm"><AiOutlineSearch /></span>
                        </div>
                        <input
                            type="text"
                            name="search"
                            id="search"
                            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            placeholder="Search"
                            // onChange={handleSearchEngineerChange}
                        />
                    </div>
                    
                    <div className='overflow-x-auto h-32'>
                        <ul className="m-2 flex flex-col">
                            {/* checkout MUI Chip */}
                            <FormGroup>
                            {searchEngineerResults.map((user) => (
                                <FormControlLabel 
                                    className='pl-2' 
                                    control={<Checkbox 
                                        icon={<FaPlus />} 
                                        checkedIcon={<FaMinus color="red"/>} 
                                        // onChange={}
                                    />} 
                                    label={user.name} />
                                // <li className="pl-2" key={user.name}>
                                //     <input type="checkbox" />
                                //     <label className='pl-2'>{user.name}</label>
                                // </li>
                            ))}
                            </FormGroup>
                        </ul>
                    </div>
                    <div className="modal-action">
                        <label htmlFor={inputId} className="btn">Submit</label>
                        <label htmlFor={inputId} className="btn">Cancel</label>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AssignEngineer;