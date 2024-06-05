import React from "react";

interface SOData {
    sales_order: number; 
    project_name: string;
    client_name: string;
    project_manager: string;
    engineer: string;
    date_creation: string;
    client_PO_number: number;
    date_closed: string;
    service_unit: string;
    business_unit: string;
    tsr_number: string;
    project_id: string;
    industry_key: string; 
    delivery_order_criteria: string;
    delivery_status: string; 
    delivery_fc_month: string;
    delivery_ac_month: string;
    logistic_pic: string;
    sum_revenue: number;
    sum_gp: number; 
    staging_status: string;
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
                                    { soData.engineer 
                                    ? soData.engineer.split(',').map((eng) => (
                                        <div className='pb-1'>
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
                    </tbody>                    
                </table>
                {/* <h3 className='font-bold text-lg'>SO # {soData.sales_order}</h3>
                <h4>Client Name {soData.client_name}</h4>
                <h4>Project Manager {soData.project_manager ? soData.project_manager : 'No Project Manager'}</h4>
                <div className='flex'>
                    { soData.engineer 
                    ? soData.engineer.split(',').map((eng) => (
                        <div className='pb-1'>
                            <span className='pr-1'>
                                <span className='p-1.5 text-xs font-medium tracking-wider rounded-md bg-gray-300'>{eng}</span>
                            </span>
                        </div>
                        ))
                    : <div>No Engineers Assigned</div>
                    }
                </div> */}
            </section>
            
            <div>
                <h4>Business Unit {soData.business_unit}</h4>

            </div>
        </>
    )
}

export default SODetails