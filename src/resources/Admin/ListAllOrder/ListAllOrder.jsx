import axios from "../../../service/customize_axios";
import { useEffect, useState } from "react";
import className from "classnames/bind";
import styles from "./ListAllOrder.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Tabs, Space, Table, Tag, Drawer, Modal } from 'antd';
import { faChevronRight, faCircleCheck, faCircleUser, faCircleXmark, faClockRotateLeft, faDesktop, faPenToSquare, faScrewdriverWrench, faTrash, faTrashCan, faWallet } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from 'moment';
import { toast } from "react-toastify";
const cx = className.bind(styles);

function ListAllOrder() {

    const idUser = useSelector((state) => state.user.user.id);
    const [data, setData] = useState();
    const [listOrder, setListOrder] = useState();
    const fetchOrder = async () => {
        let getOrder = await axios.get("http://localhost:3000/order/getAllOrder");
        setListOrder(getOrder.data.data);
    }


    useEffect(() => {
        fetchOrder();
    }, [])

    const overView = () => {
        let awaitCount = 0;
        let successCount = 0;
        let cancelCount = 0;

        listOrder?.forEach((order) => {
            if (order.status === 'W') {
                awaitCount++;
            } else if (order.status === 'S') {
                successCount++;
            } else {
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
            title: 'TỔNG ĐƠN',
            number: `${listOrder?.length}`,
            icon: faScrewdriverWrench,
            color: 'blue',
        },
        {
            title: 'HOÀN THÀNH',
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
            title: 'ĐÃ HỦY',
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



    const columns = [
        {
            title: 'STT',
            dataIndex: 'key',
            key: 'id',
            width: 60,
            render: (text, record, index) => <a>{index + 1}</a>,
        },
        {
            title: 'Họ tên',
            dataIndex: 'fullName',
            key: 'fullName',
            fixed: 'left',
        },

        {
            title: 'Dịch vụ',
            dataIndex: 'Categori',
            key: 'nameService',
            render: (_, { Categori, index }) => {
                return (
                    <div key={index + 1} >
                        {Categori.Service.nameService}
                    </div>
                )
            }
        },
        {
            title: 'Loại thiết bị',
            dataIndex: "Categori",
            key: 'nameCategories',
            render: (_, { Categori, index }) => {
                return (
                    <div key={index + 1}>
                        {Categori.nameCategories}
                    </div>
                )
            }
        },
        {
            title: 'Ngày đăng ký',
            dataIndex: 'createdAt',
            key: 'createdAt',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => {
                const dateA = new Date(a.createdAt);
                const dateB = new Date(b.createdAt);

                return dateA - dateB;
            },
            render: (_, { createdAt, index }) => {
                return (
                    <div key={index + 1}>
                        {moment(createdAt).format('DD/MM/YYYY')}
                    </div>
                )
            }
        },
        {
            title: 'Ngày mong muốn',
            dataIndex: 'desireDate',
            key: 'desireDate',
            defaultSortOrder: 'descend',
            sorter: (a, b) => {
                const dateA = new Date(a.desireDate);
                const dateB = new Date(b.desireDate);

                return dateA - dateB;
            },
            render: (_, { desireDate, index }) => {
                return (
                    <div key={index + 1}>
                        {moment(desireDate).format('DD/MM/YYYY')}
                    </div>
                )
            }
        },
        {
            title: 'Trạng thái',
            key: 'status',
            dataIndex: 'status',
            filters: [
                {
                    text: 'Đang chờ',
                    value: 'W'
                },
                {
                    text: 'Đã duyệt',
                    value: 'A'
                },
                {
                    text: 'Đang sửa',
                    value: 'R'
                },
                {
                    text: 'Hoàn thành',
                    value: 'Y'
                },
                {
                    text: 'Đã hủy',
                    value: 'D'
                },

            ],
            onFilter: (value, record) => record.status.indexOf(value) === 0,
            render: (_, { status, index }) => {
                let color = status === 'C' ? 'red' : (status === 'W' ? 'yellow' : (status === 'A' ? 'green' : (status === 'R' ? 'orange' : 'blue')));
                let text = status === 'C' ? 'Đã hủy' : (status === 'W' ? 'Đang chờ' : (status === 'A' ? 'Đã duyệt' : (status === 'R' ? 'Đang sửa' : 'Hoàn thành')));

                return (
                    <Tag key={index + 1} style={{ width: "75px", textAlign: "center" }} color={color} >
                        {text}
                    </Tag>

                );
            },

        },
        {
            title: 'Thanh toán',
            key: 'paymentStatus',
            dataIndex: 'DetailOrder',
            render: (_, { DetailOrder, index }) => (
                DetailOrder?.paymentStatus === 'P' ? (
                    <div>
                        Đã thanh toán
                    </div>
                ) : (
                    DetailOrder?.paymentStatus === 'P' ? (
                        <div>
                            Chưa thanh toán
                        </div>
                    ) : (
                        <div>
                            Chưa duyệt
                        </div>
                    )
                )
            ),

        },
        {
            title: 'Phương thức',
            key: 'paymentStatus',
            dataIndex: 'DetailOrder',
            render: (_, { DetailOrder, index }) => (
                DetailOrder?.paymentMethod === 'vnpay' ? (
                    <div>
                        VNPay
                    </div>
                ) : (
                    DetailOrder?.paymentMethod === 'cash' ? (
                        <div>Tiền mặt</div>
                    ) : (
                        <div>
                            Chưa duyệt
                        </div>
                    )
                )
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record, index) => (
                <Space size="middle" key={index + 1}>
                    {(record && record?.DetailOrder && (record?.DetailOrder.paymentStatus === 'P' || record?.DetailOrder.paymentStatus === 'UP')) ? (
                        <Link to={"/admin/order/" + record?.DetailOrder.id}>
                            <p>Xem chi tiết</p>
                        </Link>
                    ) : (
                        <>
                            <Link to={`/repair/accept/${record?.id}`}>
                                <FontAwesomeIcon icon={faCircleCheck} className={`${cx("iconAccept")} ${(record?.status === 'W') ? '' : 'd-none'}`} size="xl" style={{ color: "#00a851", }} />
                            </Link>
                            <FontAwesomeIcon icon={faCircleXmark} onClick={() => showModal(record)}
                                className={`${cx("iconDenied")} ${record?.status === 'W' ? '' : 'd-none'}`} size="xl" style={{ color: "#e00000", }} />
                            <FontAwesomeIcon icon={faChevronRight} size="lg" style={{ color: "#005eff", marginLeft: "10px" }} onClick={() => showDrawer(record)} />
                        </>
                    )}
                </Space>
            ),
        },
    ];

    const [open, setOpen] = useState(false);
    const [record, setRecord] = useState();
    const showDrawer = (record) => {
        setOpen(true);
        setRecord(record);
    };
    const onClose = () => {
        setOpen(false);
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataModal, setDataModal] = useState();
    const showModal = (data) => {
        setIsModalOpen(true);
        setDataModal(data);

    };
    const handleOk = (id) => {
        axios.put("http://localhost:3000/order/denied/" + id)
            .then(res => {
                if (res.data.data.success === false) {
                    toast.error(res.data.data.message)
                } else {
                    toast.success(res.data.data.message);
                    fetchOrder();
                    setIsModalOpen(false);
                }
            })
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const [pagination, setPagination] = useState({});

    function handleTableChange(data) {
        setPagination(data);
    }


    return (
        <div className={cx("containerPage")}>
            <div className="titlePage">
                <h4>Danh sách đơn sửa chữa</h4>
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
            <div className="contentPage">
                {/* <Table className="mt-4" columns={columns} dataSource={data} /> */}
                <Table className="mt-4" columns={columns} dataSource={listOrder}
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
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <div className="form-floating mb-3" >
                                    <input
                                        type="text"
                                        className={`${cx("inputForm")} form-control`}
                                        id="floatingInput"
                                        placeholder="name@example.com"
                                        readOnly defaultValue={moment(record?.desireDate).format("DD/MM/YYYY")} onChange={() => { }}
                                    />

                                    <label htmlFor="floatingInput">Thời gian mong muốn</label>
                                </div>

                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12">
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
                    </div>
                    <div className={cx("statusOrder")}>
                        <span>Trạng thái:</span>
                        <div className={`${cx("status")} ${record && record?.status === 'W' ? 'text-warning border-warning' :
                            (record?.status === 'A' ? 'text-success border-success' :
                                (record?.status === 'R' ? 'text-warning text-opacity-50 border-warning-subtle' :
                                    (record?.status === 'S' ? 'text-primary border-primary' : 'text-danger border-danger')))}`}>
                            {record && record?.status === 'W' ? 'Đang chờ' : (record?.status == 'A' ? 'Đã duyệt' : (record?.status === 'R' ? 'Đang sửa' : (record?.status === 'S' ? 'Hoàn thành' : 'Đã hủy')))}
                        </div>
                    </div>
                </div>
            </Drawer>
            <Modal title="Xóa đơn sửa chữa" okText="Từ chối" cancelText="Đóng" okButtonProps={{ style: { background: "red" } }} open={isModalOpen} onOk={() => handleOk(dataModal?.id)} onCancel={handleCancel}>
                <p>Bạn có chắc chắn muốn từ chối đơn sửa chữa {dataModal?.Categori.nameCategories}</p>
            </Modal>
        </div >
    );
}

export default ListAllOrder;