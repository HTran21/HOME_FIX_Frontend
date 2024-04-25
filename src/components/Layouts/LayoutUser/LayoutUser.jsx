import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from "react-router-dom";
import className from "classnames/bind";
import styles from "./LayoutUser.module.scss";
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space, Button, Badge, Popover } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faClipboardList, faClock, faHeadset } from "@fortawesome/free-solid-svg-icons";
import AuthenService from "../../../service/AuthService";
import { doLogoutAction } from "../../../redux/reducer/userSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from '../../../service/customize_axios';
import moment from 'moment';

import { io } from "socket.io-client";

const socket = io.connect("http://localhost:3000", {
    transports: ["websocket"],
});

const cx = className.bind(styles);
import {
    ToolOutlined,
    CodeSandboxOutlined,
    DashboardOutlined,
    ShopOutlined,
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
    getItem(
        <Link to={"/"}>
            <p style={{
                fontWeight: "bold", fontFamily: "'Reem Kufi', sans-serif",
                display: "inline-block",
                transform: "translate(0, 7px)",
                fontSize: "20px",
                color: "#fff",
                marginBottom: "10px",
            }}>
                HOME FIX</p></Link>
        , '0',
        <img className='m-0' style={{
            width: "25px",
            display: "inline-block"
        }} src="../../image/logo/logo8.png" alt="" />
    ),

    getItem(<Link to="/user" className='text-decoration-none'>Thông tin</Link>, '1', <UserOutlined />),
    getItem(<Link to="/user/order" className='text-decoration-none'>Đơn hàng</Link>, '2', <FontAwesomeIcon icon={faClipboardList} />),
    getItem(<Link to="/user/chat" className='text-decoration-none'>Hỗ trợ</Link>, '3', <FontAwesomeIcon icon={faHeadset} />),

];



const LayoutUser = () => {
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
            localStorage.removeItem("room")
        }

    };

    const fetchNotification = () => {
        if (user && user.role) {
            let ID_User = user.id;
            let role = user.role;
            axios.get('http://localhost:3000/notification/userNotification', {
                params: {
                    ID_User: ID_User,
                    role: role
                }
            })
                .then(res => {
                    console.log(res.data)
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


    const linkNotification = (type) => {
        if (type === 'order_new') {
            setOpen(false)
            return navigate('/user/order');
        } else if (type === 'order_approved') {
            setOpen(false)
            return navigate('/user/order');
        } else if (type === 'order_completed') {
            setOpen(false)
            return navigate('/user/order');
        } else if (type === 'payment_request') {
            setOpen(false)
            return navigate('/user/order');
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
                    <div onClick={() => linkNotification(notification.typeNotification)} className={`${cx(`${notification.read === 'UR' ? 'newMessage' : 'message'}`)} m-1`} key={index}>
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

        <>
            <Layout
                style={{
                    minHeight: '100vh',
                }}
            >
                <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                    <div className={cx("logoSlider")}>
                    </div>
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
                    {/* <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer> */}
                </Layout>
            </Layout >
        </>
    );
};
export default LayoutUser;