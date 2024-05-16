import React from "react";
import { SWrapper } from './styles';
import { MdOutlineEditCalendar, MdEditNote } from "react-icons/md";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from "dayjs";
import 'dayjs/locale/en-sg'

const Dashboard = () => {
    const today = new Date();

    return (
        <div className='px-8'>
            <table className='w-full table-auto'> {/*border-2 border-black*/}
                <thead className='border-b-2 border-black'> {/*border-b-2 border-black*/}
                    <tr>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>SO#</th>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Status</th>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Date Drawn</th>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Date Returned</th>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>No. of Cartons</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className='hover:bg-blue-100'>
                        <td className='p-3 text-sm'>
                            <span className='cursor-pointer'>123</span>
                        </td>
                        <td className='p-3 text-sm'>
                            <div className='pb-1'>
                                <span className='p-1.5 text-xs font-medium tracking-wider rounded-md bg-red-300'>Ready To Be Staged</span>
                            </div>
                        </td>
                        <td className='p-3 text-sm'>
                            <div className="flex gap-3">
                                <div>
                                    14/5/2024
                                </div>
                                <div className="pt-1">
                                    <span>
                                        <label htmlFor="my_modal_6" className='cursor-pointer'><MdOutlineEditCalendar /></label>
                                    </span>
                                </div>
                            </div>
                        </td>                        
                        <td className='p-3 text-sm'>
                            <div className="flex gap-3">
                                <div>
                                    17/5/2024
                                </div>
                                <div className="pt-1">
                                    <span>
                                        <label htmlFor="my_modal_6" className='cursor-pointer'><MdOutlineEditCalendar /></label>
                                    </span>
                                </div>
                            </div>
                        </td>
                        <td className='p-3 text-sm'>2</td>
                    </tr>
                    <tr className='bg-slate-100 hover:bg-blue-100'>
                        <td className='p-3 text-sm'>
                            <span className='cursor-pointer'>234</span>
                        </td>
                        <td className='p-3 text-sm'>
                            <div className='pb-1'>
                                <span className='p-1.5 text-xs font-medium tracking-wider rounded-md bg-yellow-300'>Staging In Progress</span>
                            </div>
                        </td>
                        <td className='p-3 text-sm'>
                            <div className="flex gap-3">
                                <div>
                                    14/5/2024
                                </div>
                                <div className="pt-1">
                                    <span>
                                        <label htmlFor="my_modal_6" className='cursor-pointer'><MdOutlineEditCalendar /></label>
                                    </span>
                                </div>
                            </div>
                        </td>
                        <td className='p-3 text-sm'>
                            <div className="flex gap-3">
                                <div>
                                    14/5/2024
                                </div>
                                <div className="pt-1">
                                    <span>
                                        <label htmlFor="my_modal_6" className='cursor-pointer'><MdOutlineEditCalendar /></label>
                                    </span>
                                </div>
                            </div>
                        </td>
                        <td className='p-3 text-sm'>3</td>
                    </tr>
                </tbody>
            </table>


            {/* The button to open modal */}
            {/* <label htmlFor="my_modal_6" className="btn">open modal</label> */}

            {/* Put this part before </body> tag */}
            <input type="checkbox" id="my_modal_6" className="modal-toggle" />
            <div className="modal" role="dialog">
            <div className="modal-box flex flex-col">
                <h3 className="font-bold text-lg m-2">Update Date Drawn</h3>
                <span className='max-w-sm m-2'>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-sg">
                        <DesktopDatePicker defaultValue={dayjs(today)} />
                    </LocalizationProvider>
                </span>
                <span className="m-2">
                    <input type="checkbox" />
                    <label className='pl-2'>I acknowledge</label>
                </span>
                <div className="modal-action">
                <label htmlFor="my_modal_6" className="btn">Submit</label>
                <label htmlFor="my_modal_6" className="btn">Cancel</label>
                </div>
            </div>
            </div>

        </div>
    );
}

export default Dashboard;