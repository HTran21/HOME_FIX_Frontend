import styles from "./CreateCalender.module.scss";
import classNames from 'classnames/bind';
import { useSelector } from "react-redux";

const cx = classNames.bind(styles);
import { DatePicker, Empty } from 'antd';
import { useState } from "react";

const { RangePicker } = DatePicker;
// const dateFormat = 'MM/DD/YYYY';
import axios from '../../../service/customize_axios';
import { toast } from "react-toastify";
import moment from 'moment';

function CreateCalenderRepair() {
    const user = useSelector((state) => state.user.user);
    const id = user?.id;
    const [date, setDate] = useState([]);
    const onChange = (date, dateString) => {
        // console.log(date, dateString);
        setDate(dateString);
    };

    const upload = () => {
        if (date.length > 0) {
            const futureDate = moment().add(1, 'days');
            const [start, end] = date;
            if (moment(start).isBefore(futureDate, 'day')) {
                toast.warn("Vui lòng chọn ngày tương lai")
            }
            else {
                axios.post("http://localhost:3000/schedule/create", { id, date })
                    .then(res => {
                        if (res.data.success) {
                            toast.success(res.data.message);
                        }
                        else {
                            toast.error(res.data.message);
                        }

                    })
            }
        } else {
            toast.warn("Vui lòng chọn ngày")
        }

    }
    return (
        <>
            <>
                <style>
                    {
                        ` .ant-picker-panels > *:first-child button.ant-picker-header-next-btn {
            visibility: visible !important;
          }
          
          .ant-picker-panels > *:first-child button.ant-picker-header-super-next-btn {
            visibility: visible !important;
          }
          
          .ant-picker-panels > *:last-child {
            display: none;
          }
          
          .ant-picker-panel-container, .ant-picker-footer {
            width: 280px !important;
          }
          
          .ant-picker-footer-extra > div {
            flex-wrap: wrap !important; 
          `}

                </style></>
            <div className="container">
                <div className={`${cx("titlePage")}`}>
                    <h4>Đăng ký làm việc</h4>
                    <button className={cx("btnAdd")} onClick={() => upload()}>Tạo</button>
                </div>
                <div className="contentPage">
                    <div className={cx("dateRange")}>
                        <p>Tạo lịch làm việc</p>
                        <RangePicker onChange={onChange} className={cx("dateSelect")} />
                    </div>
                    {/* <div className={`row ${cx("dateRange")}`}>
                    <div className="col">
                        <h6>Chọn ngày bắt đầu</h6>
                        <DatePicker className={cx("dateSelect")} onChange={onChange} />


                    </div>
                    <div className="col">
                        <h6>Chọn ngày kết thúc</h6>
                        <DatePicker className={cx("dateSelect")} onChange={onChange} />
                    </div>
                </div> */}
                </div>
            </div >
        </>
    );
}

export default CreateCalenderRepair;