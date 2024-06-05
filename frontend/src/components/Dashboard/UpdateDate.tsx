import React, { useState } from "react";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from "dayjs";
import 'dayjs/locale/en-sg'
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

const UpdateDate = ({ update, stagingData }: { update: string, stagingData: StagingData }) => {
    const today = new Date();
    let inputId: string = ''
    let checkboxId: string = ''
    let hwStatus: string = ''
    let message: string = ''

    const [date, setDate] = useState(dayjs(today))

    const handleNewDateChange = (e: any) => {
        setDate((prev: any) => ({
            ...prev,
            'date': e.target.value
        }))
    }

    const postDate = async () => {
        try {
            await axios.post('', date)
        } catch (ex) {
            console.log(ex);
        }
    }

    if (update=='drawn') {
        inputId = `date_drawn_${stagingData.sales_order}`
        checkboxId = `drawing_${stagingData.sales_order}`
        hwStatus = 'Update Date Drawn'
        message = 'I acknowledge that I am drawing the hardware'
    } else if (update=='returned') {        
        inputId = `date_returned_${stagingData.sales_order}`
        checkboxId = `returning_${stagingData.sales_order}`
        hwStatus = 'Update Date Returned'
        message = 'I acknowledge that I am returning the hardware'
    }
        
    return (
        <>
            <input type="checkbox" id={inputId} className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box flex flex-col">
                    <h3 className="font-bold text-lg m-2">{hwStatus}</h3>
                    <h2 className='m-2'>SO #{stagingData.sales_order}</h2>
                    <span className='max-w-sm m-2'>
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-sg">
                            <DesktopDatePicker 
                                defaultValue={dayjs(today)} 
                                value={dayjs(today)}
                                // onChange={(date) => setDate(date)} 
                                disableFuture 
                            />
                        </LocalizationProvider>
                    </span>
                    <span className="m-2">
                        <input type="checkbox" id={checkboxId} required />
                        <label className='pl-2' htmlFor={checkboxId}>{message}</label>
                    </span>
                    <div className="modal-action">
                    <label htmlFor={inputId} className="btn">Submit</label>
                    <label htmlFor={inputId} className="btn">Cancel</label>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UpdateDate;