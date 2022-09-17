import React, { createContext, useState } from "react";

interface AuthContextProviderProps {
    children: React.ReactNode
}

export interface IAuth {
    user: string;
    pwd: string;
    roles: number[];
    accessToken: string;
    setAuth?: (React.Dispatch<React.SetStateAction<IAuth>>)
}

const AuthContext = createContext<IAuth>({} as IAuth);

export const AuthProvider = ({ children }: AuthContextProviderProps) => {
    const [auth, setAuth] = useState({} as IAuth);

    return (
        <AuthContext.Provider value={{ ...auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthContext;