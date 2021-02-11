import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";

export const CreatePage = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const { request } = useHttp();
    const [ link, setLink ] = useState("");

    useEffect(() => {
        window.M.updateTextFields();
    }, [])

    const changeHandler = event => {
        setLink(event.target.value)
    };

    const keyPressHandler = async event => {
        if (event.key === "Enter") {
            try{
                const data = await request(
                    "/api/links/generate",
                    "POST",
                    { from: link },
                    { Authorization: `Bearer ${auth.token}` }
                    );
                history.push(`/details/${data.link._id}`)
                console.log(data)
            } catch (e) {}
        }
    }

    return (
        <div className="row">
            <div className="col s8 offset-s2">
                <div className="input-field">
                    <input
                        id="link"
                        type="text"
                        placeholder="Enter link"
                        value={link}
                        onChange={changeHandler}
                        onKeyPress={keyPressHandler}
                    />
                    <label htmlFor="link">Enter link</label>
                </div>
            </div>
        </div>
    )
}
