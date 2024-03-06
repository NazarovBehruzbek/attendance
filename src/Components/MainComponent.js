import React, {useEffect, useState} from 'react';
import {
    CheckSquareOutlined, KeyOutlined, LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined, NotificationOutlined, SettingOutlined, TableOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button } from 'antd';
import {Navigate, Outlet, useNavigate} from "react-router-dom";
import "./MainComponent.css";
import {deleteLocalStorage} from "../utilits";
import {tokenKey} from "../constants/Constants";

const { Header, Sider } = Layout;

function MainComponent() {
    const [collapsed, setCollapsed] = useState(false);
    const [selectedKey, setSelectedKey] = useState('')
    const [islogout,setIslogout]=useState(false);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    const navigate = useNavigate();

    useEffect(() => {
        const storedKey = localStorage.getItem('selectedKey');
        if (storedKey) {
            setSelectedKey(storedKey);
        }
    }, []);
    const handleMenuClick = ({ key }) => {
        setSelectedKey(key);
        localStorage.setItem('selectedKey', key);
        navigate(key);
    };
    const logout = ()=>{
        deleteLocalStorage(tokenKey);
        setIslogout(true)

    }
    return (
                 <Layout style={{ minHeight: '100vh' }}>
                    <Sider collapsible collapsed={collapsed} onCollapse={toggleCollapsed}>
                        <div style={{marginTop:'20px',color:'white',fontSize:'25px',fontFamily:'sans-serif',marginLeft:'20px'}}><img style={{width:'25px',marginRight:'10px'}} src="https://cdn.pixabay.com/photo/2016/04/15/18/05/computer-1331579_1280.png" alt=""/>Staff</div>
                        <Menu
                            onClick={handleMenuClick}
                            theme="dark"
                            mode="inline"
                            selectedKeys={[selectedKey]}
                            defaultSelectedKeys={['/']}
                            style={{marginTop:'20px'}}
                            items={[
                                {
                                    key: '/dashboard',
                                    icon: <UserOutlined />,
                                    label: 'Xodimlar',
                                },
                                {
                                    key: '/dashboard/tabel',
                                    icon: <TableOutlined />,
                                    label: 'Tabel',
                                },
                                {
                                    key: '/dashboard/davomad',
                                    icon: <CheckSquareOutlined />,
                                    label: 'Davomad',
                                },
                                {
                                    key: '/dashboard/setting',
                                    icon: <SettingOutlined />,
                                    label: 'Sozlashlar',
                                },
                                {
                                    key: '/dashboard/updatepasword',
                                    icon: <KeyOutlined />,
                                    label: 'Parolni yangilash',
                                },
                                {
                                    key: '/dashboard/notification',
                                    icon: <NotificationOutlined />,
                                    label: 'Bildirishnoma',
                                },
                                {
                                    key: '/dashboard/checkdavomad',
                                    icon: <CheckSquareOutlined />,
                                    label: 'Davomad kiritish',
                                }
                            ]}
                        />
                           </Sider>
                    <Layout>
                        <Header style={{ padding: 0,background: '#fff' }} >
                            {
                                    islogout ?
                                    <Navigate to="/login"/>:''
                            }
                            <Button
                                style={{ color: 'black' }}
                                size="large"
                                type="text"
                                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                onClick={toggleCollapsed}
                            />
                            <Button onClick={logout}  style={{position:'absolute',right:'50px',marginTop:'14px'}} icon={<LogoutOutlined/>}>Chiqish</Button>
                        </Header>
                           <div className="conten-page">
                               <Outlet/>
                        </div>
                        </Layout>
                </Layout>

    );
}

export default MainComponent;
