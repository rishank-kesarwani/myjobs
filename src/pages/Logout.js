import React, {useEffect} from 'react'

export const Logout = ({history}) => {
    useEffect(() => {
        localStorage.clear();
        history.push("/");
        window.location.reload();
    }, [])
    return (
        <div>
            Logging Out...
        </div>
    )
}