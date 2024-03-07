import React, { useState } from 'react';
import { Link, Outlet } from "react-router-dom";
import className from "classnames/bind";
import styles from "./LayoutAdmin.module.scss";
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space, Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from "@fortawesome/free-solid-svg-icons";
const items = [
    {
        label: <p className='m-0'>Đăng xuất</p>,
        key: '0',
    },
];
const cx = className.bind(styles);
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}
const itemsSlider = [
    getItem(<p style={{
        fontWeight: "bold", fontFamily: "'Reem Kufi', sans-serif",
        display: "inline-block",
        transform: "translate(0, 7px)",
        fontSize: "20px",
        marginFeft: "5px",
        color: "#fff"
    }}>HOME FIX</p>, '0', <img className='m-0' style={{
        width: "25px",
        display: "inline-block"
    }} src="../image/logo/logo8.png" alt="" />),
    getItem('Option 1', '1', <PieChartOutlined />),
    getItem('Option 2', '2', <DesktopOutlined />),
    getItem('User', 'sub1', <UserOutlined />, [
        getItem('Tom', '3'),
        getItem('Bill', '4'),
        getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined />),
];
const LayoutAdmin = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className={cx("logoSlider")}>
                    {/* <img className={cx("imgLogo")} src="../image/logo/logo8.png" alt="" />
                    <p className={cx("textLogo")}>HOME FIX</p> */}
                </div>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={itemsSlider} />
            </Sider>
            <Layout>
                <Header className={cx("headerAdminLayout")}>
                    <div className={cx("infoUser")}>
                        <div className={cx("iconBell")}>
                            <FontAwesomeIcon icon={faBell} />

                        </div>

                        <img className={cx("imgAvatar")} src="https://i.pinimg.com/564x/f8/ed/03/f8ed03e9b4633dfa0f7901c62e6b206c.jpg" alt="" />
                        {/* <Dropdown
                            menu={{
                                items,
                            }}
                            placement="top"
                            trigger={['click']}
                            
                        >
                            <a onClick={(e) => e.preventDefault()}>
                                <Space>
                                    Hoang Tran
                                    <DownOutlined />
                                </Space>
                            </a>
                        </Dropdown> */}
                        <Dropdown
                            menu={{
                                items,
                            }}
                            placement="top"
                        >
                            <Button>Hoang tran</Button>
                        </Dropdown>
                    </div>
                </Header>
                <Content>
                    <div>
                        <Outlet />
                    </div>
                </Content>
                {/* <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer> */}
            </Layout>
        </Layout>
    );
};
export default LayoutAdmin;