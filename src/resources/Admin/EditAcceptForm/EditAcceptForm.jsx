import styles from "./EditAcceptForm.module.scss";
import classNames from 'classnames/bind';
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from '../../../service/customize_axios';
import { toast, useToast } from "react-toastify";
import { useSelector } from "react-redux";
import moment from 'moment';
const cx = classNames.bind(styles);
import { Button, DatePicker, Flex } from 'antd';
import dayjs from "dayjs";

import { io } from "socket.io-client";

const socket = io.connect("http://localhost:3000", {
    transports: ["websocket"],
});

function EditAcceptForm() {
    // const history = useHistory();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const { id } = useParams();

    const ID_Feedback = searchParams.get("feedback");

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
    // const [timeslot, setTimeslot] = useState('');
    const [idSchedule, setIdSchedule] = useState();
    const [listTimeSlot, setListTimeSlot] = useState();
    // const [idRepairer, setIdRepairer] = useState();
    const [errors, setErrors] = useState({});
    const [dateRepairArray, setDateRepairArray] = useState([]);
    const [totalOrderRepairer, setTotalOrderRepairer] = useState(0);

    const getDetailOrder = async () => {
        if (id) {
            const detailOrder = await axios.get("http://localhost:3000/order/detail/" + id);
            if (detailOrder.data.data.data) {
                setFullName(detailOrder.data.data.data.fullName)
                console.log("data", detailOrder.data.data.data)
                setAddress(detailOrder.data.data.data.address)
                setPhone(detailOrder.data.data.data.phone)
                setEmail(detailOrder.data.data.data.email)
                setIdService(detailOrder.data.data.data.Categori.ID_Service)
                setDesRepair(detailOrder.data.data.data.desProblem)
                setNameService(detailOrder.data.data.data.Categori.Service.nameService)
                // setDateRepair(dayjs(detailOrder.data.data.data.DetailOrder.Schedule.workDay))
                setSelectDay(dayjs(detailOrder.data.data.data.DetailOrder.Schedule.workDay))

                // console.log(detailOrder.data.data.data.desireDate)
                const dateArray = detailOrder.data.data.data.desireDate.split(",")
                setDateRepairArray(dateArray.map(date => dayjs(date)))
                setCategory(detailOrder.data.data.data.Categori.nameCategories)
                if (detailOrder.data.data.data.ID_Product != undefined && detailOrder.data.data.data.ID_Product != 0) {
                    setProduct(detailOrder.data.data.data.Product.nameProduct)
                    setBrand(detailOrder.data.data.data.Product.Brand.nameBrand)

                }
            }
            else {
                toast.error(detailOrder.data.data.message)
            }

        }
    }
    useEffect(() => {
        getDetailOrder();


    }, [])

    const onChange = (date, dateString) => {
        setSelectDay(date)

    };


    useEffect(() => {
        if (idService && selectDay) {
            console.log("dateString", typeof (selectDay))
            axios.get("http://localhost:3000/schedule/dayWorkService/" + id, {
                params: {
                    selectDay: selectDay,
                    idService: idService,

                }
            })
                .then(res => {
                    setListRepairer(res.data);
                    setIdSchedule('');
                    setTotalOrderRepairer(0)
                    console.log(res.data)
                })
        }
    }, [selectDay])

    useEffect(() => {
        if (idSchedule && idSchedule != 0) {
            axios.get("http://localhost:3000/schedule/totalOrderDay/ " + idSchedule)
                .then(res => {
                    if (res.data.success) {
                        setTotalOrderRepairer(res.data.totalOrderDay)
                    } else {
                        toast.error(res.data.message)
                    }
                })
        }

    }, [idSchedule])

    const [loadings, setLoadings] = useState();
    const acceptRepair = () => {
        console.log(idSchedule)

        const newErrors = {};
        if (!idSchedule) {
            newErrors.idRepairer = 'Vui lòng chọn thợ sửa chữa'
        }

        if (Object.keys(newErrors).length === 0) {
            console.log("ID_Order", id)
            console.log("ID_Order", idSchedule)
            console.log("ID_Feedback", ID_Feedback)
            setErrors();
            setLoadings(true)
            axios.put("http://localhost:3000/order/editaccept/" + id, { idSchedule, ID_Feedback })
                .then(res => {
                    if (res.data.success) {
                        setLoadings(false)
                        toast.success("Duyệt đơn sửa chữa thành công");
                        navigate("/admin/order/");
                        socket.emit("newNotification")

                    } else {
                        toast.error(res.data.message)
                    }
                })
        } else {
            setErrors(newErrors)
        }



    }

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
                                        <h3 className={cx("titleRepair")}>CHỈNH SỬA ĐƠN SỬA CHỮA</h3>
                                        <span className="h1 ms-auto "><img className={cx("imgLogo")} src="../../image/logo/logo8.png" alt="" />
                                            <p className={cx("textLogo")}>HOME FIX</p></span>
                                    </div>
                                    <div className="row">
                                        <h6 className="mb-1">Thông tin khác hàng</h6>
                                        <div className="col-md-6 mb-3">
                                            <div className="form-floating">
                                                <input type="text" className={`form-control ${cx("inputForm")}`} placeholder="name@example.com"
                                                    value={fullName || ''} onChange={() => { }} readOnly />
                                                <label htmlFor="floatingInput">Họ và tên *</label>


                                            </div>
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <div className="form-floating">
                                                <input type="text" className={`form-control `} placeholder="name@example.com"
                                                    value={address || ''} onChange={() => { }} readOnly />
                                                <label htmlFor="floatingInput">Địa chỉ *</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <div className="form-floating">
                                                <input type="text" className={`form-control ${cx("inputForm")}`} placeholder="name@example.com"
                                                    value={phone || ''} onChange={() => { }} readOnly />
                                                <label htmlFor="floatingInput">Số điện thoại *</label>

                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <div className="form-floating">
                                                <input type="text" className={`form-control ${cx("inputForm")}`} placeholder="name@example.com"
                                                    value={email || ''} onChange={() => { }} readOnly />
                                                <label htmlFor="floatingInput">Email *</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <h6 className="mb-2">Dịch vụ mong muốn</h6>
                                        <div className="col-md-6 mb-3">
                                            <div className="form-floating">
                                                <input type="text" className={`form-control ${cx("inputForm")}`} placeholder="name@example.com"
                                                    value={nameService || ''} onChange={() => { }} />
                                                <label htmlFor="floatingInput">Dịch vụ *</label>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="row">
                                        <h6 className="mb-2">Thông tin thiết bị</h6>
                                        <div className="col-md-6 mb-4">
                                            <div className="form-floating">
                                                <input type="text" className={`form-control ${cx("inputForm")} `} placeholder="name@example.com"
                                                    value={brand || ''} onChange={() => { }} readOnly />
                                                <label htmlFor="floatingInput">Nhãn hàng *</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-4">
                                            <div className="form-floating">
                                                <input type="text" className={`form-control ${cx("inputForm")}`} placeholder="name@example.com"
                                                    value={category || ''} onChange={() => { }} readOnly />
                                                <label htmlFor="floatingInput">Loại thiết bị *</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-2">
                                            <div className="form-floating">
                                                <input type="text" className={`form-control ${cx("inputForm")} `} placeholder="name@example.com"
                                                    value={product} onChange={() => { }} readOnly />
                                                <label htmlFor="floatingInput">Thiết bị *</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-2">
                                            <div className="form-floating">
                                                <textarea className={`form-control ${cx("inputForm")}`} placeholder="Leave a comment here" id="floatingTextarea2"
                                                    value={desRepair} onChange={(e) => setDesRepair(e.target.value)} readOnly></textarea>
                                                <label htmlFor="floatingTextarea2">Mô tả lỗi</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <h6 className="mb-1">Thời gian mong muốn</h6>
                                        <div className="col">
                                            <div className="form-outline">
                                                <label className="form-label" htmlFor="dayRepair">
                                                    Ngày sửa chữa *
                                                </label>
                                                <DatePicker
                                                    multiple
                                                    onChange={() => { }}
                                                    status={errors && errors.dateRepairArray ? 'error' : ''}
                                                    maxTagCount="responsive"
                                                    value={dateRepairArray}
                                                    size="large"
                                                    disabledDate={(current) => current.isBefore(moment().add(1, 'day'))} disabled
                                                />
                                            </div>
                                        </div>

                                    </div>
                                    <div className="row">
                                        <h6 className="mt-2">Thời gian sửa chữa</h6>
                                        <div className="col-md-6 pb-2">
                                            <div className="form-floating mt-2">

                                                <DatePicker value={selectDay} onChange={onChange} style={{ width: "100%", padding: "16px" }}
                                                    placeholder="Chọn ngày sửa chữa mới" size="large"
                                                    disabledDate={(current) => current.isBefore(moment().add(0, 'day'))}
                                                />
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
                                                <label htmlFor="floatingInput">Thợ sửa chữa *</label>
                                                {errors && <p className="text-danger">{errors.idRepairer}</p>}
                                            </div>
                                        </div>

                                    </div>
                                    <div className={`totalOrder`}>
                                        <h6>Tổng số đơn của thợ: {totalOrderRepairer}</h6>
                                    </div>

                                    <div className="d-inline">
                                        <Button type="primary" className="mt-3" loading={loadings} onClick={() => acceptRepair()}>
                                            Duyệt
                                        </Button>
                                        <Button className="ms-2">
                                            <Link className="text-decoration-none" to={"/admin/order/feedback"}>Đóng</Link>
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

export default EditAcceptForm;