import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

const LoginPage = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("AuthContext must be used within an AuthProvider");
    }

    const { loginUser } = context;

    return (
        <div>
            <form onSubmit={loginUser}>
                <input type="text" name="username" placeholder="Enter Username" />
                <input type="password" name="password" placeholder="Enter Password" />
                <input type="submit" />
            </form>
        </div>
    );
}

export default LoginPage;
