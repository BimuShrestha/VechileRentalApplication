import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  CarOutlined,
  RobotOutlined,
  UserSwitchOutlined
  
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Row, Col } from 'antd';
import Vechiles  from '../Vechile';
import ReservationPage from '../Reservation';
import DriverPage from '../Drivers';
import CustomerPage from '../Customers';
import { NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { ApplicationPaths } from '../../components/api-authorization/ApiAuthorizationConstants';
import CarLogo from "../LandingPage/components/assets/car.png"

const { Header, Sider, Content } = Layout;
interface User{
  data:any;
}
const AdminDashboard: React.FC<User> = ({data}) => {
  console.log("this is data", data);
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
    <Layout style={{height:'100vh'}}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical">
        <img
            src={CarLogo}
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt=""
            />
            VRS
        </div>
        
      
      
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[key]}
          onClick={(e)=>setKey(e.key)}
          items={[
            {
              key: '1',
              icon: <CarOutlined />,
              label: 'Vehicles',
            },
            {
              key: '2',
              icon: <RobotOutlined />,
              label: 'Reservations',
            },
            {
              key: '3',
              icon: <UserOutlined />,
              label: 'Drivers',
            },
            {
                key: '4',
                icon: <UserSwitchOutlined />,
                label: 'Customers',
              },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: "0 10px", background: colorBgContainer }}>
         <Row justify="space-between">
          <Col>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        
          </Col>
          <Col span={16}>
         <Row justify="end" style={{gap:"10px"}}>
          <Col>
          Welcome {data.firstName?data.firstName:""+" "+data.lastName?data.lastName:""}
          </Col>
          <Col>
           
          <Button type='primary'>
                <a href="/authentication/profile">Profile</a>
          </Button>
          </Col>
         </Row>
          </Col>
         </Row>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {key==="1"&&<Vechiles data = {data && data}/>}
         {key==="2"&& <ReservationPage data = {data && data}/>}
         {key==="3" && <DriverPage data = {data && data}/>}
         {key=="4" && <CustomerPage data = {data && data}/>}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;