import styles from "./Calender.module.scss";
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
import { DatePicker, Space } from 'antd';
import { Link } from "react-router-dom";

function CalenderRepairer() {
    const onChange = (date, dateString) => {
        console.log(date, dateString);
    };
    return (
        <div className="container">
            <div className={`${cx("titlePage")}`}>
                <h4>Lịch làm việc</h4>
                <Link to={"/repairer/calendar/create"} className={`${cx("btnAdd")} text-decoration-none text-light`}> Tạo lịch </Link>
            </div>
            <div className="contentPage">

                <DatePicker placeholder="Chọn tuần" className={cx("calenderSelect")} onChange={onChange} picker="week" />

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

                    </div>
                </div>
            </div>
        </div >
    );
}

export default CalenderRepairer;