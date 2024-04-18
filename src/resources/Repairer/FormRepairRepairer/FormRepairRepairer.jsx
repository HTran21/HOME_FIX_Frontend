import styles from "./FormRepairRepairer.module.scss";
import classNames from 'classnames/bind';
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from '../../../service/customize_axios';
import { toast, useToast } from "react-toastify";
import { useSelector } from "react-redux";
import moment from 'moment';
const cx = classNames.bind(styles);
import { Button, Flex } from 'antd';

import { io } from "socket.io-client";

const socket = io.connect("http://localhost:3000", {
    transports: ["websocket"],
});


function FormRepairRepairer() {
    // const history = useHistory();
    const navigate = useNavigate();
    const { id } = useParams();

    const [data, setData] = useState();

    const getDetailOrder = async () => {
        if (id) {
            const detailOrder = await axios.get("http://localhost:3000/order/fullDetail/" + id);
            if (detailOrder.data.success) {
                // console.log(detailOrder.data.exsitDetailOrder)
                setData(detailOrder.data.exsitDetailOrder)
            }
            else {
                toast.error("Không tìm thấy đơn sửa chữa")
            }

        }
    }
    useEffect(() => {
        getDetailOrder();
    }, [])

    const performRepair = () => {
        if (id && data) {
            const ID_Order = data.ID_Order
            axios.put("http://localhost:3000/order/updateStatusOrder/" + ID_Order, { status: 'R' })
                .then(res => {
                    if (res.data.success) {
                        toast.success("Tiến hành sửa chữa")
                        navigate("/repairer/task/" + id)
                        socket.emit("orderStatusChange")
                    }
                    else {
                        toast.error(res.data.message)
                    }
                })
        }
    }


    return (
        <>
            <section className="vh-100 gradient-custom">
                <div className="container h-100">
                    <div className="row justify-content-center h-100">
                        <div className="col-12 col-lg-9 col-xl-7">
                            <div
                                className=" shadow-2-strong card-registration"
                            // style={{ borderRadius: 15 }}
                            >
                                <div className="card-body p-3 p-md-4">
                                    <div className={cx("titleForm")}>
                                        <h3 className={cx("titleRepair")}>ĐƠN SỬA CHỮA</h3>

                                    </div>
                                    <div className="row">
                                        <h6 className="mb-2">Thông tin khác hàng</h6>
                                        <div className="col-md-6 mb-3">
                                            <div className="form-floating">
                                                <input type="text" className={`form-control ${cx("inputForm")}`} placeholder="name@example.com"
                                                    value={data?.Order.fullName || ''} onChange={() => { }} readOnly />
                                                <label htmlFor="floatingInput">Họ và tên</label>


                                            </div>
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <div className="form-floating">
                                                <input type="text" className={`form-control `} placeholder="name@example.com"
                                                    value={data?.Order.address || ''} onChange={() => { }} readOnly />
                                                <label htmlFor="floatingInput">Địa chỉ</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <div className="form-floating">
                                                <input type="text" className={`form-control ${cx("inputForm")}`} placeholder="name@example.com"
                                                    value={data?.Order.phone || ''} onChange={() => { }} readOnly />
                                                <label htmlFor="floatingInput">Số điện thoại</label>

                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <div className="form-floating">
                                                <input type="text" className={`form-control ${cx("inputForm")}`} placeholder="name@example.com"
                                                    value={data?.Order.email || ''} onChange={() => { }} readOnly />
                                                <label htmlFor="floatingInput">Email</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <h6 className="mb-2">Dịch vụ mong muốn</h6>
                                        <div className="col-md-6 mb-3">
                                            <div className="form-floating">
                                                <input type="text" className={`form-control ${cx("inputForm")}`} placeholder="name@example.com"
                                                    value={data?.Order.Categori.Service.nameService || ''} onChange={() => { }} />
                                                <label htmlFor="floatingInput">Dịch vụ</label>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="row">
                                        <h6 className="mb-2">Thông tin thiết bị</h6>
                                        <div className="col-md-6 mb-3">
                                            <div className="form-floating">
                                                <input type="text" className={`form-control ${cx("inputForm")} `} placeholder="name@example.com"
                                                    value={data?.Order.ID_Product && data?.Order.Product.Brand.nameBrand || ''} onChange={() => { }} readOnly />
                                                <label htmlFor="floatingInput">Nhãn hàng</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <div className="form-floating">
                                                <input type="text" className={`form-control ${cx("inputForm")}`} placeholder="name@example.com"
                                                    value={data?.Order.Categori.nameCategories || ''} onChange={() => { }} readOnly />
                                                <label htmlFor="floatingInput">Loại thiết bị</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <div className="form-floating">
                                                <input type="text" className={`form-control ${cx("inputForm")} `} placeholder="name@example.com"
                                                    value={data?.Order.ID_Product && data?.Order.Product.nameProduct || ''} onChange={() => { }} readOnly />
                                                <label htmlFor="floatingInput">Thiết bị</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <div className="form-floating">
                                                <textarea className={`form-control ${cx("inputForm")}`} placeholder="Leave a comment here" id="floatingTextarea2"
                                                    value={data?.Order.desProblem || ''} onChange={(e) => { }} readOnly></textarea>
                                                <label htmlFor="floatingTextarea2">Mô tả lỗi</label>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="row">
                                        <h6 className="mb-1">Thời gian sửa chữa</h6>
                                        <div className="col-md-6 mb-3 pb-2">
                                            <div className="form-floating mt-2">
                                                <input type="text" className={`form-control ${cx("inputForm")}`}
                                                    placeholder="name@example.com" value={moment(data?.Schedule.workDay).format('DD-MM-YYYY') || ''} onChange={() => { }}
                                                />
                                                <label htmlFor="floatingInput">Ngày sửa chữa</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-3 pb-2">
                                            <div className="form-floating mt-2">
                                                <input type="text" className={`form-control ${cx("inputForm")}`}
                                                    placeholder="name@example.com" value={data?.Schedule.Repairer.usernameRepairer || ''} onChange={() => { }}
                                                />
                                                <label htmlFor="floatingInput">Thợ sửa chữa</label>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="timeSlots">
                                        <h6 className="mb-1">Khung giờ sửa chữa</h6>
                                        <label className={`${cx("timeSlot")} form-check-label`} htmlFor="timeslot1">
                                            {data?.timeRepair}
                                        </label>


                                    </div>

                                </div>

                                <div className="d-inline">

                                    <Button type="primary" className="mt-3 ms-2 mb-2" onClick={() => performRepair()}>
                                        Tiến hành
                                    </Button>
                                    <Button className="ms-2">
                                        <Link className="text-decoration-none" onClick={() => navigate(-1)}>Đóng</Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </section >

        </>
    );
}

export default FormRepairRepairer;