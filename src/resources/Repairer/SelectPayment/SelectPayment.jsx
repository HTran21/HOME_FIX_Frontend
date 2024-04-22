import { useEffect, useState } from "react";
import styles from "./SelectPayment.module.scss";
import classNames from 'classnames/bind';
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tabs, DatePicker, Modal, Button, Drawer } from 'antd';
import { Link, useNavigate, useParams } from "react-router-dom";
import moment from 'moment';
import axios from '../../../service/customize_axios';

import { faArrowLeft, faMagnifyingGlass, faTriangleExclamation, faXmark } from "@fortawesome/free-solid-svg-icons";
const cx = classNames.bind(styles);

import { io } from "socket.io-client";

const socket = io.connect("http://localhost:3000", {
    transports: ["websocket"],
});


function SelectPayment() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [data, setData] = useState();
    const [paymentMethod, setPaymentMethod] = useState('');

    const getDetailOrder = async () => {
        if (id) {
            const detailOrder = await axios.get("http://localhost:3000/order/fullDetail/" + id);
            setData(detailOrder.data.exsitDetailOrder)
            // console.log("Data", detailOrder.data.exsitDetailOrder)

        }
    }

    useEffect(() => {
        getDetailOrder()
    }, [])

    const [loadings, setLoadings] = useState();
    const [loadingsModal, setLoadingsModal] = useState();

    const handlePaymentVNPay = (id) => {
        if (id) {
            // console.log("ID_DetailOrder", id)
            setLoadings(true)
            axios.post("http://localhost:3000/payment/confirm", { id, paymentMethod })
                .then(res => {
                    if (res.data.success) {
                        setTimeout(() => {
                            setLoadings(false)
                            toast.success(res.data.message)
                            handleCancel()
                            navigate(`/repairer/confirm/` + id)
                            // socket.emit("confirm_payment", { id, message: "Đã xác nhận thanh toán thành công" })
                            socket.emit("orderStatusChange")
                        }, 1500)

                    }
                    else {
                        toast.error(res.data.message)
                    }
                })

        }
    }

    const handlePaymentCash = () => {
        showModal()
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleOk = (id) => {
        if (id) {
            console.log("ID_DetailOrder", id)
            setLoadingsModal(true)
            axios.post("http://localhost:3000/payment/confirm", { id, paymentMethod })
                .then(res => {
                    if (res.data.success) {
                        setTimeout(() => {
                            setLoadingsModal(false)
                            toast.success(res.data.message)
                            handleCancel()
                            navigate(`/repairer/confirm/` + id)
                            // socket.emit("confirm_payment", { id, message: "Đã xác nhận thanh toán thành công" })
                            socket.emit("orderStatusChange")
                        }, 2000)

                    }
                    else {
                        toast.error(res.data.message)
                    }
                })

        }
    };


    return (
        <>
            <div className="container">
                <div className={cx("titlePage")}>
                    <div className={cx("iconBack")} onClick={() => navigate(-1)}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </div>
                    <p className={cx("textTitle")}>Phương thức thanh toán</p>
                </div>
                <div className="contentPage">
                    <div className="listTask mt-3 mb-2">
                        <div className={cx("payment")}>
                            <div>
                                <input className="form-check-input d-none" type="radio" value={"vnpay"}
                                    onChange={(e) => setPaymentMethod(e.target.value)} name="payment" id="paymentVNPay" />
                                <label className={cx("contentPayment", `${paymentMethod === 'vnpay' ? 'active' : ''}`)} htmlFor="paymentVNPay">
                                    <img src="../../icon/iconVNPay.png" className={cx("imagePayment")} alt="" />
                                    <p>VNPay</p>
                                </label>
                            </div>
                        </div>
                        <div className={cx("payment")} >
                            <div>
                                <input className="form-check-input d-none" type="radio" value={"cash"}
                                    onChange={(e) => setPaymentMethod(e.target.value)} name="payment" id="paymentCash" />
                                <label className={cx("contentPayment", `${paymentMethod === 'cash' ? 'active' : ''}`)} htmlFor="paymentCash">
                                    <img src="../../icon/money.png" className={cx("imagePayment")} alt="" />
                                    <p>Tiền mặt</p>
                                </label>
                            </div>
                        </div>
                    </div>


                    <div className={cx("backHome")}>
                        <Button type="primary" disabled={paymentMethod === ''} className={cx("btnSelectMethodPayment")}
                            loading={loadings} onClick={paymentMethod === 'cash' ? () => handlePaymentCash(data?.id) : () => handlePaymentVNPay(data?.id)}
                        >
                            Xác nhận
                        </Button>

                    </div>
                </div>

            </div >
            <Modal title="Xác nhận đã thanh toán" open={isModalOpen} centered onOk={() => handleOk(data?.id)} confirmLoading={loadingsModal} onCancel={handleCancel} okText="Xác nhận" cancelText="Đóng">
                <div className={cx("layoutIcon")}>
                    <FontAwesomeIcon className={cx("iconModalWarning")} icon={faTriangleExclamation} />

                </div>
                <p className="fw-bold text-center">Vui lòng xác nhận khi đã nhận tiền từ khách hàng</p>
            </Modal>
        </>
    );
}

export default SelectPayment;