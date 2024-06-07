import React from "react";

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
    tsr_number: string;
    project_id: string;
    delivery_order_criteria: string;
    hardware_received: string; 
    logistic_pic: string;
    revenue: number;
    gp: number; 
}

const SODetails = ({ soData }: { soData: SOData }) => {
    return (
        <>
            <section className='px-8 bg-slate-100'>
                <table className='bg-yellow-50'>
                    <thead>
                        <tr>
                            <td>

                            </td>
                        </tr>
                    </thead>
                    <tbody>
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
                                    : <div>No Engineers Assigned</div>
                                    }
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className='pr-3 pb-1'>
                                <h3 className=''>Project Name</h3>
                            </td>
                            <td className='pr-3 pb-1'>
                                <h3 className=''>{soData.project_name}</h3>
                            </td>
                        </tr>
                        <tr>
                            <td className='pr-3 pb-1'>
                                <h3 className=''>Date Creation</h3>
                            </td>
                            <td className='pr-3 pb-1'>
                                <h3 className=''>{soData.date_creation}</h3>
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
                                <h3 className=''>Business Unit</h3>
                            </td>
                            <td className='pr-3 pb-1'>
                                <h3 className=''>{soData.business_unit}</h3>
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
                                <h3 className=''>Delivery Order Criteria</h3>
                            </td>
                            <td className='pr-3 pb-1'>
                                <h3 className=''>{soData.delivery_order_criteria}</h3>
                            </td>
                        </tr>
                    
                        <tr>
                            <td className='pr-3 pb-1'>
                                <h3 className=''>Logistic PIC</h3>
                            </td>
                            <td className='pr-3 pb-1'>
                                <h3 className=''>{soData.logistic_pic}</h3>
                            </td>
                        </tr>
                        <tr>
                            <td className='pr-3 pb-1'>
                                <h3 className=''>Sum Revenue</h3>
                            </td>
                            <td className='pr-3 pb-1'>
                                <h3 className=''>{soData.revenue}</h3>
                            </td>
                        </tr>
                        <tr>
                            <td className='pr-3 pb-1'>
                                <h3 className=''>Sum GP</h3>
                            </td>
                            <td className='pr-3 pb-1'>
                                <h3 className=''>{soData.gp}</h3>
                            </td>
                        </tr>
            
                    </tbody>                    
                </table>
            </section>
        </>
    );
}

export default SODetails;
