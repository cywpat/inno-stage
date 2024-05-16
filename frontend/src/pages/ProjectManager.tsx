import React from "react";
import DashboardPM from "../components/Dashboard/DashboardPM";

function ProjectManager() {
    return (
        <>
            <div className='p-8'>
                <h2 className='text-4xl font-bold'>Project Manager</h2>
            </div>
            <DashboardPM />
        </>
    );
}

export default ProjectManager;