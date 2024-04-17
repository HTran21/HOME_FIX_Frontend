import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from "react-router-dom";
import className from "classnames/bind";
import styles from "./LayoutAdmin.module.scss";
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space, Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faHeadset } from "@fortawesome/free-solid-svg-icons";
import AuthenService from "../../../service/AuthService";
import { doLogoutAction } from "../../../redux/reducer/userSlice";
import { useDispatch, useSelector } from "react-redux";

const cx = className.bind(styles);
import {
    ToolOutlined,
    CodeSandboxOutlined,
    DashboardOutlined,
    ShopOutlined,
    CalendarOutlined,
    LineChartOutlined,
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
    getItem(<Link to={"/"}>
        <p style={{
            fontWeight: "bold", fontFamily: "'Reem Kufi', sans-serif",
            display: "inline-block",
            transform: "translate(0, 7px)",
            fontSize: "20px",
            color: "#fff",
            marginBottom: "10px"
        }}>HOME FIX</p>
    </Link>, '0', <img className='m-0' style={{
        width: "25px",
        display: "inline-block"
    }} src="../../image/logo/logo8.png" alt="" />),
    getItem(<Link to="/admin" className='text-decoration-none'>Dashboard</Link>, '1', <DashboardOutlined />),
    getItem('Sản Phẩm', 'sub1', <CodeSandboxOutlined />, [
        getItem(<Link to="/admin/product" className='text-decoration-none'>Danh Sách</Link>, '2'),
        getItem(<Link to="/admin/addproduct" className='text-decoration-none'>Thêm sản phẩm</Link>, '3'),
        getItem(<Link to="/admin/categories" className='text-decoration-none'>Thể loại</Link>, '4'),
    ]),
    getItem('Dịch Vụ', 'sub2', <ToolOutlined />, [
        getItem(<Link to="/admin/service" className='text-decoration-none'>Danh sách</Link>, '5'),
        getItem(<Link to="/admin/addservice" className='text-decoration-none'>Thêm dịch vụ</Link>, '6'),
        getItem(<Link to="/admin/operation" className='text-decoration-none'>Thao tác</Link>, '7'),
        getItem(<Link to="/admin/creatoperation" className='text-decoration-none'>Tạo thao tác</Link>, '8'),
    ]),
    getItem('Nhân viên', 'sub3', <img src="../../public/icon/group.png" className={cx("iconSidebar")} alt="" />, [
        getItem(<Link to="/admin/staff" className='text-decoration-none'>Danh sách</Link>, '9'),
        getItem(<Link to="" className='text-decoration-none'>Thêm dịch vụ</Link>, '10'),
        getItem(<Link to="/admin/specialize" className='text-decoration-none'>Chuyên môn</Link>, '11'),
        getItem(<Link to="" className='text-decoration-none'>Tạo thao tác</Link>, '12'),
    ]),
    getItem('Sửa chữa', 'sub4', <img src="../../public/icon/car-repair.png" style={{ width: "15px" }} className={cx("iconSidebar")} alt="" />, [
        getItem(<Link to="/admin/order" className='text-decoration-none'>Danh sách</Link>, '13'),

    ]),
    getItem(<Link to="/admin/calendar" className='text-decoration-none'>Lịch làm việc</Link>, '14', <CalendarOutlined />),
    getItem(<Link to="/admin/brand" className='text-decoration-none'>Nhãn hàng</Link>, '15', <ShopOutlined />),
    getItem('Thống kê', 'sub5', <LineChartOutlined />, [
        getItem(<Link to="/admin/statistic/earn" className='text-decoration-none'>Doanh thu</Link>, '16'),
        getItem(<Link to="/admin/statistic/order" className='text-decoration-none'>Sửa chữa</Link>, '17'),
    ]),
    getItem(<Link to="/admin/chat" className='text-decoration-none'>Hỗ trợ</Link>, '18', <FontAwesomeIcon icon={faHeadset} />),

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

                        <img className={cx("imgAvatar")} src={`http://localhost:3000/${user?.avatar}`} alt="" />
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
                <Content style={{ backgroundColor: "#fff" }}>
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