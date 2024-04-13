import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./ListWork.module.scss";
import classNames from 'classnames/bind';
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AndroidOutlined, AppleOutlined } from '@ant-design/icons';
import { Tabs, DatePicker, Modal } from 'antd';
import axios from '../../../service/customize_axios';
import moment from 'moment';
const cx = classNames.bind(styles);
function ListWork() {

    const user = useSelector((state) => state.user.user);
    const id = user?.id;
    const [data, setData] = useState();
    const [dateSelect, setDateSelect] = useState(moment().format('YYYY-MM-DD'));
    const onChange = (date, dateString) => {
        console.log(dateString);
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
    useEffect(() => {
        if (dateSelect.trim() !== '') {
            axios.get("http://localhost:3000/schedule/workRepair/" + id, {
                params: {
                    currentDate: dateSelect,

                }
            })
                .then(res => {
                    setListworkToDay(res.data[0].DetailOrders)
                    // console.log("Date", res.data[0].DetailOrders)
                })
        }

    }, [dateSelect])
    const navigate = useNavigate();

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
            key: '1',
            label: 'Công việc mới',
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
                                            <div className="col-6"><p className={cx("titleWorkContent")}>Sửa chữa {work.Order.Categori.nameCategories}</p></div>
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
            key: '3',
            label: 'Đang tiến hành',
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
                                            <div className="col-6"><p className={cx("titleWorkContent")}>Sửa chữa {work.Order.Categori.nameCategories}</p></div>
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
                            ) : (
                                <div key={index} className={`${cx("emptyWork")}`}>
                                    <img className="mt-5" src="../public/icon/emptyWork.png" alt="" />
                                    <p>Không có công việc</p>
                                </div>
                            )

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
            key: '',
            label: 'Hoàn thành',
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
                                            <div className="col-6"><p className={cx("titleWorkContent")}>Sửa chữa {work.Order.Categori.nameCategories}</p></div>
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
                            ) : (
                                <div key={index} className={`${cx("emptyWork")}`}>
                                    <img className="mt-5" src="../public/icon/emptyWork.png" alt="" />
                                    <p>Không có công việc</p>
                                </div>
                            )

                        ))
                    ) : (
                        <div className={`${cx("emptyWork")}`}>
                            <img className="mt-5" src="../public/icon/emptyWork.png" alt="" />
                            <p>Không có công việc</p>
                        </div>
                    )}
                </div>
            ),
        }
    ];


    return (
        <div className="container">
            <div className={cx("titlePage")}>
                {/* <div className={cx("searchGroup")}>
                    <div className={cx("searchBorder")}>
                        <input className={cx("inputSearch")} type="text" id="search" autoComplete="off" />
                        <label htmlFor="search"><FontAwesomeIcon icon={faMagnifyingGlass} /></label>
                    </div>
                </div> */}
                <h4>Danh sách công việc</h4>

            </div>
            <div className="contentPage">
                <Tabs defaultActiveKey="1" items={items} onChange={onChangTab} />
            </div>

        </div>
    );
}

export default ListWork;