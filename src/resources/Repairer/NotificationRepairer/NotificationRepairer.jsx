import { useEffect, useState } from "react";
import styles from "./NotificationRepairer.module.scss";
import classNames from 'classnames/bind';
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tabs, DatePicker, Modal, Button, Drawer, notification } from 'antd';
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import moment from 'moment';
import axios from '../../../service/customize_axios';

import { io } from "socket.io-client";

const socket = io.connect("http://localhost:3000", {
    transports: ["websocket"],
});

import { faArrowLeft, faClipboard, faClock, faMagnifyingGlass, faMessage, faTriangleExclamation, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
const cx = classNames.bind(styles);

function NotificationRepairer() {
    const location = useLocation();
    const [isOnNotificationPage, setIsOnNotificationPage] = useState(false);

    const user = useSelector((state) => state.user.user);

    const [listNotification, setListNotification] = useState()

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
                    setListNotification(res.data)
                })
        }

    }


    useEffect(() => {
        fetchNotification();
    }, [])

    useEffect(() => {
        return () => {
            if (listNotification && location.pathname !== '/notification') {
                const listNotificationUnRead = listNotification.filter(notification => notification.read === 'UR');
                if (listNotificationUnRead.length > 0) {
                    axios.post("http://localhost:3000/notification/changeReadNotification", { listNotificationUnRead })
                        .then(res => {
                            if (res.data.success) {
                                // console.log(res.data)
                                fetchNotification();
                                socket.emit("after_read_message");
                            } else {
                                console.log(res.data)
                            }


                        })

                } else {
                    return;
                }
            }
        };
    }, [listNotification]);

    useEffect(() => {
        socket.on("fetchNotification", () => {
            fetchNotification();
        })
    }, [socket])

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
            return 'Yêu cầu duyệt đơn'
        } else if (type === 'order_feedback_success') {
            return 'Phản hồi được duyệt'
        }
    }



    return (
        <>
            <div className="container">
                <div className={cx("titlePage")}>
                    <p className={cx("textTitle")}>Thông báo</p>
                </div>
                <div className="contentPage">

                    {listNotification?.length === 0 ? (
                        <div className={cx("emptyNotification")}>
                            <div className={cx("imgEmptyNotification")}>
                                <img src="../icon/mail.png" alt="" />
                            </div>
                            <div className={cx("titleMessageEmpty")}>
                                Không có tin nhắn
                            </div>
                        </div>
                    ) : (
                        <div className="row">
                            {
                                listNotification?.map((notification, index) => (
                                    <div key={index} className="col-lg-4 col-md-6 col-sm-12">
                                        <div className={cx("detailNotification", `${notification.read === 'UR' ? 'active' : ''}`)}>
                                            <div className={cx("iconNotification")}>
                                                <FontAwesomeIcon icon={notification.typeNotification === 'order_approved_request' ? faClipboard : faMessage} style={{ color: `${notification.typeNotification === 'order_approved_request' ? '#e6b400' : '#8DECB4'}` }} />
                                            </div>
                                            <div className={cx("cotentNotification")}>
                                                <div className={cx("titleMessage")}>
                                                    {typeNotification(notification.typeNotification)}
                                                    <div className={cx("timeMessage")}>
                                                        <FontAwesomeIcon icon={faClock} className="me-1" />
                                                        {moment(notification.createdAt).format("HH:mm DD/MM/YYYY")}
                                                    </div>
                                                </div>
                                                <div className={cx("textNotification")}>
                                                    {notification.contentNotification}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }

                        </div>
                    )}

                </div>

            </div >
        </>
    );
}

export default NotificationRepairer;