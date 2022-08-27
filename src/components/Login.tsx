import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';

const Login = () => {

    const userRef = useRef<HTMLInputElement>(null);
    const errRef = useRef(null);

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
        setUser("");
        setPwd("");
    }

    return (
        success ? (<h1>Logged In</h1>) : (
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