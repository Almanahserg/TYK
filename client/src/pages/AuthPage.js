import React, {useState, useEffect, useContext} from "react";

import { BackgroundWave } from "../components/BackgroundWave";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";
import { AuthContext } from "../context/AuthContext";

export const AuthPage = () => {
    const auth = useContext(AuthContext);
    const { error, request, clearErrors, loading } = useHttp();
    const [form, setForm] = useState({
        email: "", password: ""
    })

    const message = useMessage();

    useEffect(() =>
        {
            message(error);
            clearErrors();
        }, [error, message, clearErrors]
    )

    useEffect(() => {
        window.M.updateTextFields();
    }, [])

    const handleChange = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
    };

    const registerHandler = async () => {
        try {
            const data = await request("/api/auth/register", "POST", {...form});
            message(data.message)
        } catch (e) {}
    }

    const loginHandler = async () => {
        try {
            const data = await request("/api/auth/login", "POST", {...form});
            auth.login(data.token, data.userId)
        } catch (e) {}
    }

    return (
        <>
            <div className="row">
                <div className="col s6 offset-s3">
                    <h3 className="center">Test Your Knowledge</h3>
                    <div className="card blue-grey darken-1">
                        <div className="card-content white-text">
                            <span className="card-title">Authorization</span>
                            <div className="input-field">
                                <input
                                    id="email"
                                    type="text"
                                    name="email"
                                    placeholder="Enter email"
                                    value={form.email}
                                    onChange={handleChange}
                                />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field">
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder="Enter password"
                                    value={form.password}
                                    onChange={handleChange}
                                />
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                        <div className="card-action">
                            <button
                                className="btn yellow darken-4"
                                onClick={loginHandler}
                                disabled={loading}
                            >
                                Sign In
                            </button>
                            <button
                                className="btn blue darken-4"
                                onClick={registerHandler}
                                disabled={loading}
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <BackgroundWave />
        </>

    )
}
