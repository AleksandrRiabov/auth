import { useState, useEffect } from "react";
import axios from "../api/axios";
import useRefreshToken from "../hooks/useRefreshToken";
const USERS_URL = '/users'

interface IUser {
    name: string,
    id: string | number
}

const Users = () => {
    const [users, setUsers] = useState<IUser[]>();
    const refresh = useRefreshToken();

    useEffect(() => {
        let isMounted = true;
        const controler = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axios.get(USERS_URL,{
                    signal: controler.signal
                });
                console.log(response.data) 
                isMounted && setUsers(response.data);
            } catch (error) {
                console.log(error)
            }
        }
        getUsers()
        return () => {
            isMounted = false;
            controler.abort();
        }; 
    }, []);

    return (
        <article>
            <h2>Users List</h2>
            {
                users?.length
                    ? (
                        <ul>
                            {users.map((user, i) => <li key={i}>user.name</li>)}
                        </ul>
                    )
                    : (<div>
                        <p>No User To be displaed</p> <button onClick={() => refresh()}>Get RefreshToken</button>
                    </div>)
            }
        </article>
    )
}

export default Users;