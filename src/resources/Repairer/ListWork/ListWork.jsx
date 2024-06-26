import { faMagnifyingGlass, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./ListWork.module.scss";
import classNames from 'classnames/bind';
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AndroidOutlined, AppleOutlined } from '@ant-design/icons';
import { Tabs, DatePicker, Modal, Badge } from 'antd';
import axios from '../../../service/customize_axios';
import moment from 'moment';
import { toast } from "react-toastify";
const cx = classNames.bind(styles);

import socket from "../../../service/socketService";
function ListWork() {

    const user = useSelector((state) => state.user.user);
    const id = user?.id;
    const [data, setData] = useState();
    const [dateSelect, setDateSelect] = useState(moment().format('YYYY-MM-DD'));
    const [recored, setRecord] = useState();
    const [show, setShow] = useState(true);
    const onChange = (date, dateString) => {
        // console.log(dateString);
        if (dateString && dateString.trim() === '') {
            setDateSelect(moment().format('YYYY-MM-DD'))
        }
        else {
            setDateSelect(dateString);
        }
    };

    const onChangTab = (key) => {
        setDateSelect(moment().format('YYYY-MM-DD'))

    }
    const [listWorkToDay, setListworkToDay] = useState();
    const [listWorkAccept, setListworkAccept] = useState();

    const featchListWork = () => {
        if (dateSelect.trim() !== '') {
            axios.get("http://localhost:3000/schedule/workRepair/" + id, {
                params: {
                    currentDate: dateSelect,

                }
            })
                .then(res => {
                    if (res.data.success) {
                        setListworkToDay(res.data.listWork.DetailOrders)
                        // console.log("Data", res.data.listWork.DetailOrders)
                    } else {
                        setListworkToDay('')
                    }

                    // console.log("Date", res.data[0].DetailOrders)
                })
        }
    }

    const featchListWorkAccept = () => {
        axios.get("http://localhost:3000/schedule/workRepair/" + id)
            .then(res => {
                if (res.data) {
                    setListworkAccept(res.data)
                    console.log("Work accept", res.data)
                }

                // console.log("Date", res.data[0].DetailOrders)
            })
    }
    useEffect(() => {
        featchListWork()
        featchListWorkAccept()

    }, [dateSelect])
    const navigate = useNavigate();

    const navigatoAccept = (work) => {
        navigate("/repairer/accept/" + work.id);
    }
    const navigatoDetail = (work) => {
        navigate("/repairer/work/" + work.id);
    }
    const navigatoTask = (work) => {
        navigate("/repairer/task/" + work.id)
    }
    const navigatoConfirm = (work) => {
        navigate("/repairer/confirm/" + work.id)
    }
    const items = [
        {
            key: '0',
            label:
                <Badge dot={listWorkAccept && listWorkAccept.length > 0}>
                    Duyệt công việc
                </Badge>
            ,
            children: (

                <div className="row listWork">
                    {/* <div className="d-flex justify-content-center mb-2">
                        <DatePicker onChange={onChange} style={{ width: "200px", padding: "10px" }} />
                    </div> */}
                    {listWorkAccept && listWorkAccept.length > 0 ? (
                        listWorkAccept?.map((work, index) => (
                            work.Order.status == 'P' ? (
                                <div key={index} className={`col-lg-4 col-md-6 col-sm-12`} >
                                    <div className={cx("cardWork")} onClick={() => navigatoAccept(work)} >
                                        <div className="row" >
                                            <div className="col-6">ID: {work.ID_Order} <p className={cx("titleWorkContent")}>Sửa chữa {work.Order.Categori.nameCategories}</p></div>
                                            <div className="col-6 text-end">{work.timeRepair} {dateSelect}</div>
                                        </div>
                                        <div className="row">
                                            <div className={`${cx("contentWork")}`}>
                                                <p>Tên: {work.Order.fullName}</p>
                                                <p>Số điện thoại: {work.Order.phone}</p>
                                                <p>Địa Chỉ:  {work.Order.address}</p>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            ) : ''

                        ))
                    ) : (
                        <div className={`${cx("emptyWork")}`}>
                            <img className="mt-5" src="../public/icon/emptyWork.png" alt="" />
                            <p>Không có công việc</p>
                        </div>
                    )}


                </div>
            )

        },
        {
            key: '1',
            label: <Badge dot={listWorkToDay && listWorkToDay.some(item => item.Order.status === 'A')}>
                Công việc mới
            </Badge>,
            children: (

                <div className="row listWork">
                    <div className="d-flex justify-content-center mb-2">
                        <DatePicker onChange={onChange} style={{ width: "200px", padding: "10px" }} />
                    </div>
                    {listWorkToDay && listWorkToDay.length > 0 ? (
                        listWorkToDay?.map((work, index) => (
                            work.Order.status === 'A' ? (
                                <div key={index} className={`col-lg-4 col-md-6 col-sm-12`} >
                                    <div className={cx("cardWork")} onClick={() => navigatoDetail(work)} >
                                        <div className="row" >
                                            <div className="col-6">ID: {work.ID_Order} <p className={cx("titleWorkContent")}>Sửa chữa {work.Order.Categori.nameCategories}</p></div>
                                            <div className="col-6 text-end">{dateSelect}</div>
                                        </div>
                                        <div className="row">
                                            <div className={`${cx("contentWork")}`}>
                                                <p>Tên: {work.Order.fullName}</p>
                                                <p>Số điện thoại: {work.Order.phone}</p>
                                                <p>Địa Chỉ:  {work.Order.address}</p>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            ) : ''

                        ))
                    ) : (
                        <div className={`${cx("emptyWork")}`}>
                            <img className="mt-5" src="../public/icon/emptyWork.png" alt="" />
                            <p>Không có công việc</p>
                        </div>
                    )}


                </div>
            )

        },
        {
            key: '2',
            label: <Badge dot={listWorkToDay && listWorkToDay.some(item => item.Order.status === 'R')}>
                Đang tiến hành
            </Badge>,
            children: (
                <div className="row listWork">
                    <div className="d-flex justify-content-center mb-2">
                        <DatePicker onChange={onChange} style={{ width: "200px", padding: "10px" }} />
                    </div>
                    {listWorkToDay && listWorkToDay.length > 0 ? (
                        listWorkToDay?.map((work, index) => (
                            work.Order.status === 'R' ? (
                                <div key={index} className={`col-lg-4 col-md-6 col-sm-12`} >
                                    <div className={cx("cardWork")} onClick={() => navigatoTask(work)} >
                                        <div className="row" >
                                            <div className="col-6">ID: {work.ID_Order} <p className={cx("titleWorkContent")}>Sửa chữa {work.Order.Categori.nameCategories}</p></div>
                                            <div className="col-6 text-end">{dateSelect}</div>
                                        </div>
                                        <div className="row">
                                            <div className={`${cx("contentWork")}`}>
                                                <p>Tên: {work.Order.fullName}</p>
                                                <p>Số điện thoại: {work.Order.phone}</p>
                                                <p>Địa Chỉ:  {work.Order.address}</p>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            ) :

                                null



                        ))
                    ) : (
                        <div className={`${cx("emptyWork")}`}>
                            <img className="mt-5" src="../public/icon/emptyWork.png" alt="" />
                            <p>Không có công việc</p>
                        </div>
                    )}
                </div>
            )
        },
        {
            key: '3',
            label: <Badge dot={listWorkToDay && listWorkToDay.some(item => item.Order.status === 'S')}>
                Hoàn thành
            </Badge>,
            children: (
                <div className="row listWork">
                    <div className="d-flex justify-content-center mb-2">
                        <DatePicker onChange={onChange} style={{ width: "200px", padding: "10px" }} />
                    </div>
                    {listWorkToDay && listWorkToDay.length > 0 ? (
                        listWorkToDay?.map((work, index) => (
                            work.Order.status === 'S' ? (
                                <div key={index} className={`col-lg-4 col-md-6 col-sm-12`} >
                                    <div className={cx("cardWork")} onClick={() => navigatoConfirm(work)} >
                                        <div className="row" >
                                            <div className="col-6">ID: {work.ID_Order} <p className={cx("titleWorkContent")}>Sửa chữa {work.Order.Categori.nameCategories}</p></div>
                                            <div className="col-6 text-end">{dateSelect}</div>
                                        </div>
                                        <div className="row">
                                            <div className={`${cx("contentWork")}`}>
                                                <p>Tên: {work.Order.fullName}</p>
                                                <p>Số điện thoại: {work.Order.phone}</p>
                                                <p>Địa Chỉ:  {work.Order.address}</p>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            ) : null

                        ))
                    ) : (
                        <div className={`${cx("emptyWork")}`}>
                            <img className="mt-5" src="../public/icon/emptyWork.png" alt="" />
                            <p>Không có công việc</p>
                        </div>
                    )}
                </div>
            ),
        },
        {
            key: '4',
            label: <Badge dot={listWorkToDay && listWorkToDay.some(item => item.paymentStatus === 'UP' && item.paymentMethod === 'vnpay')}>
                Chờ xác nhận
            </Badge>,
            children: (
                <div className="row listWork">
                    <div className="d-flex justify-content-center mb-2">
                        <DatePicker onChange={onChange} style={{ width: "200px", padding: "10px" }} />
                    </div>
                    {listWorkToDay && listWorkToDay.length > 0 ? (
                        listWorkToDay?.map((work, index) => (
                            (work.Order.status === 'S' && work.paymentStatus === 'UP' && work.paymentMethod === 'vnpay') ? (
                                <div key={index} className={`col-lg-4 col-md-6 col-sm-12`} onClick={() => navigatoConfirm(work)}>
                                    <div className={cx("cardWork")} >
                                        <div className="row" >
                                            <div className="col-6">ID: {work.ID_Order} <p className={cx("titleWorkContent")}>Sửa chữa {work.Order.Categori.nameCategories}</p></div>
                                            <div className="col-6 text-end">{dateSelect}</div>
                                        </div>
                                        <div className="row">
                                            <div className={`${cx("contentWork")}`}>
                                                <p>Tên: {work.Order.fullName}</p>
                                                <p>Số điện thoại: {work.Order.phone}</p>
                                                <p>Địa Chỉ:  {work.Order.address}</p>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            ) : null

                        ))
                    ) : (
                        <div className={`${cx("emptyWork")}`}>
                            <img className="mt-5" src="../public/icon/emptyWork.png" alt="" />
                            <p>Không có công việc</p>
                        </div>
                    )
                    }
                </div >
            ),
        }
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = (work) => {
        setIsModalOpen(true);
        setRecord(work)
        console.log("WORK", work)
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        setRecord();
    };

    const handleOk = () => {
        let ID_DetailOrder = recored?.id
        if (id) {
            axios.post("http://localhost:3000/payment/confirm", { ID_DetailOrder })
                .then(res => {
                    if (res.data.success) {
                        toast.success(res.data.message)
                        featchListWork()
                        handleCancel()

                        // socket.emit("confirm_payment", { ID_DetailOrder, message: "Đã xác nhận thanh toán thành công" })
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
                    <p className={cx("textTitle")}>Danh sách công việc</p>

                </div>
                <div className="contentPage">
                    <Tabs defaultActiveKey="0" items={items} onChange={onChangTab} />
                </div>

            </div>
            <Modal title="Xác nhận đã thanh toán" open={isModalOpen} centered onOk={handleOk} onCancel={handleCancel} okText="Xác nhận" cancelText="Đóng">
                <div className={cx("layoutIcon")}>
                    <FontAwesomeIcon className={cx("iconModalWarning")} icon={faTriangleExclamation} />

                </div>
                <p className="fw-bold text-center">Vui lòng xác nhận khi đã nhận tiền từ khách hàng</p>
            </Modal>
        </>
    );
}

export default ListWork;