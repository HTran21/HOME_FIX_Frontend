import axios from "../../../service/customize_axios";
import { useEffect, useState } from "react";
import className from "classnames/bind";
import styles from "./FeedbackOrder.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Tabs, Space, Table, Tag, Drawer, Modal, DatePicker, Popover, Tooltip } from 'antd';
import { faBan, faChevronRight, faCircleCheck, faCircleUser, faCircleXmark, faClockRotateLeft, faDesktop, faMessage, faPenToSquare, faScrewdriverWrench, faTrash, faTrashCan, faWallet } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from 'moment';
import { toast } from "react-toastify";
const cx = className.bind(styles);
import dayjs from 'dayjs';

import { io } from "socket.io-client";

const socket = io.connect("http://localhost:3000", {
    transports: ["websocket"],
});

function FeedbackOrder() {

    const user = useSelector((state) => state.user.user);
    const [data, setData] = useState();
    const [listFeedback, setListFeedback] = useState();
    const [dateArrray, setDateArray] = useState([])
    const fetchFeedback = async () => {
        let getFeedback = await axios.get("http://localhost:3000/feedback/getAll");
        // console.log(getFeedback.data)
        setListFeedback(getFeedback.data)
    }


    useEffect(() => {
        fetchFeedback();
    }, [])

    const overView = () => {
        let awaitCount = 0;
        let successCount = 0;
        let cancelCount = 0;

        listFeedback?.forEach((feedback) => {
            if (feedback.feedbackStatus === 'W') {
                awaitCount++;
            } else if (feedback.feedbackStatus === 'S') {
                successCount++;
            } else if (feedback.feedbackStatus === 'D') {
                cancelCount++;
            }
        });

        return { awaitCount, successCount, cancelCount };
    }

    const awaitCount = overView();
    const successCount = overView();
    const cancleCount = overView();

    const cardData = [
        {
            title: 'PHẢN HỒI',
            number: `${listFeedback?.length}`,
            icon: faMessage,
            color: 'blue',
        },
        {
            title: 'ĐÃ DUYỆT',
            number: `${successCount.successCount}`,
            icon: faCircleCheck,
            color: 'green',
        },
        {
            title: 'ĐANG CHỜ',
            number: `${awaitCount.awaitCount}`,
            icon: faClockRotateLeft,
            color: 'yellow',
        },
        {
            title: 'TỪ CHỐI',
            number: `${cancleCount.cancelCount}`,
            icon: faTrashCan,
            color: 'red',
        },
    ];

    function Card({ title, number, icon, color }) {
        return (
            <div className={cx("cardBody", color)}>
                <div className={cx("iconCard")}>
                    <FontAwesomeIcon icon={icon} />
                </div>
                <div className={cx("contentOverview")}>
                    <p className={cx("numberCard")}>{number}</p>
                    <p className={cx("titleCard")}>{title}</p>
                </div>
            </div>
        );
    }


    function Card({ title, number, icon, color }) {
        return (
            <div className={cx("cardBody", color)}>
                <div className={cx("iconCard")}>
                    <FontAwesomeIcon icon={icon} />
                </div>
                <div className={cx("contentOverview")}>
                    <p className={cx("numberCard")}>{number}</p>
                    <p className={cx("titleCard")}>{title}</p>
                </div>
            </div>
        );
    }



    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 60,
            sorter: (a, b) => {
                return a.id - b.id;
            },
            align: 'center',
            defaultSortOrder: 'desc',

        },
        {
            title: 'ID_Order',
            dataIndex: 'ID_Order',
            key: 'ID_Order',
            fixed: 'left',
            width: 100,
            align: 'center'
        },
        {
            title: 'Người gửi',
            key: 'usernameRepairer',
            align: 'center',
            render: (_, record, index) => {

                let text = record.accountType === 'RP' ? `${record.Order.DetailOrder.Schedule.Repairer.usernameRepairer}` : (record.accountType === 'KH' ? `${record.Order.User.username}` : 'Khác');

                return (
                    <div key={index}>
                        {text}
                    </div>

                );
            },
        },
        {
            title: 'Role',
            dataIndex: 'accountType',
            key: 'accountType',
            width: 100,
            align: 'center',
            render: (_, { accountType, index }) => {
                let color = accountType === 'RP' ? 'orange' : (accountType === 'KH' ? 'green' : 'blue')
                let text = accountType === 'RP' ? 'Thợ' : (accountType === 'KH' ? 'Khách hàng' : 'Khác');

                return (
                    <Tag key={index + 1} style={{ width: "75px", textAlign: "center" }} color={color} >
                        {text}
                    </Tag>

                );
            },
        },
        {
            title: 'Loại yêu cầu',
            dataIndex: "feedbackType",
            key: 'feedbackType',
            render: (_, { feedbackType, index }) => {
                return (
                    <div key={index + 1}>
                        {feedbackType === 'change_date_repair' ? 'Đổi ngày sửa chữa' : (feedbackType === 'cancel_repair_order' ? 'Hủy đơn' : 'Khác')}
                    </div>
                )
            },
            align: 'center'
        },
        {
            title: 'Lý do',
            dataIndex: 'contentFeedback',
            key: 'contentFeedback',
            render: (contentFeedback, index) => {
                return (
                    <Popover content={contentFeedback} title="Lý do" >
                        <div className={cx("contentFeedback")}>
                            {contentFeedback}
                        </div>

                    </Popover>
                )
            },
            align: 'center'
        },
        {
            title: 'Ngày thay đổi',
            dataIndex: 'dateChange',
            key: 'dateChange',
            width: 150,

            sorter: (a, b) => {
                const dateA = new Date(a.dateChange);
                const dateB = new Date(b.dateChange);

                return dateA - dateB;
            },
            render: (_, { dateChange, index }) => {
                return (
                    <div key={index + 1}>
                        {dateChange != null ? moment(dateChange).format('DD/MM/YYYY') : ''}
                    </div>
                )
            },
            align: 'center'
        },
        {
            title: 'Trạng thái',
            key: 'feedbackStatus',
            width: 120,
            dataIndex: 'feedbackStatus',
            filters: [
                {
                    text: 'Đang chờ',
                    value: 'W'
                },
                {
                    text: 'Đã duyệt',
                    value: 'S'
                },
                {
                    text: 'Đã hủy',
                    value: 'D'
                },
            ],
            onFilter: (value, record) => record.feedbackStatus.indexOf(value) === 0,
            render: (_, { feedbackStatus, index }) => {
                let color = feedbackStatus === 'D' ? 'red' : (feedbackStatus === 'W' ? 'yellow' : 'green');
                let text = feedbackStatus === 'D' ? 'Đã hủy' : (feedbackStatus === 'W' ? 'Đang chờ' : 'Đã duyệt');

                return (
                    <Tag key={index + 1} style={{ width: "75px", textAlign: "center" }} color={color} >
                        {text}
                    </Tag>

                );
            },
            align: 'center'

        },
        {
            title: 'Action',
            key: 'action',
            width: 150,
            render: (_, record, index) => (
                <Space size="middle" key={index + 1}>
                    <Link className={`${record.feedbackType === 'change_date_repair' ? '' : 'd-none'}`} to={`/repair/editAccept/${record?.ID_Order}?feedback=${record?.id}`}>
                        <FontAwesomeIcon icon={faCircleCheck} className={`${cx("iconAccept")} ${(record?.feedbackStatus === 'W') ? '' : 'd-none'}`} size="xl" style={{ color: "#00a851", }} />
                    </Link>
                    <Tooltip title="Hủy đơn" onClick={() => showModalCancelOrder(record)}>
                        <FontAwesomeIcon icon={faBan} className={`${cx("iconAccept")} ${(record?.feedbackStatus === 'W') ? '' : 'd-none'} ${record.feedbackType === 'cancel_repair_order' ? '' : 'd-none'}`} size="xl" style={{ color: "#00a851", }} />
                    </Tooltip>
                    <FontAwesomeIcon icon={faCircleXmark} onClick={() => showModal(record)} className={`${cx("iconDenied")} 
                    ${record?.feedbackStatus === 'W' ? '' : 'd-none'}`} size="xl" style={{ color: "#e00000", }} />
                    <FontAwesomeIcon icon={faChevronRight} size="lg" style={{ color: "#005eff" }} onClick={() => showDrawer(record.Order)} />
                </Space>
            ),
            align: 'center'
        },
    ];

    const [pagination, setPagination] = useState({});

    function handleTableChange(data) {
        setPagination(data);
    }


    const [open, setOpen] = useState(false);
    const [record, setRecord] = useState();
    const showDrawer = (record) => {
        console.log(record)
        setOpen(true);
        setRecord(record);
        let formatDate = record.desireDate.split(",");
        setDateArray(formatDate.map(date => dayjs(date)))
    };
    const onClose = () => {
        setOpen(false);
        setDateArray('')
    };

    const [openModal, setOpenModal] = useState(false);
    const [feedbackDelete, setFeedbackDelete] = useState();
    const showModal = (record) => {
        setOpenModal(true)
        setFeedbackDelete(record)
    }
    const handleCancel = () => {
        setOpenModal(false);
        setFeedbackDelete();
    }
    const handleOk = (feedback) => {
        const ID_Feedback = feedback.id;
        const role = user.role;
        if (ID_Feedback && role) {
            axios.delete(`http://localhost:3000/feedback/denied/` + ID_Feedback, {
                params: {
                    role
                }
            })
                .then(res => {
                    if (res.data.success) {
                        toast.success(res.data.message);
                        handleCancel();
                        socket.emit("newNotification")
                    } else {
                        toast.success(res.data.message);
                    }
                })
        }


    }

    const [openModalCancelOrder, setModalCancelOrder] = useState(false);
    const [feedbackCancel, setFeedbackCancel] = useState();
    const showModalCancelOrder = (record) => {
        setModalCancelOrder(true)
        setFeedbackCancel(record)
    }
    const handleCancelModal = () => {
        setModalCancelOrder(false);
        setFeedbackCancel();
    }
    const handleAcceptCancelOrder = (feedback) => {
        const ID_Feedback = feedback.id;
        if (ID_Feedback) {
            axios.post(`http://localhost:3000/order/cancelOrder/` + ID_Feedback)
                .then(res => {
                    if (res.data.success) {
                        toast.success(res.data.message);
                        handleCancelModal();
                        fetchFeedback();
                        socket.emit("newNotification");
                    } else {
                        toast.success(res.data.message);
                    }
                })
        }


    }





    return (
        <>
            <div className={cx("containerPage")}>
                <div>
                    <h4 className={cx("titlePage")}>Danh sách phản hồi</h4>
                    <div className="overviewOrder">
                        <div className="row">
                            {cardData.map((card, index) => (
                                <div className="col-sm-12 col-md-6 col-lg-3 mt-2" key={index}>
                                    <Card
                                        icon={card.icon}

                                        number={card.number}
                                        title={card.title}

                                        color={card.color}
                                    />
                                </div>

                            ))}
                        </div>
                    </div>

                </div>
                <div className={cx("contentPage")}>

                    <Table className="mt-4" columns={columns} dataSource={listFeedback}
                        pagination={{
                            defaultPageSize: 5,
                            showSizeChanger: true,
                            pageSizeOptions: ['5', '10', '15']
                        }}
                        onChange={handleTableChange}
                        rowKey={"id"}
                        scroll={{
                            x: 1200,
                        }}
                    />
                </div>
            </div >
            <Drawer onClose={onClose} open={open} width={600} title={
                <div className={cx("titleForm")}>
                    <h3 className={cx("titleRepair")}>ĐĂNG KÝ SỬA CHỮA</h3>
                    <span className="h1 ms-auto "><img className={cx("imgLogo")} src="../image/logo/logo8.png" alt="" />
                        <p className={cx("textLogo")}>HOME FIX</p></span>
                </div>
            } >
                <div className={cx("oder")}>

                    <div className={cx("inforUser")}>
                        <h5 className="mb-2">Thông tin khách hàng</h5>
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <div className="form-floating mb-3" >
                                    <input
                                        type="text"
                                        className={`${cx("inputForm")} form-control`}
                                        id="floatingInput"
                                        placeholder="name@example.com"
                                        readOnly value={record?.fullName} onChange={() => { }}
                                    />

                                    <label htmlFor="floatingInput">Họ tên</label>
                                </div>

                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className={`${cx("inputForm")} form-control`}
                                        id="floatingInput"
                                        placeholder="name@example.com"
                                        readOnly value={record?.email} onChange={() => { }}
                                    />
                                    <label htmlFor="floatingInput">Email</label>
                                </div>

                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <div className="form-floating mb-3" >
                                    <input
                                        type="text"
                                        className={`${cx("inputForm")} form-control`}
                                        id="floatingInput"
                                        placeholder="name@example.com"
                                        readOnly value={record?.phone} onChange={() => { }}
                                    />

                                    <label htmlFor="floatingInput">Số điện thoại</label>
                                </div>

                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className={`${cx("inputForm")} form-control`}
                                        id="floatingInput"
                                        placeholder="name@example.com"
                                        readOnly value={record?.address} onChange={() => { }}
                                    />
                                    <label htmlFor="floatingInput">Địa chỉ</label>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className={cx("inforRepair")}>
                        <h5 className="mb-2">Thông tin Dịch vụ</h5>
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <div className="form-floating mb-3" >
                                    <input
                                        type="text"
                                        className={`${cx("inputForm")} form-control`}
                                        id="floatingInput"
                                        placeholder="name@example.com"
                                        readOnly value={record?.Categori.Service.nameService} onChange={() => { }}
                                    />

                                    <label htmlFor="floatingInput">Dịch vụ</label>
                                </div>

                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className={`${cx("inputForm")} form-control`}
                                        id="floatingInput"
                                        placeholder="name@example.com"
                                        readOnly value={record?.Categori.nameCategories} onChange={() => { }}
                                    />
                                    <label htmlFor="floatingInput">Loại thiết bị</label>
                                </div>

                            </div>
                        </div>
                        <div className="">
                            <div className="form-floating mb-3" >
                                <p className="fw-bold">Thời gian mong muốn</p>
                                <DatePicker
                                    multiple
                                    onChange={() => { }}
                                    maxTagCount="responsive"
                                    value={dateArrray}
                                    size="large"
                                    disabled
                                />
                            </div>

                        </div>

                        <div className="">
                            <div className="form-floating mb-3">
                                <textarea
                                    className={`${cx("inputForm")} form-control`}
                                    placeholder="Leave a comment here"
                                    id="floatingTextarea2"
                                    style={{ height: 50 }}
                                    value={record?.desProblem} readOnly onChange={() => { }}
                                />
                                <label htmlFor="floatingTextarea2">Comments</label>

                            </div>

                        </div>
                    </div>
                    <div className={cx("inforRepair")}>
                        <h5 className="mb-2">Thông tin sửa chữa</h5>
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <div className="form-floating mb-3" >
                                    <input
                                        type="text"
                                        className={`${cx("inputForm")} form-control`}
                                        id="floatingInput"
                                        placeholder="name@example.com"
                                        readOnly value={record?.DetailOrder && record?.DetailOrder.Schedule.Repairer.usernameRepairer} onChange={() => { }}
                                    />

                                    <label htmlFor="floatingInput">Họ tên thợ</label>
                                </div>

                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className={`${cx("inputForm")} form-control`}
                                        id="floatingInput"
                                        placeholder="name@example.com"
                                        readOnly value={record?.DetailOrder && moment(record?.DetailOrder.Schedule.workDay).format('YYYY-MM-DD')} onChange={() => { }}
                                    />
                                    <label htmlFor="floatingInput">Ngày sửa chữa</label>
                                </div>

                            </div>
                            <div>
                                <p ><span className="fw-bold">Thời gian sửa chữa:</span> {record?.DetailOrder && record.DetailOrder.timeRepair ? record.DetailOrder.timeRepair : 'Đang chờ thợ duyệt'}</p>
                            </div>
                        </div>
                    </div>
                    <div className={cx("statusOrder")}>
                        <span>Trạng thái:</span>
                        <div className={`${cx("status")} ${record && record?.status === 'W' ? 'text-warning border-warning' :
                            (record?.status === 'A' ? 'text-success border-success' :
                                (record?.status === 'R' ? 'text-warning text-opacity-50 border-warning-subtle' :
                                    (record?.status === 'S' ? 'text-primary border-primary' : 'text-danger border-danger')))}`}>
                            {record && record?.status === 'W' ? 'Đang chờ' : (record?.status == 'A' ? 'Đã duyệt' : (record?.status === 'R' ? 'Đang sửa' : (record?.status === 'S' ? 'Hoàn thành' : (record?.status === 'P' ? 'Đang duyệt' : 'Đã hủy'))))}
                        </div>
                    </div>
                </div>
            </Drawer>
            <Modal title="Từ chối phản hồi" open={openModal} onOk={() => handleOk(feedbackDelete)} onCancel={handleCancel} okButtonProps={{ style: { backgroundColor: 'red' } }} okText="Xóa" cancelText="Đóng">
                <p>Bạn chắc chắn muốn xóa phản hồi này?</p>
            </Modal>
            <Modal title="Duyệt hủy đơn" open={openModalCancelOrder} onOk={() => handleAcceptCancelOrder(feedbackCancel)} onCancel={handleCancelModal} okText="Duyệt" cancelText="Đóng">
                <p>Bạn chắc chắn duyệt phản hồi hủy đơn này?</p>
            </Modal>
        </>
    );
}

export default FeedbackOrder;