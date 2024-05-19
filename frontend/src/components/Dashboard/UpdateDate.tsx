import React from "react";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from "dayjs";
import 'dayjs/locale/en-sg'

interface StagingData {
    sales_order: number; 
    engineer: string;
    staging_status: string;
    date_drawn: string;
    date_returned: string;
    no_carton: number;
    last_status_update: string;
}

const AssignEngineer = ({ update, stagingData }: { update: string, stagingData: StagingData[] }) => {
    const today = new Date();
    let inputId: string = ''
    let hwStatus: string = ''
    let message: string = ''

    if (update=='drawn') {
        inputId = 'date_drawn'
        hwStatus = 'Update Date Drawn'
        message = 'I acknowledge that I am drawing the hardware'
    } else if (update=='returned') {        
        inputId = 'date_returned'
        hwStatus = 'Update Date Returned'
        message = 'I acknowledge that I am returning the hardware'
    }
        
    return (
        <>
            {stagingData.map((data) => (
                <>
                    <input type="checkbox" id={inputId} className="modal-toggle" />
                    <div className="modal" role="dialog">
                        <div className="modal-box flex flex-col">
                            <h3 className="font-bold text-lg m-2">{hwStatus}</h3>
                            <h2 className='m-2'>SO #{data.sales_order}</h2>
                            <span className='max-w-sm m-2'>
                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-sg">
                                    <DesktopDatePicker defaultValue={dayjs(today)} disableFuture />
                                </LocalizationProvider>
                            </span>
                            <span className="m-2">
                                <input type="checkbox" id="drawing" />
                                <label className='pl-2' htmlFor="drawing">{message}</label>
                            </span>
                            <div className="modal-action">
                            <label htmlFor={inputId} className="btn">Submit</label>
                            <label htmlFor={inputId} className="btn">Cancel</label>
                            </div>
                        </div>
                    </div>
                </>
            ))}
        </>
    );
}

export default AssignEngineer;