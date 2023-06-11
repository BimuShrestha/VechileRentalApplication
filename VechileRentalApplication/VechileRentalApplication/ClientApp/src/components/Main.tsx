import React, { Fragment, useEffect, useState }  from "react";
import authService from "./api-authorization/AuthorizeService";
import { ApplicationPaths } from "./api-authorization/ApiAuthorizationConstants";
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Spin } from "antd";
import AdminDashboard from "../scenes/AdminDashboard";
import LandingPage from "../scenes/LandingPage";

const Main=()=>{
    const[isAuthenticated,setIsAuthenticated]=useState(false);
    const[loading,setLoading]=useState(true);
    const[user,setUser]=useState({} as any)
    useEffect(()=>{
        (async()=>{
            const [isAuthenticatedValue, userValue] = await Promise.all([authService.isAuthenticated(), authService.getUser()])
            console.log(isAuthenticatedValue,userValue)
            setIsAuthenticated(isAuthenticatedValue)
            setUser(userValue);
            setLoading(false)

        })()
    },[])
    const registerPath = `${ApplicationPaths.Register}`;
    const loginPath = `${ApplicationPaths.Login}`;
    const profilePath = `${ApplicationPaths.Profile}`;
    const logoutPath = { pathname: `${ApplicationPaths.LogOut}`, state: { local: true } };
    if(loading){
        return (<Spin/>)
    }
      return (<>
      {isAuthenticated ? <Fragment>
            {/* <NavItem>
                <NavLink tag={Link} className="text-dark" to={profilePath}>Hello {user?.userName}</NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={Link} className="text-dark" to={logoutPath}>Logout</NavLink>
            </NavItem> */}
            <AdminDashboard/>
        </Fragment>:<Fragment>
            {/* <NavItem>
                <NavLink tag={Link} className="text-dark" to={registerPath}>Register</NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={Link} className="text-dark" to={loginPath}>Login</NavLink>
            </NavItem> */}
            <LandingPage/>
        </Fragment>}
      </>)
      
}
export default Main