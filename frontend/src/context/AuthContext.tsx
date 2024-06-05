import React, { createContext, useState, ReactNode, useEffect } from "react";
import {jwtDecode} from "jwt-decode";
import { useNavigate } from "react-router-dom";

interface User {
    username: string;
    // Add other properties as needed
}

interface AuthContextType {
    user: User | null;
    authTokens: string | null;
    loginUser: (e: React.FormEvent) => Promise<void>;
    logoutUser: () => void;
    errorMessage: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [authTokens, setAuthTokens] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        const storedTokens = localStorage.getItem("authTokens");
        if (storedTokens) {
            try {
                const parsedTokens = JSON.parse(storedTokens);
                setAuthTokens(parsedTokens);
                const decodedToken = jwtDecode(parsedTokens.access) as User;
                setUser(decodedToken);
            } catch (error) {
                console.error("Error parsing tokens from localStorage", error);
            }
        }
    }, []);

    const loginUser = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await fetch("http://localhost:8000/api/token/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: (e.target as any).username.value,
                password: (e.target as any).password.value,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            setAuthTokens(data.tokens);
            const decodedToken = jwtDecode(data.access) as User; // Assuming the decoded token contains the user information
            setUser(decodedToken);
            localStorage.setItem("authTokens", JSON.stringify(data.tokens));
            setErrorMessage(null); // Clear error message on successful login

            if (decodedToken.username === "yiktung.cheah@global.ntt") {
                navigate("Engineer/");
            } else if (decodedToken.username === "patricia.choo@global.ntt") {
                navigate("Logistics/");
            } else if (decodedToken.username === "rajaraj.ramanathan@global.ntt") {
                navigate("Projectmanager/");
            } else if (decodedToken.username === "jiamin.toh@global.ntt") {
                navigate("Finance/");
            } else {
                navigate("/");
            }
        } else {
            setErrorMessage("Failed to log in. Please check your username and password.");
        }
    };

    const logoutUser = () => {
        setUser(null);
        setAuthTokens(null);
        localStorage.removeItem("authTokens");
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ user, authTokens, loginUser, logoutUser, errorMessage }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
