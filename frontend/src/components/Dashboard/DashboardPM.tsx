import React, { useEffect, useState } from "react";
import { SWrapper } from './styles';
import { MdOutlineEditCalendar, MdEditNote } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from "dayjs";
import 'dayjs/locale/en-sg'
import axios from 'axios';

const Dashboard = () => {
    const today = new Date();

     const [data, setData] = useState<{ name: string }[]>([]);
    /* data will look something like this, it is a list of dictionaries
        [
        {'name': 'a'}, 
        {'name': 'b'}, 
        {'name': 'c'}
        ]
    */
    useEffect(() => {
        // fetch data
        axios.get("http://localhost:8000/manyapps/engineer_table/").then(
            function (response) {                             
                setData(response.data["data"])
            }
        ).catch(
            function (error) {
                console.log(error)
            }
        )
    }, []);

    const [searchEngineerResults, setSearchEngineerResults] = useState<{ name: string }[]>([]);

    const handleSearchEngineerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = event.target.value.toLowerCase();

        const filteredNames = data.filter((user) =>
            user.name.toLowerCase().includes(searchTerm)
        );

        setSearchEngineerResults(filteredNames);
    };
    
    const handleAssignEngineerSubmit = () => {
         //  replace search results with something else
        // get the SO number
        const data = {
                "sales_order": 840275,  // hardcode
                "engineers": searchEngineerResults
            }
        axios.post("http://localhost:8000/manyapps/engineer_table/", { data })
          .catch(error => {
            console.error("Error fetching data:", error);
          });
      };

    return (
        <div className='px-8'>
            <table className='w-full table-auto'> {/*border-2 border-black*/}
                <thead className='border-b-2 border-black'> {/*border-b-2 border-black*/}
                    <tr>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>SO #</th>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Status</th>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Hardware Received</th>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Assigned Engineer</th>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Last Status Update</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className='hover:bg-blue-100 border-b-2 border-slate-100'>
                        <td className='p-3 text-sm'>
                            <span className='cursor-pointer'>123</span>
                        </td>
                        <td className='p-3 text-sm'>
                            <div className='flex gap-3'>
                                <div className='pb-1'>
                                    <span className='p-1.5 text-xs font-medium tracking-wider rounded-md bg-red-300'>Not Yet Received</span>
                                </div>
                            </div>
                        </td>
                        <td className='p-3 text-sm'>
                            <div className='flex gap-3'>
                                <div className='pb-1'>
                                    <span className='p-1.5 text-xs font-medium tracking-wider rounded-md bg-red-300'>Not Yet</span>
                                </div>
                                <div className='pt-1'>
                                    <label htmlFor="hw_received" className="cursor-pointer"><MdEditNote /></label>
                                </div>
                            </div>
                        </td>
                        <td className='p-3 text-sm'>
                            <div className='flex'>
                                <div className='pr-3'>
                                    To Be Assigned
                                </div>
                                {/* <div className='pb-1'>
                                    <span className='pr-1'>
                                        <span className='p-1.5 text-xs font-medium tracking-wider rounded-md bg-gray-300'>Edison</span>
                                    </span>
                                </div>
                                <div className='pb-1'>
                                    <span className='pr-3'>
                                        <span className='p-1.5 text-xs font-medium tracking-wider rounded-md bg-gray-300'>Tesla</span>
                                    </span>
                                </div> */}
                                <div className='pt-1'>
                                    <label className='cursor-pointer' htmlFor="assign_eng"><MdEditNote /></label>
                                </div>
                            </div>
                        </td>
                        <td className='p-3 text-sm'>12-Aug-2023 09:30 AM</td>
                    </tr>
                    <tr className='hover:bg-blue-100 border-b-2 border-slate-100'>
                        <td className='p-3 text-sm'>
                            <span className='cursor-pointer'>234</span>
                        </td>
                        <td className='p-3 text-sm'>
                            <div className='flex gap-3'>
                                <div className='pb-1'>
                                    <span className='p-1.5 text-xs font-medium tracking-wider rounded-md bg-yellow-300'>Received At OMNI</span>
                                </div>
                            </div>
                        </td>
                        <td className='p-3 text-sm'>
                            <div className='flex gap-3'>
                                <div className='pb-1'>
                                    <span className='p-1.5 text-xs font-medium tracking-wider rounded-md bg-yellow-300'>OMNI</span>
                                </div>
                                <div className='pt-1'>
                                    <label htmlFor="hw_received" className="cursor-pointer"><MdEditNote /></label>
                                </div>
                            </div>
                        </td>
                        <td className='p-3 text-sm'>
                            <div className='flex gap-3'>
                                <div className='pb-1'>
                                    <span className='p-1.5 text-xs font-medium tracking-wider rounded-md bg-gray-300'>Edison</span>
                                </div>
                                <div className='pt-1'>
                                    <label className='cursor-pointer' htmlFor="assign_eng"><MdEditNote /></label>
                                </div>
                            </div>
                        </td>
                        <td className='p-3 text-sm'>12-Aug-2023 09:30 AM</td>
                    </tr>
                    <tr className='hover:bg-blue-100'>
                        <td className='p-3 text-sm'>
                            <span className='cursor-pointer'>345</span>
                        </td>
                        <td className='p-3 text-sm'>
                            <div className='flex gap-3'>
                                <div className='pb-1'>
                                    <span className='p-1.5 text-xs font-medium tracking-wider rounded-md bg-green-300'>Received At KC</span>
                                </div>
                            </div>
                        </td>
                        <td className='p-3 text-sm'>
                            <div className='flex gap-3'>
                                <div className='pb-1'>
                                    <span className='p-1.5 text-xs font-medium tracking-wider rounded-md bg-green-300'>KC</span>
                                </div>
                                <div className='pt-1'>
                                    <label htmlFor="hw_received" className="cursor-pointer"><MdEditNote /></label>
                                </div>
                            </div>
                        </td>
                        <td className='p-3 text-sm'>
                            <div className='flex'>
                                <div className='pb-1'>
                                    <span className='pr-1'>
                                        <span className='p-1.5 text-xs font-medium tracking-wider rounded-md bg-gray-300'>Edison</span>
                                    </span>
                                </div>
                                <div className='pb-1'>
                                    <span className='pr-3'>
                                        <span className='p-1.5 text-xs font-medium tracking-wider rounded-md bg-gray-300'>Tesla</span>
                                    </span>
                                </div>
                                <div className='pt-1'>
                                    <label className='cursor-pointer' htmlFor="assign_eng"><MdEditNote /></label>
                                </div>
                            </div>
                        </td>
                        <td className='p-3 text-sm'>12-Aug-2023 09:30 AM</td>
                    </tr>
                </tbody>
            </table>

            {/* The button to open modal */}
            {/* <label htmlFor="my_modal_6" className="btn">open modal</label> */}

            {/* Put this part before </body> tag */}
            <input type="checkbox" id="hw_received" className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box flex flex-col">
                    <h3 className="font-bold text-lg m-2">Update Hardware Received Status</h3>
                    <span className='m-2'>
                        <select className="select select-bordered w-3/5 max-w-xs">
                            <option disabled selected>Hardware Received Status</option>
                            <option>Not Yet</option>
                            <option>OMNI</option>
                            <option>KC</option>
                        </select>
                    </span>
                    {/* <span className="m-2">
                        <input type="checkbox" />
                        <label className='pl-2'>I acknowledge that I am drawing the hardware for staging</label>
                    </span> */}
                    <div className="modal-action">
                    <label htmlFor="hw_received" className="btn">Submit</label>
                    <label htmlFor="hw_received" className="btn">Cancel</label>
                    </div>
                </div>
            </div>


            {/* The button to open modal */}
            {/* <label htmlFor="my_modal_6" className="btn">open modal</label> */}

            {/* Put this part before </body> tag */}
            <input type="checkbox" id="assign_eng" className="modal-toggle" />
            <div className="modal" role="dialog">
            <div className="modal-box flex flex-col">
                <h3 className="font-bold text-lg m-2">Assign Engineer(s)</h3>
                <h2 className="m-2">SO #234</h2>
                <div className="m-2">
                    <p>Status</p>
                    <span className='p-1.5 text-xs font-medium tracking-wider rounded-md bg-yellow-300'>Received At OMNI</span>
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
                        name="search"
                        id="search"
                        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                        placeholder="Search"
                        onChange={handleSearchEngineerChange}
                    />
                    {/* <ul>
                        {searchEngineerResults.map((user) => (
                        <li key={user.name}>{user.name}</li>
                        ))}
                    </ul> */}
                </div>
                
                <div className='overflow-x-auto h-32'>
                    <ul className="m-2 flex flex-col">
                        {searchEngineerResults.map((user) => (
                            <li className="pl-2" key={user.name}>
                                <input type="checkbox" />
                                <label className='pl-2'>{user.name}</label>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="modal-action">
                    <label htmlFor="assign_eng" className="btn" onClick={handleAssignEngineerSubmit}>Submit</label>
                    <label htmlFor="assign_eng" className="btn">Cancel</label>
                </div>
            </div>
            </div>

        </div>
    );
}

export default Dashboard;