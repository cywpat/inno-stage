import React, { useState } from "react";
import '../styles/login.css';

import user_icon from '../images/person.png';
import email_icon from '../images/email.png';
import password_icon from '../images/password.png';

const Login = () => {
    const [action, setAction] = useState("Sign Up");
    
    return (
        <div className="login-page">
                <div className="header">
                    <div className="text">Inno-Stage</div>
                    <div className="underline"></div>
                </div>

                <div className="inputs">

                    <div className="input">
                        <img src={email_icon} alt=" " />
                        <input type="email" placeholder="Email" />
                    </div>
                    <div className="input">
                        <img src={password_icon} alt=" " />
                        <input type="password" placeholder="Password" />
                    </div>
                </div>

                <div className="submit-container">
                    <div className={action === "Login" ? "submit gray" : "submit"} onClick={() => setAction("Login")}>Login</div>
                </div>
        </div>
    )
}

export default Login;
