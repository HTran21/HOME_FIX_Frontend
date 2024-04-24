import styles from "./AcceptOrderRepairer.module.scss";
import classNames from 'classnames/bind';
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from '../../../service/customize_axios';
import { toast, useToast } from "react-toastify";
import { useSelector } from "react-redux";
import moment from 'moment';
const cx = classNames.bind(styles);
import { Button, TimePicker } from 'antd';

import socket from "../../../service/socketService";

const format = 'HH:mm';

function AcceptOrderRepairer() {
    // const history = useHistory();
    const navigate = useNavigate();
    const { id } = useParams();

    const [data, setData] = useState();
    const [listTimeSlot, setListTimeSlot] = useState();
    const [idSchedule, setIdSchedule] = useState()

    const getDetailOrder = async () => {
        if (id) {
            const detailOrder = await axios.get("http://localhost:3000/order/fullDetail/" + id);
            if (detailOrder.data.success) {
                // console.log(detailOrder.data.exsitDetailOrder)
                setData(detailOrder.data.exsitDetailOrder)
                console.log(detailOrder.data.exsitDetailOrder)
                setIdSchedule(detailOrder.data.exsitDetailOrder.ID_Schedule)
            }
            else {
                toast.error("Không tìm thấy đơn sửa chữa")
            }

        }
    }
    useEffect(() => {
        getDetailOrder();
    }, [])

    useEffect(() => {
        if (data && idSchedule != 0) {
            console.log("idSchedule", idSchedule)
            axios.get("http://localhost:3000/schedule/timeslot/" + idSchedule)
                .then(res => {
                    console.log("Time slot", res.data)
                    setListTimeSlot(res.data)
                })
        }

    }, [data])


    const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);

    const handleTimeSlotChange = (timeSlot) => {
        if (selectedTimeSlots.includes(timeSlot)) {
            setSelectedTimeSlots(selectedTimeSlots.filter(slot => slot !== timeSlot));
        } else {
            setSelectedTimeSlots([...selectedTimeSlots, timeSlot]);
        }
    };

    const timeSlotMorning = ['7:30-8:00', '8:00-8:30', '8:30-9:00', '9:00-9:30', '10:00-10:30', '10:30-11:00', '13:30-14:00', '14:00-14:30', '14:30-15:00', '15:00-15:30', '15:30-16:00', '16:00-16:30']
    const [loadings, setLoadings] = useState();
    const performRepair = () => {
        if (id && data) {
            if (selectedTimeSlots.length === 0) {
                toast.warn("Vui lòng chọn thời gian sửa chữa")
            }
            else {
                setLoadings(true)
                const ID_Order = data.ID_Order
                axios.put("http://localhost:3000/order/acceptRepairer/" + ID_Order, { selectedTimeSlots })
                    .then(res => {
                        if (res.data.success) {
                            toast.success("Duyệt đơn sửa chữa thành công")
                            setLoadings(false)
                            navigate("/repairer/work")
                            getDetailOrder()
                            socket.emit("orderStatusChange")
                            socket.emit("newNotification")
                        }
                        else {
                            toast.error(res.data.message)
                        }
                    })
            }

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
                                        <h6 className="">Thời gian sửa chữa</h6>
                                        <div className="col-md-6 mb-2 pb-2">
                                            <div className="form-floating mt-2">
                                                <input type="text" className={`form-control ${cx("inputForm")}`}
                                                    placeholder="name@example.com" value={moment(data?.Schedule.workDay).format('DD-MM-YYYY') || ''} onChange={() => { }}
                                                />
                                                <label htmlFor="floatingInput">Ngày sửa chữa</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-2 pb-2">
                                            <div className="form-floating">
                                                <input type="text" className={`form-control ${cx("inputForm")}`}
                                                    placeholder="name@example.com" value={data?.Schedule.Repairer.usernameRepairer || ''} onChange={() => { }}
                                                />
                                                <label htmlFor="floatingInput">Thợ sửa chữa</label>
                                            </div>
                                        </div>

                                    </div>
                                    <div className={cx("timeSlots")}>
                                        <h6 className="mb-1">Khung giờ sửa chữa</h6>
                                        {/* <label className={`${cx("timeSlot")} form-check-label`} htmlFor="timeslot1">
                                            {data?.timeRepair}
                                        </label> */}
                                        {/* <TimePicker.RangePicker
                                            style={{ width: "100%", marginTop: "5px" }}
                                            disabledTime={() => ({
                                                disabledHours: () => [7],
                                                disabledMinutes: (selectedHour) => {
                                                    if (selectedHour === 7) {
                                                        return [...Array(30).keys()].map((i) => i + 30);
                                                    } else {
                                                        return [];
                                                    }
                                                }
                                            })}
                                            size="large"
                                            onChange={onChange}
                                            format={format}
                                        /> */}
                                        {/* <TimePicker.RangePicker
                                            style={{ width: "100%", marginTop: "5px" }}

                                            size="large"
                                            onChange={onChange}
                                            format={format}
                                        /> */}
                                        <div className="timeMorning">
                                            <div className={cx("listTimeSlot")}>
                                                {timeSlotMorning.map((time, index) => (

                                                    <div key={index}>
                                                        <input
                                                            className="form-check-input d-none"
                                                            type="checkbox"
                                                            value={time}
                                                            id={`timeslot${index}`}
                                                            checked={selectedTimeSlots.includes(time)}
                                                            onChange={() => handleTimeSlotChange(time)}
                                                            disabled={listTimeSlot && listTimeSlot.includes(time)}
                                                        />
                                                        <label
                                                            className={`${cx("timeSlot", (selectedTimeSlots.includes(time)) ? 'active' : '')} form-check-label m-1`}
                                                            htmlFor={`timeslot${index}`}
                                                        >
                                                            {time}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>



                                    </div>

                                </div>

                                <div className="d-inline">

                                    <Button type="primary" loading={loadings} className="mt-3 ms-2 mb-2" onClick={() => performRepair()}>
                                        Duyệt
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

export default AcceptOrderRepairer;