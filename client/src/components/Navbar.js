import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

export const  Navbar = () => {
    const auth = useContext(AuthContext);
    const history = useHistory();

    const logoutHandler = event => {
        event.preventDefault();
        auth.logout();
        history.push("/");
    }

    return (
        <>
            <nav>
                <div className="nav-wrapper blue darken-1 nav-bar-content">
                    <span className="brand-logo">Test Your Knowledge, {auth.userId}</span>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><NavLink to="/create">Create</NavLink></li>
                        <li><NavLink to="/links">Links</NavLink></li>
                        <li><button className="btn" onClick={logoutHandler}>Log out</button></li>
                    </ul>
                </div>
            </nav>
            <nav className="nav-extended">
                <div className="nav-wrapper">
                    <a href="#" className="brand-logo">Logo</a>
                    <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><a href="#">Sass</a></li>
                        <li><a href="#">Components</a></li>
                        <li><a href="#">JavaScript</a></li>
                    </ul>
                </div>
                <div className="nav-content">
                    <ul className="tabs tabs-transparent">
                        <li className="tab"><a href="#">Test 1</a></li>
                        <li className="tab"><a className="active" href="#">Test 2</a></li>
                        <li className="tab disabled"><a href="#">Disabled Tab</a></li>
                        <li className="tab"><a href="#">Test 4</a></li>
                    </ul>
                </div>
            </nav>

            <ul className="sidenav" id="mobile-demo">
                <li><a href="#">Sass</a></li>
                <li><a href="#">Components</a></li>
                <li><a href="#">JavaScript</a></li>
            </ul>

            <div id="test1" className="col s12">Test 1</div>
            <div id="test2" className="col s12">Test 2</div>
            <div id="test3" className="col s12">Test 3</div>
            <div id="test4" className="col s12">Test 4</div>
        </>

    )
}