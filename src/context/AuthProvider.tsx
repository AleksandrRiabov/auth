import React, { createContext, useState } from "react";

interface AuthContextProviderProps {
    children: React.ReactNode
}

export interface IAuth {
    user: string;
    pwd: string;
    roles: string[];
    accessToken: string;
    setAuth?: (React.Dispatch<React.SetStateAction<IAuth>>)
}


const AuthContext = createContext<IAuth>({} as IAuth);

export const AuthProvider = ({ children }: AuthContextProviderProps) => {
    const [auth, setAuth] = useState({user: "none", pwd: '', accessToken: "", roles: [""]});

    return (
        <AuthContext.Provider value={{ ...auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthContext;