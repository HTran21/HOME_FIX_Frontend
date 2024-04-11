import styles from "./AcceptForm.module.scss";
import classNames from 'classnames/bind';
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from '../../../service/customize_axios';
import { toast, useToast } from "react-toastify";
import { useSelector } from "react-redux";
import moment from 'moment';
const cx = classNames.bind(styles);
import { Button, Flex } from 'antd';

function AcceptForm() {
    // const history = useHistory();
    const navigate = useNavigate();
    const { id } = useParams();

    const [nameService, setNameService] = useState();
    const [fullName, setFullName] = useState();
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [desRepair, setDesRepair] = useState('');
    const [dateRepair, setDateRepair] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [product, setProduct] = useState('');
    const [idService, setIdService] = useState();
    const [selectDay, setSelectDay] = useState('');
    const [listRepairer, setListRepairer] = useState();
    const [timeslot, setTimeslot] = useState('');
    const [idSchedule, setIdSchedule] = useState();
    const [listTimeSlot, setListTimeSlot] = useState();
    // const [idRepairer, setIdRepairer] = useState();
    const [errors, setErrors] = useState({});

    const getDetailOrder = async () => {
        if (id) {
            const detailOrder = await axios.get("http://localhost:3000/order/detail/" + id);
            setFullName(detailOrder.data.data.data.fullName)
            // console.log("data", detailOrder.data.data.data)
            setAddress(detailOrder.data.data.data.address)
            setPhone(detailOrder.data.data.data.phone)
            setEmail(detailOrder.data.data.data.email)
            setIdService(detailOrder.data.data.data.Categori.ID_Service)
            setDesRepair(detailOrder.data.data.data.desProblem)
            setNameService(detailOrder.data.data.data.Categori.Service.nameService)
            setDateRepair(moment(detailOrder.data.data.data.desireDate).format('YYYY-MM-DD'))
            setCategory(detailOrder.data.data.data.Categori.nameCategories)
            if (detailOrder.data.data.data.ID_Product != undefined) {
                setProduct(detailOrder.data.data.data.Product.nameProduct)
                setBrand(detailOrder.data.data.data.Product.Brand.nameBrand)

            }
        }
    }
    useEffect(() => {
        getDetailOrder();


    }, [])


    useEffect(() => {
        if (idService && selectDay) {
            axios.get("http://localhost:3000/schedule/dayWorkService/" + id, {
                params: {
                    selectDay: selectDay,
                    idService: idService,

                }
            })
                .then(res => {
                    setListRepairer(res.data);
                    console.log(res.data)
                    setIdSchedule('');
                    setTimeslot('');
                })
        }
    }, [selectDay])

    useEffect(() => {
        if (idSchedule && idSchedule != 0) {
            axios.get("http://localhost:3000/schedule/timeslot/ " + idSchedule)
                .then(res => {
                    console.log("Time slot", res.data)
                    setListTimeSlot(res.data)
                })
        }

    }, [idSchedule])

    const [loadings, setLoadings] = useState();
    // const enterLoading = () => {
    //     setLoadings(true);
    //     setTimeout(() => {
    //         setLoadings(false);
    //     }, 3000);
    // };


    const acceptRepair = () => {

        const newErrors = {};
        const futureDate = moment().add(1, 'days');
        if (!selectDay) {
            newErrors.selectDay = 'Vui lòng chọn ngày sửa chữa'
        } else if (moment(selectDay).isBefore(futureDate, 'day')) {
            newErrors.selectDay = "Vui lòng chọn ngày tương lai";
        }

        if (!idSchedule) {
            newErrors.idRepairer = 'Vui lòng chọn thợ sửa chữa'
        }

        if (!timeslot) {
            newErrors.timeslot = 'Vui lòng chọn thời gian sửa chữa'
        }
        if (Object.keys(newErrors).length === 0) {
            setErrors();
            setLoadings(true)
            axios.post("http://localhost:3000/order/accept/" + id, { idSchedule, timeslot })
                .then(res => {
                    if (res.data.success) {
                        setLoadings(false)
                        toast.success("Duyệt đơn sửa chữa thành công")
                    }
                })
        } else {
            setErrors(newErrors)
        }



    }

    // useEffect(() => {
    //     if (idSchedule && listTimeSlot && listTimeSlot.length > 0) {
    //         console.log("ID schedule", idSchedule)
    //         const check = 
    //         console.log("TIme slot check", check)
    //     }
    // }, [idSchedule])


    return (
        <>
            <section className="vh-100 gradient-custom">
                <div className="container h-100">
                    <div className="row justify-content-center align-items-center h-100">
                        <div className="col-12 col-lg-9 col-xl-7">
                            <div
                                className="card shadow-2-strong card-registration"
                                style={{ borderRadius: 15 }}
                            >
                                <div className="card-body p-3 p-md-4">
                                    <div className={cx("titleForm")}>
                                        <h3 className={cx("titleRepair")}>DUYỆT ĐƠN SỬA CHỮA</h3>
                                        <span className="h1 ms-auto "><img className={cx("imgLogo")} src="../../image/logo/logo8.png" alt="" />
                                            <p className={cx("textLogo")}>HOME FIX</p></span>
                                    </div>
                                    <div className="row">
                                        <h6 className="mb-2">Thông tin khác hàng</h6>
                                        <div className="col-md-6 mb-3">
                                            <div className="form-floating">
                                                <input type="text" className={`form-control ${cx("inputForm")}`} placeholder="name@example.com"
                                                    value={fullName || ''} onChange={() => { }} readOnly />
                                                <label htmlFor="floatingInput">Họ và tên</label>


                                            </div>
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <div className="form-floating">
                                                <input type="text" className={`form-control `} placeholder="name@example.com"
                                                    value={address || ''} onChange={() => { }} readOnly />
                                                <label htmlFor="floatingInput">Địa chỉ</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <div className="form-floating">
                                                <input type="text" className={`form-control ${cx("inputForm")}`} placeholder="name@example.com"
                                                    value={phone || ''} onChange={() => { }} readOnly />
                                                <label htmlFor="floatingInput">Số điện thoại</label>

                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <div className="form-floating">
                                                <input type="text" className={`form-control ${cx("inputForm")}`} placeholder="name@example.com"
                                                    value={email || ''} onChange={() => { }} readOnly />
                                                <label htmlFor="floatingInput">Email</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <h6 className="mb-2">Dịch vụ mong muốn</h6>
                                        <div className="col-md-6 mb-3">
                                            <div className="form-floating">
                                                <input type="text" className={`form-control ${cx("inputForm")}`} placeholder="name@example.com"
                                                    value={nameService || ''} onChange={() => { }} />
                                                <label htmlFor="floatingInput">Email</label>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="row">
                                        <h6 className="mb-2">Thông tin thiết bị</h6>
                                        <div className="col-md-6 mb-4">
                                            <div className="form-floating">
                                                <input type="text" className={`form-control ${cx("inputForm")} `} placeholder="name@example.com"
                                                    value={brand || ''} onChange={() => { }} readOnly />
                                                <label htmlFor="floatingInput">Nhãn hàng</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-4">
                                            <div className="form-floating">
                                                <input type="text" className={`form-control ${cx("inputForm")}`} placeholder="name@example.com"
                                                    value={category || ''} onChange={() => { }} readOnly />
                                                <label htmlFor="floatingInput">Loại thiết bị</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-4">
                                            <div className="form-floating">
                                                <input type="text" className={`form-control ${cx("inputForm")} `} placeholder="name@example.com"
                                                    value={product} onChange={() => { }} readOnly />
                                                <label htmlFor="floatingInput">Thiết bị</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-4">
                                            <div className="form-floating">
                                                <textarea className={`form-control ${cx("inputForm")}`} placeholder="Leave a comment here" id="floatingTextarea2"
                                                    value={desRepair} onChange={(e) => setDesRepair(e.target.value)} readOnly></textarea>
                                                <label htmlFor="floatingTextarea2">Mô tả lỗi</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <h6 className="mb-1">Thời gian mong muốn</h6>
                                        <div className="col-md-6 mb-3 pb-2">
                                            <div className="form-outline">
                                                <label className="form-label" htmlFor="dayRepair">
                                                    Ngày sửa chữa
                                                </label>
                                                <input
                                                    type="date"
                                                    id="dayRepair"
                                                    className={`form-control p-3s ${cx("inputForm")}`}
                                                    value={dateRepair} onChange={() => { }} readOnly
                                                />
                                            </div>
                                        </div>

                                    </div>
                                    <div className="row">
                                        <h6 className="mb-1">Thời gian sửa chữa</h6>
                                        <div className="col-md-6 mb-3 pb-2">
                                            <div className="form-floating mt-2">
                                                <input type="date" className={`form-control ${cx("inputForm")} ${errors && errors.selectDay ? 'is-invalid' : ''}`}
                                                    value={selectDay} onChange={(e) => setSelectDay(e.target.value)} placeholder="name@example.com"
                                                />
                                                <label htmlFor="floatingInput">Chọn ngày</label>
                                                {errors && <p className="text-danger">{errors.selectDay}</p>}
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-3 pb-2">
                                            <div className="form-floating ">
                                                <select className={`form-control mt-2 ${cx("inputForm")} ${errors && errors.idRepairer ? 'is-invalid' : ''} `} aria-label="Default select example"
                                                    value={idSchedule} onChange={(e) => setIdSchedule(e.target.value)}
                                                >
                                                    <option value="0">Chọn thợ sửa chữa</option>
                                                    {listRepairer?.map((repair, index) =>
                                                        <option key={index} value={repair.id}>{repair.Repairer.usernameRepairer}</option>
                                                    )}

                                                </select>
                                                <label htmlFor="floatingInput">Thợ sửa chữa</label>
                                                {errors && <p className="text-danger">{errors.idRepairer}</p>}
                                            </div>
                                        </div>

                                    </div>
                                    <div className="timeSlots">
                                        <h6 className="mb-1">Khung giờ sửa chữa</h6>
                                        {errors && <p className="text-danger">{errors.timeslot}</p>}
                                        <div className={`timeMorning ${idSchedule && idSchedule != 0 ? '' : 'd-none'}`}>
                                            <p>Buổi sáng</p>
                                            <div className="form-check form-check-inline mt-1">
                                                <input
                                                    className={`form-check-input d-none`}
                                                    type="radio"
                                                    name="timeslot"
                                                    id="timeslot1"
                                                    value={'7:00 - 8:00'} onChange={(e) => setTimeslot(e.target.value)} disabled={listTimeSlot && listTimeSlot.some(time => (time.ID_Schedule == idSchedule && time.timeRepair == '7:00 - 8:00'))}
                                                />

                                                <label className={`${cx("timeSlot")} form-check-label ${timeslot === '7:00 - 8:00' ? `${cx("active")}` : ''}`} htmlFor="timeslot1">
                                                    7:00 - 8:00
                                                </label>
                                            </div>
                                            <div className="form-check form-check-inline mt-1">
                                                <input
                                                    className="form-check-input d-none"
                                                    type="radio"
                                                    name="timeslot"
                                                    id="timeslot2"
                                                    value={'8:30 - 9:30'} onChange={(e) => setTimeslot(e.target.value)} disabled={listTimeSlot && listTimeSlot.some(time => (time.ID_Schedule == idSchedule && time.timeRepair == '8:30 - 9:30'))}
                                                />
                                                <label className={`${cx("timeSlot")} form-check-label  ${timeslot === '8:30 - 9:30' ? `${cx("active")}` : ''}`} htmlFor="timeslot2">
                                                    8:30 - 9:30
                                                </label>
                                            </div>
                                            <div className="form-check form-check-inline mt-1">
                                                <input
                                                    className="form-check-input d-none"
                                                    type="radio"
                                                    name="timeslot"
                                                    id="timeslot3"
                                                    value={'10:00 - 11:00'} onChange={(e) => setTimeslot(e.target.value)} disabled={listTimeSlot && listTimeSlot.some(time => (time.ID_Schedule == idSchedule && time.timeRepair == '10:30 - 11:00'))}
                                                />
                                                <label className={`${cx("timeSlot")} form-check-label  ${timeslot === '10:00 - 11:00' ? `${cx("active")}` : ''}`} htmlFor="timeslot3">
                                                    10:00 - 11:00
                                                </label>
                                            </div>

                                        </div>
                                        <div className={`timeAfternoon ${idSchedule && idSchedule != 0 ? '' : 'd-none'}`}>
                                            <p>Buổi chiều</p>
                                            <div className="form-check form-check-inline mt-1">
                                                <input
                                                    className="form-check-input d-none"
                                                    type="radio"
                                                    name="timeslot"
                                                    id="timeslot4"
                                                    value={'13:00 - 14:00'} onChange={(e) => setTimeslot(e.target.value)} disabled={listTimeSlot && listTimeSlot.some(time => (time.ID_Schedule == idSchedule && time.timeRepair == '13:00 - 14:00'))}
                                                />
                                                <label className={`${cx("timeSlot")} form-check-label  ${timeslot === '13:00 - 14:00' ? `${cx("active")}` : ''}`} htmlFor="timeslot4">
                                                    13:00 - 14:00
                                                </label>
                                            </div>
                                            <div className="form-check form-check-inline mt-1">
                                                <input
                                                    className="form-check-input d-none"
                                                    type="radio"
                                                    name="timeslot"
                                                    id="timeslot5"
                                                    value={'14:30 - 15:30'} onChange={(e) => setTimeslot(e.target.value)} disabled={listTimeSlot && listTimeSlot.some(time => (time.ID_Schedule == idSchedule && time.timeRepair == '14:30 - 15:30'))}
                                                />
                                                <label className={`${cx("timeSlot")} form-check-label  ${timeslot === '14:30 - 15:30' ? `${cx("active")}` : ''}`} htmlFor="timeslot5">
                                                    14:30 - 15:30
                                                </label>
                                            </div>
                                            <div className="form-check form-check-inline mt-1">
                                                <input
                                                    className="form-check-input d-none"
                                                    type="radio"
                                                    name="timeslot"
                                                    id="timeslot6"
                                                    value={'16:00 - 17:00'} onChange={(e) => setTimeslot(e.target.value)} disabled={listTimeSlot && listTimeSlot.some(time => (time.ID_Schedule == idSchedule && time.timeRepair == '16:00 - 17:00'))}
                                                />
                                                <label className={`${cx("timeSlot")} form-check-label  ${timeslot === '16:00 - 17:00' ? `${cx("active")}` : ''}`} htmlFor="timeslot6">
                                                    16:00 - 17:00
                                                </label>
                                            </div>

                                        </div>

                                    </div>

                                    <div className="d-inline">
                                        {/* <button
                                            className={`d-inline ${cx("btnRepair")}`}
                                            onClick={() => acceptRepair()}
                                            loading={loadings}
                                        >

                                            DUYỆT</button> */}
                                        {/* <button className={`d-inline ${cx("btnCancel")}`}>
                                            <Link className="text-decoration-none text-light" to="http://localhost:5173/">HỦY</Link>
                                        </button> */}
                                        <Button type="primary" className="mt-3" loading={loadings} onClick={() => acceptRepair()}>
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
                </div>


            </section >

        </>
    );
}

export default AcceptForm;