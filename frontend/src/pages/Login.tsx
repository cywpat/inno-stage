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
                    <div className="text">Sign up</div>
                    <div className="underline"></div>
                </div>

                <div className="inputs">
                    {action === "Login" ? <div></div> : <div className="input">
                        <img src={user_icon} alt=" " />
                        <input type="text" placeholder="Name" />
                    </div>}

                    <div className="input">
                        <img src={email_icon} alt=" " />
                        <input type="email" placeholder="Email" />
                    </div>
                    <div className="input">
                        <img src={password_icon} alt=" " />
                        <input type="password" placeholder="Password" />
                    </div>
                </div>
                <div className="forget-password">Lost Password? <span>Click Here to Reset</span></div>
                <div className="submit-container">
                    <div className={action === "Login" ? "submit gray" : "submit"} onClick={() => setAction("Sign Up")}>Sign Up</div>
                    <div className={action === "Sign Up" ? "submit gray" : "submit"} onClick={() => setAction("Login")}>Login</div>
                </div>
        </div>
    )
}

export default Login;
