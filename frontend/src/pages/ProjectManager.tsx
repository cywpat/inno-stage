import React from "react";
import DashboardPM from "../components/Dashboard/DashboardPM";
import Navbar from "../components/Navbar";
import Title from "../components/Title";

function ProjectManager() {
    const title: string = 'Project Manager View';

    return (
        <>
            <Navbar />
            <Title title={title} />
            {/* <div className='p-8'>
                <h2 className='text-4xl font-bold'>Project Manager View</h2>
            </div> */}
            <DashboardPM />
        </>
    );
}

export default ProjectManager;