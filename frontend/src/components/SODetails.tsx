import { Grid } from "@mui/material";
import React, { useState } from "react";
import { MdEditNote } from "react-icons/md";
import AssignEngineer from "./Dashboard/UpdateAssignEngineer";

interface SOData {
    sales_order: number; 
    project_name: string;
    client_name: string;
    project_manager: string;
    engineer: string;
    date_creation: string;
    client_po_number: number;
    date_closed: string;
    service_unit: string;
    business_unit: string;
    client_industry_sector: string;
    tsr_number: string;
    project_id: string;
    delivery_order_criteria: string;
    hardware_received: string; 
    logistic_pic: string;
    delivery_status: string;
    delivery_ac_month: string;
    delivery_fc_month: string;
    revenue: number;
    gp: number; 
}


const SODetails = ({ soData }: { soData: SOData }) => {
    let engInputId: string = `assign_eng_${soData.sales_order}`
    const inputId: string = `so_details_123`;


    const [searchEngineerResults, setSearchEngineerResults] = useState<{ name: string }[]>([]);

    return (
        <>
            <input type="checkbox" id={inputId} className="modal-toggle" />
                <div className="modal" role="dialog">
                    <div className="modal-box flex flex-col">
                        <section className='px-8 overflow-auto'>
                            <Grid container spacing={2}>
                                <Grid item xs={12} className='flex-col'>
                                    <div className='bg-gray-100 rounded-md mb-4'>
                                        <div className='px-4 py-2'>
                                            {/* <h3 className='font-bold text-lg'>sth</h3> */}
                                            <tr>
                                                <td className='pr-3 pb-1'>
                                                    <h3 className='font-bold text-lg'>SO #</h3>
                                                </td>
                                                <td className='pr-3 pb-1'>
                                                    <h3 className='font-bold text-lg'>{soData.sales_order}</h3>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className='pr-3 pb-1'>
                                                    <h3 className=''>Client Name</h3>
                                                </td>
                                                <td className='pr-3 pb-1'>
                                                    <h3 className=''>{soData.client_name}</h3>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className='pr-3 pb-1'>
                                                    <h3 className=''>Project Manager</h3>
                                                </td>
                                                <td className='pr-3 pb-1'>
                                                    <h3 className=''>{soData.project_manager ? soData.project_manager : 'No Project Manager'}</h3>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className='pr-3 pb-1'>
                                                    <h3 className=''>Engineer(s)</h3>
                                                </td>
                                                <td className='pr-3 pb-1'>
                                                    <div className='flex'>
                                                        {soData.engineer 
                                                        ? soData.engineer.split(',').map((eng, index) => (
                                                            <div key={index} className='pb-1'>
                                                                <span className='pr-1'>
                                                                    <span className='p-1.5 text-xs font-medium tracking-wider rounded-md bg-gray-300'>{eng}</span>
                                                                </span>
                                                            </div>
                                                            ))
                                                        : <label className='cursor-pointer' htmlFor={engInputId}>No Engineers Assigned</label>

                                                        }
                                                        
                                                        {/* <label className='cursor-pointer' htmlFor={engInputId}>No Engineers Assigned<MdEditNote /></label> */}
                                                    </div>
                                                </td>
                                            </tr>
                                        </div>
                                    </div>
                                    <div className='bg-gray-100 rounded-md mb-4'>
                                        <div className='px-4 py-2'>
                                            <h3 className='font-bold text-lg'>Client</h3>
                                            <tr>
                                                <td className='pr-3 pb-1'>
                                                    <h3 className=''>Business Unit</h3>
                                                </td>
                                                <td className='pr-3 pb-1'>
                                                    <h3 className=''>{soData.business_unit}</h3>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className='pr-3 pb-1'>
                                                    <h3 className=''>Client Industry Sector</h3>
                                                </td>
                                                <td className='pr-3 pb-1'>
                                                    <h3 className=''>{soData.client_industry_sector}</h3>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className='pr-3 pb-1'>
                                                    <h3 className=''>Client PO Number</h3>
                                                </td>
                                                <td className='pr-3 pb-1'>
                                                    <h3 className=''>{soData.client_po_number}</h3>
                                                </td>
                                            </tr>
                                        </div>
                                    </div>
                                    <div className='bg-gray-100 rounded-md mb-4'>
                                        <div className='px-4 py-2'>
                                            <h3 className='font-bold text-lg'>Details</h3>
                                            <tr>
                                                <td className='pr-3 pb-1'>
                                                    <h3 className=''>Project ID</h3>
                                                </td>
                                                <td className='pr-3 pb-1'>
                                                    <h3 className=''>{soData.project_id}</h3>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className='pr-3 pb-1'>
                                                    <h3 className=''>Date Of Creation</h3>
                                                </td>
                                                <td className='pr-3 pb-1'>
                                                    <h3 className=''>{soData.date_creation}</h3>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className='pr-3 pb-1'>
                                                    <h3 className=''>Date Closed</h3>
                                                </td>
                                                <td className='pr-3 pb-1'>
                                                    <h3 className=''>{soData.date_closed}</h3>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className='pr-3 pb-1'>
                                                    <h3 className=''>Service Unit</h3>
                                                </td>
                                                <td className='pr-3 pb-1'>
                                                    <h3 className=''>{soData.service_unit}</h3>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className='pr-3 pb-1'>
                                                    <h3 className=''>TSR Number</h3>
                                                </td>
                                                <td className='pr-3 pb-1'>
                                                    <h3 className=''>{soData.tsr_number}</h3>
                                                </td>
                                            </tr>
                                        </div>
                                    </div>
                                    <div className='bg-gray-100 rounded-md mb-4'>
                                        <div className='px-4 py-2'>
                                            <h3 className='font-bold text-lg'>Logistics</h3>
                                            <tr>
                                                <td className='pr-3 pb-1'>
                                                    <h3 className=''>Logistics Person-In-Charge</h3>
                                                </td>
                                                <td className='pr-3 pb-1'>
                                                    <h3 className=''>{soData.logistic_pic}</h3>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className='pr-3 pb-1'>
                                                    <h3 className=''>Delivery AC Month</h3>
                                                </td>
                                                <td className='pr-3 pb-1'>
                                                    <h3 className=''>{soData.delivery_ac_month}</h3>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className='pr-3 pb-1'>
                                                    <h3 className=''>Delivery FC Month</h3>
                                                </td>
                                                <td className='pr-3 pb-1'>
                                                    <h3 className=''>{soData.delivery_fc_month}</h3>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className='pr-3 pb-1'>
                                                    <h3 className=''>Delivery Order Criteria</h3>
                                                </td>
                                                <td className='pr-3 pb-1'>
                                                    <h3 className=''>{soData.delivery_order_criteria}</h3>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className='pr-3 pb-1'>
                                                    <h3 className=''>Delivery Status</h3>
                                                </td>
                                                <td className='pr-3 pb-1'>
                                                    <h3 className=''>{soData.delivery_status}</h3>
                                                </td>
                                            </tr>
                                        </div>
                                    </div>
                                    <div className='bg-gray-100 rounded-md mb-4'>
                                        <div className='px-4 py-2'>
                                            <h3 className='font-bold text-lg'>Finance</h3>
                                            <tr>
                                                <td className='pr-3 pb-1'>
                                                    <h3 className=''>Business Unit</h3>
                                                </td>
                                                <td className='pr-3 pb-1'>
                                                    <h3 className=''>{soData.business_unit}</h3>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className='pr-3 pb-1'>
                                                    <h3 className=''>Client Industry Sector</h3>
                                                </td>
                                                <td className='pr-3 pb-1'>
                                                    <h3 className=''>{soData.client_industry_sector}</h3>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className='pr-3 pb-1'>
                                                    <h3 className=''>Client PO Number</h3>
                                                </td>
                                                <td className='pr-3 pb-1'>
                                                    <h3 className=''>{soData.client_po_number}</h3>
                                                </td>
                                            </tr>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                        </section>
                    <div className="modal-action">
                        <label htmlFor={inputId} className="btn">Cancel</label>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SODetails;
