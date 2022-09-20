import React, { createContext, useState } from "react";

interface AuthContextProviderProps {
    children: React.ReactNode
}

export interface IAuth {
    auth: {
        user: string;
        pwd: string;
        roles: number[];
        accessToken: string;
    }
}
interface ISetAuth {
    setAuth: React.Dispatch<React.SetStateAction<{
        user: string;
        pwd: string;
        roles: number[];
        accessToken: string;
    }>>
}

const AuthContext = createContext<IAuth & ISetAuth>({} as IAuth & ISetAuth);

export const AuthProvider = ({ children }: AuthContextProviderProps) => {
    const [auth, setAuth] = useState({} as IAuth['auth']);


    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthContext;