import React from "react";

const Title = ({ title }: { title: string}) => {
    return (
        <>        
            <div className='p-8'>
                <h2 className='text-4xl font-bold'>{title}</h2>
            </div>
        </>
    )
}

export default Title;