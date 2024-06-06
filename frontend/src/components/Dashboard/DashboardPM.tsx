import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import 'dayjs/locale/en-sg';
import axios from 'axios';
import RowPM from "./RowPM";
import AssignEngineer from "./UpdateAssignEngineer";
import HwReceived from "./UpdateHwReceived";

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

const Dashboard = ({ stagingData }: { stagingData: StagingData[] }) => {
    const [searchEngineerResults, setSearchEngineerResults] = useState<{ name: string }[]>([]);
    const today = new Date();

    useEffect(() => {
        // fetch data
        axios.get("http://localhost:8000/manyapps/assignengineer_table/").then(
            function (response) { 
                setSearchEngineerResults(response.data["data"]);
                /* data will look something like this, it is a list of dictionaries
                    [
                    {'name': 'a'}, 
                    {'name': 'b'}, 
                    {'name': 'c'}
                    ]
                */
            }
        ).catch(
            function (error) {
                console.log(error);
            }
        );
    }, []);

    const handleSearchEngineerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = event.target.value.toLowerCase();

        const filteredNames = searchEngineerResults.filter((user) =>
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
        axios.post("http://localhost:8000/manyapps/assignengineer_table/", { data })
          .catch(error => {
            console.error("Error fetching data:", error);
          });
      };

    return (
        <div className='px-8'>
            <table className='w-full table-auto'>
                <thead className='border-b-2 border-black'>
                    <tr>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>SO #</th>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Location of Hardware</th>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Staging Status</th>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Assigned Engineer</th>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Last Status Update</th>
                    </tr>
                </thead>
                <tbody>
                    {stagingData.map((data) => (
                            <RowPM stagingData={data} />
                    ))}
                </tbody>
            </table>
            
            {stagingData.map((data) => (
                    <AssignEngineer stagingData={data} searchEngineerResults={searchEngineerResults}/>
            ))}            
        </div>
    );
}

export default Dashboard;
