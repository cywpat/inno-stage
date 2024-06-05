import React from "react";

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

const Charts = ({ stagingData }: { stagingData: StagingData[] }) => {
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

    stagingData.map((data) => {
        if (data.hardware_received == 'Not Yet') {
            countNotYet++
        } else if (data.hardware_received == 'OMNI') {
            countOMNI++
        } else if (data.hardware_received == 'KC') {
            countKC++
        } else if (data.hardware_received == 'Client') {
            countClient++
        }

        data.hardware_received ? totalHwReceived++ : ''
    })

    stagingData.map((data) => {
        if (data.staging_status == 'Ready To Be Staged') {
            countReadyToBeStaged++
        } else if (data.staging_status == 'Staging In Progress') {
            countStagingInProgress++
        } else if (data.staging_status == 'Staging Completed') {
            countStagingCompleted++
        } 

        data.hardware_received ? totalStagingStatus++ : ''
    })
    
    return (
        <>
            <p>countNotYet {countNotYet}</p>
            <p>countOMNI {countOMNI}</p>
            <p>countKC {countKC}</p>
            <p>countClient {countClient}</p>
            <p>totalHwReceived {totalHwReceived}</p>

            <p>countReadyToBeStaged {countReadyToBeStaged}</p>
            <p>countStagingInProgress {countStagingInProgress}</p>
            <p>countStagingCompleted {countStagingCompleted}</p>
            <p>totalStagingStatus {totalStagingStatus}</p>
        </>
    )
}

export default Charts