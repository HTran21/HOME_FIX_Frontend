import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from "react-router-dom";
import className from "classnames/bind";
import styles from "./LayoutAdmin.module.scss";
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space, Button, Badge, Popover, notification } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faHeadset } from "@fortawesome/free-solid-svg-icons";
import { faClock } from '@fortawesome/free-regular-svg-icons'
import AuthenService from "../../../service/AuthService";
import { doLogoutAction } from "../../../redux/reducer/userSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from '../../../service/customize_axios';
import moment from 'moment'

const cx = className.bind(styles);

import socket from '../../../service/socketService';

import {
    ToolOutlined,
    CodeSandboxOutlined,
    DashboardOutlined,
    ShopOutlined,
    CalendarOutlined,
    LineChartOutlined,
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
    getItem('Nhân viên', 'sub3', <img src="../../icon/group.png" className={cx("iconSidebar")} alt="" />, [
        getItem(<Link to="/admin/staff" className='text-decoration-none'>Danh sách</Link>, '9'),
        // getItem(<Link to="" className='text-decoration-none'>Thêm dịch vụ</Link>, '10'),
        // getItem(<Link to="/admin/specialize" className='text-decoration-none'>Chuyên môn</Link>, '11'),
        // getItem(<Link to="" className='text-decoration-none'>Tạo thao tác</Link>, '12'),
    ]),
    getItem('Khách hàng', 'sub4', <UserOutlined />, [
        getItem(<Link to="/admin/customer" className='text-decoration-none'>Danh sách</Link>, '10'),
        // getItem(<Link to="" className='text-decoration-none'>Thêm dịch vụ</Link>, '10'),
        // getItem(<Link to="/admin/specialize" className='text-decoration-none'>Chuyên môn</Link>, '11'),
        // getItem(<Link to="" className='text-decoration-none'>Tạo thao tác</Link>, '12'),
    ]),
    getItem('Sửa chữa', 'sub5', <img src="../../icon/car-repair.png" style={{ width: "15px" }} className={cx("iconSidebar")} alt="" />, [
        getItem(<Link to="/admin/order" className='text-decoration-none'>Danh sách</Link>, '11'),

    ]),
    getItem(<Link to="/admin/calendar" className='text-decoration-none'>Lịch làm việc</Link>, '14', <CalendarOutlined />),
    getItem(<Link to="/admin/brand" className='text-decoration-none'>Nhãn hàng</Link>, '15', <ShopOutlined />),
    getItem('Thống kê', 'sub6', <LineChartOutlined />, [
        getItem(<Link to="/admin/statistic/earn" className='text-decoration-none'>Doanh thu</Link>, '16'),
        getItem(<Link to="/admin/statistic/order" className='text-decoration-none'>Sửa chữa</Link>, '17'),
    ]),
    getItem(<Link to="/admin/chat" className='text-decoration-none'>Hỗ trợ</Link>, '18', <FontAwesomeIcon icon={faHeadset} />),

];



const LayoutAdmin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [listNotification, setListNotification] = useState()
    const user = useSelector((state) => state.user.user);
    const handleLogout = async () => {
        const res = await AuthenService.logoutApi();
        if (res.status === 200) {
            dispatch(doLogoutAction());
            // toast.success("Đăng xuất thành công");
            navigate("/login");
            // console.log("Logout thanh cong")
        }

    };

    const fetchNotification = () => {
        if (user && user.role) {
            let role = user.role;
            axios.get('http://localhost:3000/notification/userNotification', {
                params: {
                    ID_User: 0,
                    role: role
                }
            })
                .then(res => {
                    // console.log(res.data)
                    setListNotification(res.data)
                })
        }

    }

    useEffect(() => {
        fetchNotification();
    }, [])

    const items = [
        {
            label: <p className='m-0'>Đăng xuất</p>,
            key: '0',
            onClick: handleLogout,
        },
    ];

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const typeNotification = (type) => {
        if (type === 'order_new') {
            return 'Đơn sửa chữa mới';
        } else if (type === 'order_approved') {
            return 'Đơn sửa chữa đã duyệt';
        } else if (type === 'order_completed') {
            return 'Đơn sửa chữa hoàn thành';
        } else if (type === 'payment_request') {
            return 'Yêu cầu thanh toán';
        } else if (type === 'order_approved_request') {
            return 'Yêu cầu duyệt đơn sửa chữa'
        }
    }

    const [open, setOpen] = useState(false)

    const handleChangeOpen = (newOpen) => {
        setOpen(newOpen);
        if (newOpen) {
            return;
        } else {
            const listNotificationUnRead = listNotification?.filter(notification => notification.read === 'UR');
            if (listNotificationUnRead.length === 0) {
                return;
            }
            else {
                axios.post("http://localhost:3000/notification/changeReadNotification", { listNotificationUnRead })
                    .then(res => {
                        if (res.data.success) {
                            console.log(res.data)
                            fetchNotification();
                        } else {
                            console.log(res.data)
                        }


                    })
            }
        }
    };

    const menu = (
        <div className={cx("listNotification")}>
            {listNotification?.length === 0 ? (
                <div className='h-100 d-flex'>
                    <div className={cx("emptyNotification")}>
                        <div className={cx("imgEmptyNotification")}>
                            <img src="../icon/mail.png" alt="" />
                        </div>
                        <div className={cx("titleMessage")}>
                            Không có tin nhắn
                        </div>
                    </div>
                </div>

            ) : (
                listNotification?.map((notification, index) => (
                    <div className={`${cx(`${notification.read === 'UR' ? 'newMessage' : 'message'}`)} m-1`} key={index}
                        onClick={(e) => {
                            e && e.preventDefault && e.preventDefault();
                        }}>
                        <div className='p-1'>
                            <div className={cx("titleMessage")}>
                                {typeNotification(notification.typeNotification)}
                                <div className={cx("timeMessage")}>
                                    <FontAwesomeIcon icon={faClock} className='me-1' />
                                    {moment(notification.createdAt).format("HH:mm DD/MM/YYYY")}
                                </div>
                            </div>
                            <div className={cx("contentMewssage")}>
                                {notification.contentNotification}
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    )

    const countUnreadNotifications = () => {
        return listNotification?.filter(notification => notification.read === 'UR').length
    }
    useEffect(() => {
        countUnreadNotifications()
    }, [listNotification])


    useEffect(() => {
        socket.on("fetchNotification", () => {
            fetchNotification();
        })
    }, [socket])




    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={itemsSlider} />
            </Sider>
            <Layout>
                <Header className={cx("headerAdminLayout")}>
                    <div className={cx("infoUser")}>

                        <Popover content={menu} trigger="click" open={open} onOpenChange={handleChangeOpen}>
                            <Badge size="small" count={countUnreadNotifications()} className={cx("iconBell")}>
                                <FontAwesomeIcon icon={faBell} />
                            </Badge>
                        </Popover>

                        <img className={cx("imgAvatar")} src={`http://localhost:3000/${user?.avatar}`} alt="" />
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
            </Layout>
        </Layout >
    );
};
export default LayoutAdmin;