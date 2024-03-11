import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from "react-router-dom";
import className from "classnames/bind";
import styles from "./LayoutAdmin.module.scss";
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space, Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from "@fortawesome/free-solid-svg-icons";
import AuthenService from "../../../service/AuthService";
import { doLogoutAction } from "../../../redux/reducer/userSlice";
import { useDispatch, useSelector } from "react-redux";

const cx = className.bind(styles);
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    CodeSandboxOutlined,
    DashboardOutlined,
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
        color: "#fff",
        marginBottom: "10px"
    }}>HOME FIX</p>, '0', <img className='m-0' style={{
        width: "25px",
        display: "inline-block"
    }} src="../image/logo/logo8.png" alt="" />),
    getItem(<Link to="/admin" className='text-decoration-none'>Dashboard</Link>, '1', <DashboardOutlined />),
    getItem('Sản Phẩm', 'sub1', <CodeSandboxOutlined />, [
        getItem(<Link to="/admin/product" className='text-decoration-none'>Danh Sách</Link>, '2'),
        getItem('Thêm Sản Phẩm', '3'),
        getItem('Danh mục', '4'),
    ]),
    getItem('Dịch Vụ', 'sub2', <CodeSandboxOutlined />, [
        getItem(<Link to="/admin/service" className='text-decoration-none'>Danh sách</Link>, '5'),
        getItem(<Link to="/admin/addservice" className='text-decoration-none'>Thêm dịch vụ</Link>, '6'),
        getItem('Danh mục', '7'),
    ]),
];



const LayoutAdmin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = async () => {
        const res = await AuthenService.logoutApi();
        if (res.status === 200) {
            dispatch(doLogoutAction());
            // toast.success("Đăng xuất thành công");
            navigate("/login");
            console.log("Logout thanh cong")
        }

    };

    const items = [
        {
            label: <p className='m-0'>Đăng xuất</p>,
            key: '0',
            onClick: handleLogout,
        },
    ];

    const user = useSelector((state) => state.user.user);

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
                            <Button> {user?.username || ""}</Button>
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