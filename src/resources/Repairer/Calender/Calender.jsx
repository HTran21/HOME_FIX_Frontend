import styles from "./Calender.module.scss";
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
// import { DatePicker, Space, Calendar } from 'antd';
import { Calendar } from 'rsuite';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from '../../../service/customize_axios';
import moment from 'moment';

function CalenderRepairer() {
    const user = useSelector((state) => state.user.user);
    const id = user?.id;
    const [data, setData] = useState();
    const onChange = (date, dateString) => {
        console.log(date, dateString);
    };
    const onPanelChange = (value, mode) => {
        console.log(value.format('YYYY-MM-DD'), mode);
    };

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/schedule/dayWork/' + id);
            setData(response.data.data)
            console.log("Date", response.data.data)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, [])
    // const cellRender = (value) => {
    //     const date = value.format('YYYY-MM-DD');
    //     if (data && data.length > 0) {
    //         const isHighlighted = data.find((item) => moment(item.workDay).format('YYYY-MM-DD') === date);
    //         return isHighlighted ? <div className={cx("highlightedDay")} /> : '';
    //     } else {
    //         return;
    //     }
    // };
    const cellRender = (value) => {
        const date = value.format('YYYY-MM-DD');
        if (data && data.length > 0) {
            const isHighlighted = data.find((item) => moment(item.workDay).format('YYYY-MM-DD') === date);
            console.log("isHiglth", isHighlighted)
            if (isHighlighted) {
                return <div className="highlighted-day" />;
            }
        }
        return <></>; // Trả về một ReactNode rỗng cho các trường hợp không phù hợp
    };

    return (
        <div className="container">
            <style>
                {`
      .bg-gray {
        background-color: #DBEAF8;
      }
      `}
            </style>
            <div className={`${cx("titlePage")}`}>
                <h4>Lịch làm việc</h4>
                <Link to={"/repairer/calendar/create"} className={`${cx("btnAdd")} text-decoration-none text-light`}> Tạo lịch </Link>
            </div>
            <div className="contentPage">
                {/* <Calendar onPanelChange={onPanelChange} fullCellRender={cellRender} /> */}
                {/* <Calendar
                    renderCell={(date) => {
                        const dateString = moment(date).format('YYYY-MM-DD');
                        if (data && data.length > 0) {
                            const isHighlighted = data.find((item) => moment(item.workDay).format('YYYY-MM-DD') === dateString);
                            console.log("isHiglth", isHighlighted)
                            if (isHighlighted != undefined) {
                                return <div className={cx("highlightedDay")} ></div>;
                            }
                        }
                        return null;
                    }}
                /> */}
                <Calendar
                    bordered
                    cellClassName={(date) => {
                        const dateString = moment(date).format('YYYY-MM-DD');
                        if (data && data.length > 0) {
                            const isHighlighted = data.find((item) => moment(item.workDay).format('YYYY-MM-DD') === dateString);
                            return isHighlighted ? 'bg-gray' : '';
                        }
                        return '';
                    }}

                    renderCell={(value) => {
                        if (data && data.length > 0) {
                            const filteredData = data.filter(item => moment(item.workDay).format('YYYY-MM-DD') === moment(value).format('YYYY-MM-DD'));
                            if (filteredData.length === 0) {
                                return null;
                            }
                            const workToday = filteredData[0].DetailOrders;
                            if (workToday.length) {
                                return (
                                    <div>
                                        Đơn: {workToday.length}
                                    </div>
                                )
                            }
                        }

                    }}

                />
                {/* <Calendar bordered cellClassName={date => (date.getDay() % 2 ? 'bg-gray' : undefined)} /> */}
                {/* <DatePicker placeholder="Chọn tuần" className={cx("calenderSelect")} onChange={onChange} picker="week" />

                <div className="listDayWork mt-2 row">
                    <div className={` col-lg-4 col-md-6 col-sm-12`}>
                        <div className={cx("cardWork", "active")}>
                            <div className="row">
                                <div className="col"><p className={cx("titleWorkContent")}>Thứ 6 28/03/2024</p></div>

                            </div>
                            <div className="row">
                                <div className={`${cx("contentWork")}`}>
                                    <p>Tên: Lý Truyng Tình</p>
                                    <p>Đơn sửa chữa: 5</p>

                                </div>

                            </div>
                        </div>

                    </div>
                    <div className={` col-lg-4 col-md-6 col-sm-12`}>
                        <div className={cx("cardWork")}>
                            <div className="row">
                                <div className="col"><p className={cx("titleWorkContent")}>Thứ 7 29/03/2024</p></div>

                            </div>
                            <div className="row">
                                <div className={`${cx("contentWork")}`}>
                                    <p>Tên: Lý Truyng Tình</p>
                                    <p>Đơn sửa chữa: 5</p>

                                </div>

                            </div>
                        </div>

                    </div>
                    < div className={` col-lg-4 col-md-6 col-sm-12`}>
                        <div className={cx("cardWork")}>
                            <div className="row">
                                <div className="col"><p className={cx("titleWorkContent")}>Thứ 2 31/04/2024</p></div>

                            </div>
                            <div className="row">
                                <div className={`${cx("contentWork")}`}>
                                    <p>Tên: Lý Truyng Tình</p>
                                    <p>Đơn sửa chữa: 5</p>

                                </div>

                            </div>
                        </div>

                    </div>
                    <div className={` col-lg-4 col-md-6 col-sm-12`}>
                        <div className={cx("cardWork")}>
                            <div className="row">
                                <div className="col"><p className={cx("titleWorkContent")}>Thứ 3 01/04/2024</p></div>

                            </div>
                            <div className="row">
                                <div className={`${cx("contentWork")}`}>
                                    <p>Tên: Lý Truyng Tình</p>
                                    <p>Đơn sửa chữa: 5</p>

                                </div>

                            </div>
                        </div>

                    </div> *
                 </div> */}

            </div>
        </div >
    );
}

export default CalenderRepairer;