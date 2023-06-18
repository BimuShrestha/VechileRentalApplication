import React, { Fragment, useEffect, useState }  from "react";
import authService from "./api-authorization/AuthorizeService";
import { ApplicationPaths } from "./api-authorization/ApiAuthorizationConstants";
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Spin } from "antd";
import AdminDashboard from "../scenes/AdminDashboard";
import LandingPage from "../scenes/LandingPage";
import StyledSpin from "./StyledSpin";
import useAxios from "../lib/axios/useAxios";
import CustomerDashboard from "../scenes/CustomerDashboard";
import DriverDashboard from "../scenes/DriverDashboard";

const Main=()=>{
    const[isAuthenticated,setIsAuthenticated]=useState(false);
    const[{data,loading:userLoading},getMyDetail]=useAxios({url:`api/user/me`},{
        isReady:false
    })
    const[loading,setLoading]=useState(true);
    const[user,setUser]=useState({} as any)
    useEffect(()=>{
        (async()=>{
            const [isAuthenticatedValue, userValue] = await Promise.all([authService.isAuthenticated(), authService.getUser()])
            console.log(isAuthenticatedValue,userValue)
            setIsAuthenticated(isAuthenticatedValue)
            setUser(userValue);
            if(isAuthenticatedValue){
                getMyDetail({params:{email:userValue.name}})
            }
            setLoading(false);
        })()
    },[])
    const registerPath = `${ApplicationPaths.Register}`;
    const loginPath = `${ApplicationPaths.Login}`;
    const profilePath = `${ApplicationPaths.Profile}`;
    const logoutPath = { pathname: `${ApplicationPaths.LogOut}`, state: { local: true } };
    if(loading || userLoading){
        return (<StyledSpin/>)
    }
      return (<>
      {data && isAuthenticated ? <Fragment>
           
            {
                data.userTypeId===1 && <CustomerDashboard data={user}/>
            }
             {
                data.userTypeId===2 && <DriverDashboard/>
            }
             {
                data.userTypeId===3 && <AdminDashboard data={user}/>
            }
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