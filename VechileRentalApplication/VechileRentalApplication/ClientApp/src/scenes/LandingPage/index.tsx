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
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
         <Row justify="end">
          <Col>
          <Button type='primary'>
                <a  href={loginPath}>Login</a>
          </Button></Col>
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
         
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;