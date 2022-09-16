import { faCheckCircle, faInfoCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from '../api/axios';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/register";

const Register = () => {

    const userRef = useRef<HTMLInputElement>(null);
    const errRef = useRef(null);

    const [user, setUser] = useState("");
    const [validUserName, setValidUserName] = useState(false);
    const [userFocus, setUserFocus] = useState(true);

    const [pwd, setPwd] = useState("");
    const [validPwd, setValidPwd] = useState(false)
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState("");
    const [validMatchPwd, setValidMatchPwd] = useState(false)
    const [matchPwdFocus, setMatchPwdFocus] = useState(false);


    const [errMsg, setErrMsg] = useState("Something Whent Wrong");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (userRef.current !== null) {
            userRef.current.focus()
        }
    }, []);

    useEffect(() => {
        const result = USER_REGEX.test(user);
        setValidUserName(result)
    }, [user])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        setValidPwd(result)
        const match = pwd === matchPwd;
        setValidMatchPwd(match)
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg("")
    }, [user, pwd, matchPwd])

    const formValid = validUserName && validMatchPwd && validPwd;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //If form is hacked
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);

        if (!formValid || !v1 || !v2) {
            setErrMsg("Invalid Entry..");
            return;
        }

        try {
            const response = await axios.post(REGISTER_URL, JSON.stringify({ user, pwd }), {
                headers: { "Content-Type": "application/json" },
                withCredentials: false,
            })

            setSuccess(true);
            setUser("");
            setPwd("");
            setMatchPwd("");
        } catch (err) {
            if (typeof err === "string") {
                setErrMsg("")
            } else if (err instanceof Error) {
                setErrMsg(err?.message || "Error not specified")
            } else {
                setErrMsg("Registration failed.")
            }
        }
    }


    return (
        <>
            {success ? (<section className='formWrapper'>
                <h1>Success!</h1>
                <Link to="/login">Sign In</Link>
            </section>) :
                (<section className='formWrapper'>
                    <p ref={errRef} className={errMsg ? "errormsg" : "ofscreen"} aria-live="assertive">{errMsg}</p>
                    <form onSubmit={handleSubmit}>
                        <h1>Register</h1>
                        <div className='inputBox'>
                            <label htmlFor='user'>Create user name:
                                {(!userFocus && user && !validUserName) && <FontAwesomeIcon className="failureIcon" icon={faTimes} />}
                                {(user && validUserName) && <FontAwesomeIcon className='successIcon' icon={faCheckCircle} />}
                            </label>
                            <input
                                id="user"
                                type="text"
                                ref={userRef}
                                value={user}
                                required
                                onChange={(e) => setUser(e.target.value)}
                                aria-invalid={!validUserName}
                                aria-describedby={"uidnote"}
                                autoComplete="off"
                                onFocus={() => setUserFocus(true)}
                                onBlur={() => setUserFocus(false)}
                            />
                            <p className={(userFocus && user && !validUserName) ? "showInstractions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} /> 4 to 24 characters. <br />
                                Must begin with a letter. <br />
                                Letters, numbers, underscores, hyphens allowed.
                            </p>
                        </div>
                        <div className='inputBox'>
                            <label htmlFor='password'>Create password:
                                {(!pwdFocus && pwd && !validPwd) && <FontAwesomeIcon className="failureIcon" icon={faTimes} />}
                                {(pwd && validPwd) && <FontAwesomeIcon className='successIcon' icon={faCheckCircle} />}
                            </label>
                            <input
                                id="password"
                                type="password"
                                required
                                value={pwd}
                                onChange={(e) => setPwd(e.target.value)}
                                onFocus={() => setPwdFocus(true)}
                                onBlur={() => setPwdFocus(false)}
                            />
                            <p className={(pwdFocus && pwd && !validPwd) ? "showInstractions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} /> 8 to 24 characters. <br />
                                Must include uppercase and lowercase letters, a number and a special character. <br />
                                Allowed special characters: ! @ # % $ <br />
                            </p>
                        </div>
                        <div className='inputBox'>
                            <label htmlFor='confirmPassword'>Confirm password:
                                {(matchPwd && !validMatchPwd) && <FontAwesomeIcon className="failureIcon" icon={faTimes} />}
                                {(matchPwd && validMatchPwd) && <FontAwesomeIcon className='successIcon' icon={faCheckCircle} />}
                            </label>
                            <input
                                id="confirmPassword"
                                type="password"
                                required
                                value={matchPwd}
                                onChange={(e) => setMatchPwd(e.target.value)}
                                onFocus={() => setMatchPwdFocus(true)}
                                onBlur={() => setMatchPwdFocus(false)}
                            />
                            <p className={(matchPwdFocus && matchPwd && !validMatchPwd) ? "showInstractions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} /> Must match the first password inpud field.
                            </p>
                        </div>
                        <button disabled={!formValid} className="btn">Register</button>
                        <div className='formLinks'>
                            <span>Already registered?</span>
                            <Link to="/login"> Sign in</Link>
                        </div>
                    </form>
                </section>)}
        </>
    )
}

export default Register