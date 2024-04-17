import axios from "../../../service/customize_axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Tabs, Space, Table, Tag, Drawer, Tooltip, Button } from 'antd';

import className from "classnames/bind";
import styles from "./DetailOrder.module.scss";

const cx = className.bind(styles);
import moment from 'moment';
import Operation from "antd/es/transfer/operation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faHourglassHalf, faMoneyBill1 } from "@fortawesome/free-solid-svg-icons";

import { io } from "socket.io-client";

const socket = io.connect("http://localhost:3000", {
    transports: ["websocket"],
});

function DetailOrder() {

    const { id } = useParams();
    const [data, setData] = useState();
    const navigation = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState("");

    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    const featchData = () => {
        axios.get("http://localhost:3000/order/confirmOrder/" + id)
            .then(res => {
                if (res.data.success) {
                    setData(res.data.detailOrder)
                    // console.log(res.data.detailOrder)
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
                        {Operation.price}
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
                    }, 2000);
                } else {
                    toast.error(res.data.message)
                }
            })
    }

    useEffect(() => {
        socket.on("confirm_payment_success", () => {
            featchData();
        });
    }, [socket])

    return (
        <div className="containerPage">
            <div className="contentPage">
                <section style={{ backgroundColor: "#eee" }}>
                    <div className="container mt-2">

                        <div className="row">

                            <div className="col-lg-6">
                                <div className="card p-2">
                                    <p className={cx("titleRepair")}>ĐƠN SỬA CHỮA</p>
                                    <div className="card-body p-0 ps-2 pe-2">
                                        <div className={cx("inforUser")}>
                                            <h5 className="mb-2">Thông tin khách hàng</h5>
                                            <p><span>Họ tên: </span>{data?.Order.fullName}</p>
                                            <p><span>Email: </span>{data?.Order.email}</p>
                                            <p><span>Số điện thoại: </span>{data?.Order.phone}</p>
                                            <p><span>Địa chỉ: </span>{data?.Order.address}</p>

                                        </div>
                                        <div className={cx("inforRepair")}>
                                            <h5 className="mb-2">Thông tin sửa chữa</h5>
                                            <p><span>Dịch vụ: </span>{data?.Order.Categori.Service.nameService}</p>
                                            <p><span>Hãng: </span>{data?.Order.Product && data?.Order.Product.Brand.nameBrand}</p>
                                            <p><span>Loại thiết bị: </span>{data?.Order.Categori.nameCategories}</p>
                                            <p><span>Thiết bị: </span>{data?.Order.Product && data?.Order.Product.nameProduct}</p>
                                            <p><span>Ngày sửa: </span>{moment(data?.Schedule.workDay).format("DD/MM/YYYY")}</p>
                                            <p><span>Thời gian sửa: </span>{data?.timeRepair}</p>
                                        </div>
                                        <div className={cx("inforRepair")}>
                                            <h5 className="mb-2">Thông tin thợ</h5>
                                            <p><span>Họ tên thợ: </span>{data?.Schedule.Repairer.usernameRepairer}</p>
                                            <p><span>Số điện thoại: </span>{data?.Schedule.Repairer.phoneRepairer}</p>
                                            <p><span>Email: </span>{data?.Schedule.Repairer.emailRepairer}</p>

                                        </div>
                                        <div className={cx("statusOrder")}>

                                            <span>Trạng thái:</span> <div className={`${cx("status")} ${data?.Order.status == 'W' ? 'text-warning border-warning' :
                                                (data?.Order.status == 'A' ? 'text-success border-success' : (data?.Order.status === 'R' ? 'text-warning text-opacity-50 border-warning-subtle' : (data?.Order.status === 'S' ? 'text-primary border-primary' : 'text-danger border-danger')))}`}>
                                                {data?.Order.status === 'W' ? 'Đang chờ' : (data?.Order.status == 'A' ? 'Đã duyệt' : (data?.Order.status === 'R' ? 'Đang sửa' : (data?.Order.status === 'S' ? 'Hoàn thành' : 'Đã hủy')))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="col-lg-6">
                                <div className="card mb-4">
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
                                <div className="card p-0">
                                    <div className="card-body" >
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

                                                            <div className="form-check m-0">
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
                                                            </div>
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

                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default DetailOrder;