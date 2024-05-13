import React from "react";
import { SWrapper } from './styles';
import { MdOutlineEditCalendar, MdEditNote } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";
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
                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Hardware Received</th>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Assigned Engineer</th>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Last Status Update</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className='hover:bg-blue-100'>
                        <td className='p-3 text-sm'>123</td>
                        <td className='p-3 text-sm flex flex-row'>
                            <span className='p-1.5 text-xs font-medium tracking-wider rounded-md bg-gray-300'>Received At OMNI</span>
                            <span className='p-2 cursor-pointer'><MdEditNote /></span>
                        </td>
                        <td className='p-3 text-sm'>
                            <span className='p-1.5 text-xs font-medium tracking-wider rounded-md bg-gray-300'>OMNI</span>
                            <span className='p-2 cursor-pointer'><MdEditNote /></span>
                        </td>
                        <td className='p-3 text-sm'>
                            <span className="mr-2">
                                <span className='p-1.5 text-xs font-medium tracking-wider rounded-md bg-gray-300'>Edison</span>
                            </span>
                            <span className="mr-2">
                                <span className='p-1.5 text-xs font-medium tracking-wider rounded-md bg-gray-300'>Tesla</span>
                            </span>
                            <span>
                                <label htmlFor="my_modal_6" className='cursor-pointer'><MdEditNote /></label>
                            </span>
                        </td>
                        <td className='p-3 text-sm'>12-Aug-2023 09:30 AM</td>
                    </tr>
                    <tr className='bg-slate-100 hover:bg-blue-100'>
                        <td className='p-3 text-sm'>234</td>
                        <td className='p-3 text-sm flex flex-row'>
                            <span className='p-1.5 text-xs font-medium tracking-wider rounded-md bg-gray-300'>Received At KC</span>
                            <span className='p-2 cursor-pointer'><MdEditNote /></span>
                        </td>
                        <td className='p-3 text-sm'>
                            <span className='p-1.5 text-xs font-medium tracking-wider rounded-md bg-gray-300'>KC</span>
                            <span className='p-2 cursor-pointer'><MdEditNote /></span>
                        </td>               
                        <td className='p-3 text-sm'>
                            <span className="mr-2">
                                <span className='p-1.5 text-xs font-medium tracking-wider rounded-md bg-gray-300'>Edison</span>
                            </span>
                            <span>
                                <label htmlFor="my_modal_6" className='cursor-pointer'><MdEditNote /></label>
                            </span>
                        </td>
                        <td className='p-3 text-sm'>12-Aug-2023 09:30 AM</td>
                    </tr>
                </tbody>
            </table>


            {/* The button to open modal */}
            {/* <label htmlFor="my_modal_6" className="btn">open modal</label> */}

            {/* Put this part before </body> tag */}
            <input type="checkbox" id="my_modal_6" className="modal-toggle" />
            <div className="modal" role="dialog">
            <div className="modal-box flex flex-col">
                <h3 className="font-bold text-lg m-2">Assign Engineer(s)</h3>
                <h2 className="m-2">SO #234</h2>
                <div className="m-2">
                    <p>Status</p>
                    <span className='p-1.5 text-xs font-medium tracking-wider rounded-md bg-red-300'>Ready To Be Staged</span>
                </div>
                <div className="m-2">
                    <p>Engineer(s)</p>
                    <span className="mr-2">
                        <span className='p-1.5 text-xs font-medium tracking-wider rounded-md bg-gray-200'>Edison</span>
                    </span>
                    <span className="mr-2">
                        <span className='p-1.5 text-xs font-medium tracking-wider rounded-md bg-gray-200'>Tesla</span>
                    </span>
                </div>
                <div className="relative m-2 rounded-md shadow-sm w-1/2 max-w-xs">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="text-gray-500 sm:text-sm"><AiOutlineSearch /></span>
                    </div>
                    <input
                        type="text"
                        name="price"
                        id="price"
                        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                        placeholder="Search"
                    />
                </div>
                <span className="m-2 flex flex-col">
                    <span className="pl-2">
                        <input type="checkbox" checked />
                        <label className='pl-2'>Edison</label>
                    </span>
                    <span className="pl-2">
                        <input type="checkbox" checked />
                        <label className='pl-2'>Tesla</label>
                    </span>
                    <span className="pl-2">
                        <input type="checkbox" />
                        <label className='pl-2'>Watt</label>
                    </span>
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