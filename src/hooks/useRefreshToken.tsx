import axios from "../api/axios";
import { IAuth } from "../context/AuthProvider";
import useAuth from "./useAuth";


const useRefreshToken = () => {
    const { setAuth, auth } = useAuth();

    const refresh = async () => {
        const response = await axios.get("/refresh", {
            withCredentials: true
        });
        setAuth((prev) => prev ? { ...prev, accessToken: response.data.accessToken } : { ...auth, accessToken: response.data.accessToken });
        return response.data.accessToken;
    }
    return refresh;
}

export default useRefreshToken;