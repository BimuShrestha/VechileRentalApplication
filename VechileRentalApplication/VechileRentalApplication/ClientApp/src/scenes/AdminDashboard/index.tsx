import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import Vechiles  from '../Vechile';
import ReservationPage from '../Reservation';
import DriverPage from '../Drivers';
import CustomerPage from '../Customers';
import { NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { ApplicationPaths } from '../../components/api-authorization/ApiAuthorizationConstants';

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
    <Layout style={{height:'100vh'}}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[key]}
          onClick={(e)=>setKey(e.key)}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'Vechiles',
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'Reservations',
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'Drivers',
            },
            {
                key: '4',
                icon: <UploadOutlined />,
                label: 'Customers',
              },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
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
          <Button>
                <NavLink tag={Link} className="text-dark" to={logoutPath}>Logout</NavLink>
          </Button>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {key==="1"&&<Vechiles/>}
         {key==="2"&& <ReservationPage/>}
         {key==="3" && <DriverPage/>}
         {key=="4" && <CustomerPage/>}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;