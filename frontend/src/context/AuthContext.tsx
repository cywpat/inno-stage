// context/AuthContext.tsx
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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const navigate = useNavigate();
    
    let [user, setUser] = useState<User | null>(() => {
        const storedUser = localStorage.getItem("authTokens");
        if (storedUser) {
            try {
                return JSON.parse(storedUser);
            } catch (error) {
                console.error("Error parsing user data from localStorage:", error);
            }
        }
        return null;
    });

    let [authTokens, setAuthTokens] = useState<string | null>(() => {
        const storedTokens = localStorage.getItem("authTokens");
        if (storedTokens) {
            try {
                return JSON.parse(storedTokens);
            } catch (error) {
                console.error("Error parsing authTokens data from localStorage:", error);
            }
        }
        return null;
    });

    let [loading, setLoading] = useState(true);

    let loginUser = async (e: React.FormEvent) => {
        e.preventDefault();

        let response = await fetch("http://localhost:8000/api/token/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: (e.target as any).username.value,
                password: (e.target as any).password.value,
            }),
        });

        let data = await response.json();

        if (response.ok) {
            setAuthTokens(data.tokens);
            let decodedToken = jwtDecode(data.access) as User; // Assuming the decoded token contains the user information
            setUser(decodedToken);
            localStorage.setItem("authTokens", JSON.stringify(data.tokens));
            console.log(decodedToken.username);
            if (decodedToken.username === "david.hein@global.ntt") {
                navigate("Engineer/");
            } else if (decodedToken.username === "syed@global.ntt") {
                navigate("Logistics/");
            } else if (decodedToken.username === "sivaraj.kuppusamy@global.ntt") {
                navigate("Projectmanager/");
            } else if (decodedToken.username === "candy.lim@global.ntt") {
                navigate("Projectmanager/");
            } else {
                navigate("/");
            }
 
        } else {
            console.error("Failed to log in");
        }
    };

    let logoutUser = () => {
        setUser(null);
        setAuthTokens(null);
        localStorage.removeItem("authTokens");
        navigate("/login");
    }

    let updateToken = async () => {
        if (!authTokens) {
            // Handle the case where authTokens is null
            console.error("Auth tokens are null");
            return;
        }
        console.log("updating token")

        let response = await fetch("http://localhost:8000/api/token/refresh", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                refresh: authTokens
            }),
        });
        let data = await response.json();

        if (response.ok) {
            setAuthTokens(data.tokens);
            let decodedToken = jwtDecode(data.access) as User; // Assuming the decoded token contains the user information
            setUser(decodedToken);
            localStorage.setItem("authTokens", JSON.stringify(data.tokens));
        } else {
            logoutUser();
        }
    }

    useEffect(() => {
        let interval = setInterval(() => {
            if (authTokens) {
                updateToken();
            }
        }, 1000 * 60 * 4); // Refresh token every 4 minutes
        return () => clearInterval(interval);
    }, [authTokens, loading]);


    return (
        <AuthContext.Provider value={{ user, authTokens, loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
