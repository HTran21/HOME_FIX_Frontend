import styles from "./AcceptOrderRepairer.module.scss";
import classNames from 'classnames/bind';
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from '../../../service/customize_axios';
import { toast, useToast } from "react-toastify";
import { useSelector } from "react-redux";
import moment from 'moment';
const cx = classNames.bind(styles);
import { Button, TimePicker, Modal, DatePicker, Select } from 'antd';

import socket from "../../../service/socketService";

const format = 'HH:mm';

function AcceptOrderRepairer() {
    // const history = useHistory();
    const navigate = useNavigate();
    const { id } = useParams();
    const user = useSelector((state) => state.user.user);

    const [data, setData] = useState();
    const [listTimeSlot, setListTimeSlot] = useState("");
    const [idSchedule, setIdSchedule] = useState()

    const getDetailOrder = async () => {
        if (id) {
            const detailOrder = await axios.get("http://localhost:3000/order/fullDetail/" + id);
            if (detailOrder.data.success) {
                // console.log(detailOrder.data.exsitDetailOrder)
                setData(detailOrder.data.exsitDetailOrder)
                // console.log(detailOrder.data.exsitDetailOrder)
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
            // console.log("idSchedule", idSchedule)
            axios.get("http://localhost:3000/schedule/timeslot/" + idSchedule)
                .then(res => {
                    // console.log("Time slot", res.data)
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

        if (feedbackType !== 'cancle_repair_order') {
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

                                <div className="d-flex flex-row mb-2 ">

                                    <Button type="primary" loading={loadings} className=" ms-3" onClick={() => performRepair()}>
                                        Duyệt
                                    </Button>
                                    <Button className=" ms-2">
                                        <Link className="text-decoration-none" onClick={() => navigate(-1)}>Đóng</Link>
                                    </Button>
                                    <Button className="ms-auto me-3" onClick={showModal}>
                                        Phản hồi
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </section >
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
                                value: 'cancle_repair_order',
                                label: 'Hủy đơn sửa chữa',
                            },
                        ]}
                    />
                    {errors && <p className="text-danger ms-2">{errors.feedbackType}</p>}
                </div>
                <div className="mb-3">
                    <DatePicker defaultValue={null} disabled={feedbackType === 'cancle_repair_order' ? true : false} style={{ width: "100%", padding: "10px" }} disabledDate={(current) => current.isBefore(moment().add(0, 'day'))} onChange={onChange} placeholder="Chọn ngày sửa chữa mới" />
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


            </Modal>
        </>
    );
}

export default AcceptOrderRepairer;