import axios from "../../../service/customize_axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Tabs, Space, Table, Tag, Drawer, Tooltip, Button, Descriptions, Badge, Modal, Select, DatePicker } from 'antd';

import className from "classnames/bind";
import styles from "./DetailOrder.module.scss";

const cx = className.bind(styles);
import moment from 'moment';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCloudArrowDown, faFilePdf, faHourglassHalf, faMessage, faMoneyBill1, faPrint } from "@fortawesome/free-solid-svg-icons";

import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import ComponentPDF from "../../../components/PDF/ComponentPDF";
import { PDFViewer } from "@react-pdf/renderer";

const socket = io.connect("http://localhost:3000", {
    transports: ["websocket"],
});


function DetailOrder() {

    const { id } = useParams();
    const [data, setData] = useState();
    const navigation = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState("");
    const user = useSelector((state) => state.user.user);

    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    const featchData = () => {
        axios.get("http://localhost:3000/order/confirmOrder/" + id)
            .then(res => {
                if (res.data.success) {
                    setData(res.data.detailOrder)
                    console.log(res.data.detailOrder)
                }
                else {
                    toast.error(res.data.message)
                }
            })
    }

    useEffect(() => {
        featchData()
    }, [])

    const columns = [
        {
            title: 'STT',
            dataIndex: 'key',
            key: 'id',
            render: (text, record, index) => <a>{index + 1}</a>,
        },
        {
            title: 'Loại thiết bị',
            dataIndex: 'Operation',
            key: 'nameCategories',
            render: (_, { Operation, index }) => {
                return (
                    <div key={index + 1} >
                        {Operation.Categori.nameCategories}
                    </div>
                )
            }
        },
        {
            title: 'Tên thao tác',
            dataIndex: 'Operation',
            key: 'nameOperation',
            render: (_, { Operation, index }) => {
                return (
                    <div key={index + 1} >
                        {Operation.nameOperation}
                    </div>
                )
            }
        },
        {
            title: 'Giá thao tác',
            dataIndex: "Operation",
            key: 'price',
            render: (_, { Operation, index }) => {
                return (
                    <div key={index + 1}>
                        {VND.format(Operation.price)}
                    </div>
                )
            }
        },



    ];

    const [pagination, setPagination] = useState({});

    const [loadings, setLoadings] = useState(false);

    function handleTableChange() {
        setPagination(data);
    }

    const paymentCash = (id) => {
        setLoadings(true);
        axios.post("http://localhost:3000/payment/cash", { ID_DetailOrder: id, paymentMethod: paymentMethod })
            .then(res => {
                if (res.data.success) {
                    setTimeout(() => {
                        setLoadings(false)
                        window.location.reload();
                        toast.success(res.data.message);
                    }, 2000)
                }
                else {
                    toast.error(res.data.message)
                }
            })
    }

    const paymentVNPay = (id) => {
        setLoadings(true);

        axios.post("http://localhost:3000/payment/vnpay/create_payment_url", { ID_DetailOrder: id, paymentMethod: paymentMethod })
            .then(res => {
                if (res.data.success) {
                    setTimeout(() => {
                        setLoadings(false);
                        window.location.href = res.data.data.url;
                        featchData()
                    }, 2000);
                } else {
                    toast.error(res.data.message)
                }
            })
    }

    useEffect(() => {
        socket.on("confirm_payment_success", (data) => {
            toast.success(data)
            console.log("Data nhan tu socket")
            featchData();
        });
        socket.on("featchOrder", () => {
            featchData();
        });
    }, [socket])


    const items = [

        {
            key: '0',
            label: <p className="m-0 fw-bold">Dịch vụ</p>,
            children: <p className="m-0">{data?.Order.Categori.Service.nameService}</p>,
            span: 3,
        },
        {
            key: '1',
            label: <p className="m-0 fw-bold">Hãng</p>,
            children: <p className="m-0">{data?.Order.Product && data?.Order.Product.Brand.nameBrand}</p>,
            span: 3,
        },
        {
            key: '2',
            label: <p className="m-0 fw-bold">Loại thiết bị</p>,
            children: <p className="m-0">{data?.Order.Categori.nameCategories}</p>,
            span: 3,
        },
        {
            key: '3',
            label: <p className="m-0 fw-bold">Thiết bị</p>,
            children: <p className="m-0">{data?.Order.Product && data?.Order.Product.nameProduct}</p>,
            span: 3,
        },
        {
            key: '4',
            label: <p className="m-0 fw-bold">Ngày sửa chữa</p>,
            children: <p className="m-0">{moment(data?.Schedule.workDay).format("DD/MM/YYYY")}</p>,
            span: 2,
        },
        {
            key: '5',
            label: <p className="m-0 fw-bold">Thời gian</p>,
            children: <p className="m-0">{data?.timeRepair.split("-")[0]}</p>,
        },
        {
            key: '6',
            label: <p className="m-0 fw-bold">Trạng thái</p>,
            children: <Badge status={`${data?.Order.status == 'A' ? 'processing' : (data?.Order.status === 'R' ? 'warning' : (data?.Order.status === 'S' ? 'success' : 'error'))}`}
                text={`${data?.Order.status == 'A' ? 'Đã duyệt' : (data?.Order.status === 'R' ? 'Đang sửa' : (data?.Order.status === 'S' ? 'Hoàn thành' : 'Hủy bỏ'))}`} />,
            span: 3,
        },
    ]

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dateChange, setDateChange] = useState();
    const [contentFeedback, setContentFeedback] = useState('');
    const [feedbackType, setFeedbackType] = useState('');
    const [errors, setErrors] = useState({})
    const onChange = (date, dateString) => {
        // console.log(date, dateString);
        setDateChange(dateString);
    };

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        const newErrors = {};

        if (feedbackType.trim() === '') {
            newErrors.feedbackType = 'Vui lòng chọn kiểu phản hồi'
        }

        if (feedbackType !== 'cancel_repair_order') {
            if (!dateChange) {
                newErrors.dateChange = 'Vui lòng chọn ngày thay đổi'
            }
        }

        if (contentFeedback.trim() === '') {
            newErrors.contentFeedback = 'Vui lòng nhập lý do phản hồi'
        }

        if (Object.keys(newErrors).length === 0) {
            setErrors();
            if (user && data) {
                let role = user.role;
                let ID_Order = data.ID_Order
                // setIsModalOpen(false);
                axios.post("http://localhost:3000/feedback", { ID_Order, role, feedbackType, contentFeedback, dateChange })
                    .then(res => {
                        if (res.data.success) {
                            toast.success(res.data.message)
                            console.log(res.data)
                            handleCancel()
                            socket.emit("newNotification")
                        } else {
                            toast.error(res.data.message)
                        }
                    })
                // console.log("contentFeedBack", contentFeedback)
                // console.log("dateChange", dateChange)
                // console.log("role", role)
                // console.log("ID_Order", ID_Order)
            }
        } else {
            setErrors(newErrors)
        }


    };
    const handleCancel = () => {
        setIsModalOpen(false);
        setFeedbackType('');
        setDateChange(null);
        setContentFeedback('');
    };

    const [isModalPDF, setIsMoDalPDF] = useState(false);

    const handlePDf = (data) => {
        console.log("Data Modal", data)
        setIsMoDalPDF(true)


    }

    const handleCancelPDF = () => {
        setIsMoDalPDF(false)
    }

    return (
        <>
            <div className="containerPage">
                <div className="contentPage">
                    <section>
                        <div className="container mt-2">
                            <div className="row">

                                <div className="col-lg-6">
                                    <div className="card p-2 border-0">
                                        <div className={cx("titleRepair")}>
                                            <div className={cx("logo")}>
                                                <img src="../../image/logo/logo8.png" alt="" />
                                                <p>HOMEFIX</p>
                                            </div>
                                            <p>ĐƠN SỬA CHỮA</p>
                                        </div>
                                        <hr className="m-2 opacity-100" />
                                        <div className="card-body p-0 ps-2 pe-2">
                                            <div className="row">
                                                <div className={`${cx("inforUser")} col-6`}>
                                                    <h5 className="mb-2">Thông tin khách hàng</h5>
                                                    <p><span>ID Đơn sửa chữa: </span> {data?.Order.id}</p>
                                                    <p><span>Họ tên: </span>{data?.Order.fullName}</p>
                                                    <p><span>Email: </span>{data?.Order.email}</p>
                                                    <p><span>Số điện thoại: </span>{data?.Order.phone}</p>
                                                    <p><span>Địa chỉ: </span>{data?.Order.address}</p>

                                                </div>
                                                <div className={`${cx("inforRepair")} col-6`}>
                                                    <h5 className="mb-2">Thông tin thợ</h5>
                                                    <p><span className="fw-bold">Họ tên thợ: </span>{data?.Schedule.Repairer.usernameRepairer}</p>
                                                    <p><span className="fw-bold">Số điện thoại: </span>{data?.Schedule.Repairer.phoneRepairer}</p>
                                                    <p><span className="fw-bold">Email: </span>{data?.Schedule.Repairer.emailRepairer}</p>

                                                </div>

                                            </div>

                                            <hr className="m-2 opacity-100" />


                                            <div className={`${cx("inforRepair")}`}>
                                                <div className={cx("titleInforRepair")}>
                                                    <h5>Thông tin sửa chữa</h5>
                                                    <p className="fw-bold">Ngày đăng ký: {moment(data?.Order.createdAt).format('DD/MM/YYYY')}</p>
                                                </div>
                                                <Descriptions bordered items={items} />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="col-lg-6">
                                    <div className="card mb-4 border-0">
                                        <div className="card-body" style={{ minHeight: "345px" }}>
                                            <h6 className="mb-2">Các thao tác đã thực hiện</h6>
                                            <Table columns={columns} dataSource={data?.TaskRepairs} pagination={{
                                                defaultPageSize: 3,
                                                showSizeChanger: true,
                                                pageSizeOptions: ['3']
                                            }}
                                                onChange={handleTableChange} rowKey={"id"} />
                                        </div>
                                    </div>
                                    <div className={`${data?.Order.status === 'A' ? 'd-none' : ''} card border-0 mb-3`}>
                                        <div className="card-body mb-3" >
                                            <p className={cx("totalAmout")}>Tổng thành tiền: {VND.format(data?.totalAmount)}</p>
                                            {data?.paymentStatus === 'P' ?
                                                (
                                                    <div>
                                                        <p className={cx("paymentMethod")}>Phương thức thanh toán: {data?.paymentMethod === 'cash' ? 'Tiền mặt' : 'VNPay'}</p>
                                                        <div className={cx("paymentSuccess")}>
                                                            <div className={cx("layoutIcon")}>
                                                                <FontAwesomeIcon className={cx("iconSuccess")} icon={faCheck} />
                                                            </div>
                                                            <h5>Thanh toán thành công</h5>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    data?.paymentStatus === 'W' ? (
                                                        <div>
                                                            <p className={cx("paymentMethod")}>Phương thức thanh toán: {data?.paymentMethod === 'cash' ? 'Tiền mặt' : 'VNPay'}</p>
                                                            <div className={cx("waitConfirm")}>
                                                                <div className={cx("layoutIcon")}>
                                                                    <FontAwesomeIcon className={cx("iconWait")} icon={faHourglassHalf} />
                                                                </div>
                                                                <h5>Vui lòng chờ xác nhận</h5>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <p className={cx("titlePay")}>Chọn phương thức thanh toán</p>

                                                            <div className={cx("selectGroup")}>

                                                                {/* <div className="form-check m-0">
                                                                <input
                                                                    className="form-check-input d-none"
                                                                    type="radio"
                                                                    name="flexRadioDefault"
                                                                    id="cashMethod"
                                                                    value={"cash"}
                                                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                                                />
                                                                <label className={`${cx("selectPayMethoid", `${paymentMethod === 'cash' ? 'active' : ''}`)} form-check-label`} htmlFor="cashMethod">
                                                                    <FontAwesomeIcon className={cx("iconPay")} icon={faMoneyBill1} />Tiền mặt
                                                                </label>
                                                            </div> */}
                                                                <div className="form-check m-0">
                                                                    <input
                                                                        className="form-check-input d-none"
                                                                        type="radio"
                                                                        name="flexRadioDefault"
                                                                        id="vnpayMethod"
                                                                        value={"vnpay"}
                                                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                                                    />
                                                                    <label className={`${cx("selectPayMethoid", `${paymentMethod === 'vnpay' ? 'active' : ''}`)} form-check-label`} htmlFor="vnpayMethod">
                                                                        <img src="../../icon/iconVNPay.png" className={cx("imageVNPay")} alt="" /> VNPay
                                                                    </label>
                                                                </div>

                                                            </div>
                                                            <Button type="primary" className={cx("btnPay")} loading={loadings} onClick={paymentMethod === 'cash' ? () => paymentCash(data?.id) : () => paymentVNPay(data?.id)} disabled={paymentMethod.trim() === "" ? true : false}>Thanh Toán</Button>
                                                        </>
                                                    )
                                                )}

                                        </div>
                                    </div>
                                    <div className={cx("actionBill")}  >
                                        <div onClick={() => handlePDf(data)} className={cx("btnSaveBill")} >

                                            <FontAwesomeIcon icon={faFilePdf} />
                                            <p>Xuất file PDF</p>

                                        </div>
                                        {/* <div className={cx("btnPrintBill")}>
                                            <FontAwesomeIcon icon={faPrint} />
                                            <p>In ra</p>
                                        </div> */}

                                    </div>

                                </div>
                            </div>
                        </div>
                    </section>
                    <Tooltip placement="top" title={"Phản hồi"} onClick={showModal}>
                        <div className={cx("btnFeedback")}>
                            <FontAwesomeIcon size="lg" icon={faMessage} />
                        </div>
                    </Tooltip>
                </div>
            </div>
            <Modal title="Phản hồi về đơn sửa chữa" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText="Gửi" cancelText="Đóng">
                <div className="mb-3">
                    <Select
                        value={feedbackType}
                        style={{ width: "100%", height: "45px" }}
                        onChange={(value) => setFeedbackType(value)}
                        options={[
                            {
                                value: '',
                                label: 'Chọn loại phản hồi',
                            },
                            {
                                value: 'change_date_repair',
                                label: 'Thay đổi ngày sửa chữa',
                            },

                            {
                                value: 'cancel_repair_order',
                                label: 'Hủy đơn sửa chữa',
                            },
                        ]}
                    />
                    {errors && <p className="text-danger ms-2">{errors.feedbackType}</p>}
                </div>
                <div className="mb-3">
                    <DatePicker defaultValue={null} disabled={feedbackType === 'cancel_repair_order' ? true : false} style={{ width: "100%", padding: "10px" }} disabledDate={(current) => current.isBefore(moment().add(0, 'day'))} onChange={onChange} placeholder="Chọn ngày sửa chữa mới" />
                    {errors && <p className="text-danger ms-2">{errors.dateChange}</p>}
                </div>
                <div className="form-floating mt-3">
                    <textarea
                        className="form-control"
                        placeholder="Leave a comment here"
                        id="floatingTextarea2"
                        style={{ height: 100 }}
                        value={contentFeedback} onChange={(e) => setContentFeedback(e.target.value)}
                    />
                    <label htmlFor="floatingTextarea2">Lý do</label>
                    {errors && <p className="text-danger ms-2">{errors.contentFeedback}</p>}
                </div>
                <div className={`${feedbackType && feedbackType === 'cancel_repair_order' ? '' : 'd-none'} policyCancelOrder mt-2`}>
                    <h6>Chính sách hủy đơn:</h6>
                    <p><span className="fw-bold">Thời gian hủy:</span> Đơn sửa chữa có thể được hủy trước 24 giờ ngày hẹn hoặc quá ngày sửa chữa</p>
                    <p className="m-0"><span className="fw-bold">Phí hủy đơn:</span> Khách hàng sẽ không phải trả bất kì khoảng phí nào nếu hủy đơn trước 24 giờ ngày hẹn</p>
                </div>
                <div className={`${feedbackType && feedbackType === 'change_date_repair' ? '' : 'd-none'} policyCancelOrder mt-2`}>
                    <h6>Chính sách đổi ngày sửa chữa:</h6>
                    <p><span className="fw-bold">Thời gian thay đổi:</span> Đơn sửa chữa có thể được thay đổi trước 24 giờ ngày hẹn hoặc quá ngày sửa chữa</p>
                    <p className="m-0"><span className="fw-bold">Phí hủy đơn:</span> Khách hàng sẽ không phải trả bất kì khoảng phí nào nếu thay đổi đơn trước 24 giờ ngày hẹn</p>
                </div>


            </Modal>
            <Modal footer={null} style={{ top: 5 }} width={1200} open={isModalPDF} onOk={() => handlePDf(data)} onCancel={handleCancelPDF} okText="Gửi" cancelText="Đóng">
                <div className="p-3">
                    <PDFViewer style={{ width: "100%", height: "100vh" }}>
                        <ComponentPDF data={data} />
                    </PDFViewer>
                </div>
            </Modal>
        </>
    );
}

export default DetailOrder;