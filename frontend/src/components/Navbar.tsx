import React from "react";
import logo from '../images/GlobalLogo_NTTDATA_White_RGB.svg'

const Navbar = () => {
    return (
        <>
            <div className="navbar bg-black">
                <div className='flex-1'>
                    <a className="ml-3 mt-1"><img src={logo} alt='NTT DATA' width='150'/></a>
                    <a className='ml-6'><h2 className='text-xl font-bold text-white'>Inno-Stage</h2></a>
                </div>
                <div className='flex-none'>
                    {/* <a className='mr-6'><h2 className='text-xl font-bold text-white'>Inno-Stage</h2></a> */}
                    <div tabIndex={0} className="btn btn-ghost btn-circle avatar mr-6">
                        <div className="w-10 rounded-full">
                            <img alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Navbar;