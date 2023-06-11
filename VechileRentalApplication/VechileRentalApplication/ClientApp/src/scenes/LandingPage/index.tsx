import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Row, Col } from 'antd';
import Vechiles  from '../Vechile';
import ReservationPage from '../Reservation';
import DriverPage from '../Drivers';
import CustomerPage from '../Customers';
import { NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { ApplicationPaths } from '../../components/api-authorization/ApiAuthorizationConstants';
import LandingHomePage from "./components/HomePage"

const { Header, Sider, Content } = Layout;

const AdminDashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [key,setKey]=useState("1")
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const registerPath = `${ApplicationPaths.Register}`;
  const loginPath = `${ApplicationPaths.Login}`;
  const profilePath = `${ApplicationPaths.Profile}`;
  const logoutPath = { pathname: `${ApplicationPaths.LogOut}`, state: { local: true } };
  return (
    
         <LandingHomePage/>
       
  );
};

export default AdminDashboard;