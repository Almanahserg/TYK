import React from "react";
import { Link } from "react-router-dom";

export const LinksList = ({ links }) => {
    if (!links.length) {
        return <p>No links yet</p>
    }
    return (
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>To</th>
                    <th>From</th>
                    <th>Open</th>
                </tr>
            </thead>
            <tbody>
            {links.map((link, index) => (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{link.to}</td>
                    <td>{link.from}</td>
                    <td><Link to={`/details/${link._id}`}>Open</Link></td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}