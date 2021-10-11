import React from 'react'
import "../css/header.scss";
const Userlogo = ({user}) => {
    return (
        <p className="userName">
            <span>{user?.name[0]}</span>
        </p>
    )
}

export default Userlogo
