import React from "react";

export const LinkCard = ({ link }) => {
    return (
        <>
            <h3>Link</h3>
            <p>Short link:
                <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a>
            </p>
            <p>Link from:
                <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a>
            </p>
            <p>Count of clicks: <strong>{link.clicks}</strong></p>
            <p>Created: {new Date(link.date).toLocaleDateString()}</p>
        </>
    )
}