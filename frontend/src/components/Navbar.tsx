// components/Navbar.tsx
import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import logo from '../images/GlobalLogo_NTTDATA_White_RGB.svg'

const Navbar = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("AuthContext must be used within an AuthProvider");
    }

    const { user, logoutUser } = context;

    return (
        <>
            <div className="navbar bg-black">
                <div className='flex-1'>
                    <a className="ml-3 mt-1">
                        <img src={logo} alt='NTT DATA' width='150'/>
                    </a>
                    <a className='ml-6'>
                        <h2 className='text-xl font-bold text-white'>Inno-Stage</h2>
                    </a>
                </div>
                <div className='flex-none'>
                    <a className='mr-6'>
                        {user ? <a onClick={logoutUser} style={{ cursor: "pointer" }} className='text-white'>Logout</a> : <a href='/login' className='text-white'>Login</a>}
                        {user && typeof user === 'object' && 'username' in user && <h2 className='text-xl font-bold text-white'>Hello {user.username}</h2>}
                    </a>
                </div>
            </div>
        </>
    );
}

export default Navbar;
