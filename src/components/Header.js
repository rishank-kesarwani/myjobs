import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom";
import "../css/header.scss";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import Userlogo from './Userlogo';
export const Header = () => { 
    const [user, setUser] = useState(null);
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("authenticatedUser")));
    }, []);
    const LightTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} arrow classes={{ popper: className }} />
      ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
          backgroundColor: theme.palette.common.white,
          boxShadow: theme.shadows[1],
          fontSize: 14,
          width: 112,
          height: 30,
          paddingTop: 14,
          poiter: "cursor",
          [`a`]: {
              textDecoration: "none",
              color: 'rgba(48,63,96,1)',
          }
        },
        [`& .${tooltipClasses.arrow}`]: {
            [`&:before`] : {
                backgroundColor: theme.palette.common.white,
            }
        },
      }));
    return (
        <div className="headerContainer">
            <header className="main_header">
                <h4>My<span>Jobs</span></h4>
                {!user && (
                    <Link to="/login"><button className="login">Login/Register</button></Link>
                )}
                {user && (
                    <div className="activeUser">
                        <Link to="/post-job"><p className="post">Post a Job</p></Link>
                        <div className="user">
                            <Userlogo user={user} />
                            <span className="toolTip">
                                <LightTooltip arrow title={<Link to="/logout">Logout</Link>} enterTouchDelay={0}>
                                    <ArrowDropDownIcon />
                                </LightTooltip>
                            </span>
                        </div>
                    </div>
                )}
                
            </header>
            <div className="seperator"></div>
        </div>
    )
}