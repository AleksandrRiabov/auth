import React, { useContext, useEffect, useRef, useState } from 'react';
import AuthContext from '../context/AuthProvider';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import { AxiosError } from 'axios';
const LOGIN_URL = "login";


type Response = {
    data: { accessToken: string, roles: string[] }
}

const Login = () => {
    const { setAuth, user: contextUser, accessToken, roles } = useContext(AuthContext);

    console.log(`========${contextUser}, ${accessToken}, ${JSON.stringify(roles)}`)
    const userRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLParagraphElement>(null);

    const [user, setUser] = useState("");
    const [pwd, setPwd] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (userRef.current !== null) {
            userRef.current.focus()
        }
    }, []);

    useEffect(() => {
        setErrMsg("");
    }, [user, pwd])


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response: Response = await axios.post(LOGIN_URL, JSON.stringify({ user, pwd }), {
                headers: { "Content-Type": "application/json" },
                withCredentials: false,
            });

            const accessToken = response?.data.accessToken;
            const roles = response?.data.roles;

            if (setAuth) {
                setAuth({ user, pwd, roles, accessToken });
            }

            setUser("");
            setPwd("");
            setSuccess(true)
        } catch (error: any) {
            if (!error.response) {
                setErrMsg("No response from server.")
            } else if (error.response?.status === 400) {
                setErrMsg('Missing Username or Password.');
            } else if (error.response.status === 401) {
                setErrMsg(error.response?.data?.message || "Incorrect username or password");
            } else {
                setErrMsg("Login Failed.. ")
            }
            if (errRef.current !== null) {
                errRef.current.focus()
            }
        }
    }

    return (
        success ? <section className='formWrapper'>
        <h1>Welcome back {contextUser}</h1>
        <Link to="/">Go to home page</Link>
    </section> : (
            <section className='formWrapper'>
                <p ref={errRef} className={errMsg ? "errormsg" : "ofscreen"} aria-live="assertive">{errMsg}</p>
                <form onSubmit={handleSubmit}>
                    <h1>Sign In</h1>
                    <div className='inputBox'>
                        <label htmlFor='user'>Enter user name:</label>
                        <input
                            id="user"
                            type="text"
                            ref={userRef}
                            value={user}
                            required
                            onChange={(e) => setUser(e.target.value)}
                        />
                    </div>
                    <div className='inputBox'>
                        <label htmlFor='password'>Enter password:</label>
                        <input
                            id="password"
                            type="password"
                            required
                            value={pwd}
                            onChange={(e) => setPwd(e.target.value)}
                        />
                    </div>
                    <button className='btn'>Sign In</button>
                    <div className='formLinks'>
                        <span>Need an account?</span>
                        <Link to="/register"> Sign Up</Link>
                    </div>
                </form>
            </section>
        )
    )
}

export default Login