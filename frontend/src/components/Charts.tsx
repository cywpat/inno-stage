import React from "react";
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";

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

const Charts = ({ stagingData }: { stagingData: StagingData[][] }) => {
    let countNotYet: number = 0
    let countOMNI: number = 0
    let countKC: number = 0
    let countClient: number = 0
    let totalHwReceived: number = 0

    let countReadyToBeStaged: number = 0
    let countStagingInProgress: number = 0
    let countStagingCompleted: number = 0
    let totalStagingStatus: number = 0

    // if (stagingData[0].hardware_received == 'Not Yet') {
    //     countNotYet++
    // }

    // stagingData[0].map((data) => {
    //     // console.log("data: " + data)
    //     data.map((subarray: any) => {
    //         console.log(subarray.count)
    //     })
    // })

    // console.log(stagingData[0])

    // stagingData.map((data) => {
    //     if (data.hardware_received == 'Not Yet') {
    //         countNotYet++
    //     } else if (data.hardware_received == 'OMNI') {
    //         countOMNI++
    //     } else if (data.hardware_received == 'KC') {
    //         countKC++
    //     } else if (data.hardware_received == 'Client') {
    //         countClient++
    //     }

    //     data.hardware_received ? totalHwReceived++ : ''
    // })

    // stagingData.map((data) => {
    //     if (data.staging_status == 'Ready To Be Staged') {
    //         countReadyToBeStaged++
    //     } else if (data.staging_status == 'Staging In Progress') {
    //         countStagingInProgress++
    //     } else if (data.staging_status == 'Staging Completed') {
    //         countStagingCompleted++
    //     } 

    //     data.hardware_received ? totalStagingStatus++ : ''
    // })

    const hwReceivedData: {id: number, value: number, label: string}[] = [
        { id: 0, value: 14, label: 'Not Yet Received' }, 
        { id: 1, value: 33, label: 'Received At OMNI' }, 
        { id: 2, value: 1, label: 'Received At KC' }, 
        { id: 3, value: 2, label: 'Delivered To Client' }, 
    ]

    const size = {
        width: 600, 
        height: 300,
    }
    
    return (
        <>
            {/* <p>countNotYet {countNotYet}</p>
            <p>countOMNI {countOMNI}</p>
            <p>countKC {countKC}</p>
            <p>countClient {countClient}</p>
            <p>totalHwReceived {totalHwReceived}</p>

            <p>countReadyToBeStaged {countReadyToBeStaged}</p>
            <p>countStagingInProgress {countStagingInProgress}</p>
            <p>countStagingCompleted {countStagingCompleted}</p>
            <p>totalStagingStatus {totalStagingStatus}</p> */}

            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <div>
                        <h4 className='font-bold text-center text-2xl m-2 bg-gray-100 rounded-md'>Status Of Hardware</h4>
                        <PieChart
                            series={[
                                {
                                    data: [
                                        { id: 0, value: 14, label: 'Not Yet Received', color: '#fca5a5' }, // red
                                        { id: 1, value: 3, label: 'Received At OMNI', color: '#fde047' }, // amber
                                        { id: 2, value: 29, label: 'Received At KC', color: '#d8b4fe' }, // purple
                                        { id: 3, value: 1, label: 'Delivered To Client', color: '#86efac' }, // green
                                    ],
                                    arcLabel: (item) => `${item.value}`,
                                    arcLabelMinAngle: 45,
                                    innerRadius: 60, 
                                    outerRadius: 120, 
                                    paddingAngle: 2, 
                                    cornerRadius: 5,
                                    cx: '50%',
                                    highlightScope: { fade: 'global', highlight: 'item' },
                                    faded: { innerRadius: 30, additionalRadius: -15, color: 'gray' },
                                },
                            ]}
                            sx={{
                                [`& .${pieArcLabelClasses.root}`]: {
                                  fill: 'black',
                                  fontWeight: 'bold',
                                },
                            }}
                            {...size}
                        />
                    </div>
                </Grid>                
                <Grid item xs={6}>
                    <div>
                        <h4 className='font-bold text-center text-2xl m-2 bg-gray-100 rounded-md'>Hardware At KC</h4>
                        <PieChart
                            // color={palette}
                            series={[
                                {
                                    data: [                            
                                        { id: 0, value: 21, label: 'Ready To Be Staged', color: '#fde047' }, // amber
                                        { id: 1, value: 7, label: 'Staging In Progress', color: '#d8b4fe' }, // purple
                                        { id: 2, value: 2, label: 'Staging Completed', color: '#86efac' }, // green
                                    ],
                                    arcLabel: (item) => `${item.value}`,
                                    arcLabelMinAngle: 45,
                                    innerRadius: 60, 
                                    outerRadius: 120, 
                                    paddingAngle: 2, 
                                    cornerRadius: 5,
                                    cx: '50%',
                                    highlightScope: { fade: 'global', highlight: 'item' },
                                    faded: { innerRadius: 30, additionalRadius: -15, color: 'gray' },
                                },
                            ]}
                            sx={{
                                [`& .${pieArcLabelClasses.root}`]: {
                                  fill: 'black',
                                  fontWeight: 'bold',
                                },
                            }}
                            {...size}
                        />
                    </div>
                </Grid>
            </Grid>
        </>
    )
}

export default Charts