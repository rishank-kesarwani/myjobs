import React, {useEffect} from 'react'

export const Logout = ({history}) => {
    useEffect(() => {
        localStorage.clear();
        history.push("/");
        window.location.reload();
        //Below line is only using for hosting purpose in vercel
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div>
            Logging Out...
        </div>
    )
}