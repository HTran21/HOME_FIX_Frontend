import className from "classnames/bind";
import styles from "./CalendarStaff.module.scss";
import { useEffect, useState } from "react";
import axios from '../../../service/customize_axios';
import { toast } from "react-toastify";
import { Calendar, Whisper, Popover, Badge } from 'rsuite';


import moment from 'moment';

// import { Calendar } from 'rsuite';

const cx = className.bind(styles);

import {
    SearchOutlined,
    DeleteOutlined,
    MoreOutlined,
} from '@ant-design/icons';




function CalendarStaff() {

    const [data, setData] = useState();

    const fetchData = () => {
        axios.get("http://localhost:3000/schedule/allDayWork")
            .then(res => {
                console.log(res.data);
                setData(res.data)
            })
    }


    useEffect(() => {
        fetchData();

    }, [])



    return (
        <>
            <style>
                {`
      .bg-gray {
        background-color: #DBEAF8;
      }
      `}
            </style>
            <div className={cx("containerPage")}>
                <div className={cx("titlePage")}>
                    <h4 className="d-inline-block">Lịch làm việc</h4>
                </div>
                <div className={cx("contentPage")}>
                    <Calendar bordered
                        renderCell={(value) => {
                            const dateString = moment(value).format('YYYY-MM-DD');
                            if (data && data.length > 0) {
                                const filteredData = data.filter(item => moment(item.workDay).format('YYYY-MM-DD') === moment(value).format('YYYY-MM-DD'));
                                if (filteredData.length === 0) {
                                    return null;
                                }
                                const repairers = filteredData[0].repairers;
                                const displayList = repairers.filter((item, index) => index < 2);
                                if (repairers.length) {
                                    const moreCount = repairers.length - displayList.length;
                                    const moreItem = (
                                        <li>
                                            <Whisper
                                                placement="top"
                                                trigger="click"
                                                speaker={
                                                    <Popover>
                                                        {repairers.map((repairer, index) => (
                                                            <p key={index}>
                                                                {repairer.usernameRepairer}
                                                            </p>
                                                        ))}
                                                    </Popover>
                                                }
                                            >
                                                <a>{moreCount} more</a>
                                            </Whisper>
                                        </li>
                                    );
                                    return (
                                        // <ul>
                                        //     {repairers.map((repairer, index) => (
                                        //         <li key={index}>{repairer.usernameRepairer}</li>
                                        //     ))}

                                        // </ul>
                                        <ul style={{ listStyle: "none", padding: "0px" }}>
                                            {displayList.map((repairer, index) => (
                                                <li key={index}>
                                                    <Badge color='blue' /> {repairer.usernameRepairer}
                                                </li>
                                            ))}
                                            {moreCount ? moreItem : null}
                                        </ul>
                                    );
                                }

                            }
                            // return null;
                        }}

                        cellClassName={(date) => {
                            const dateString = moment(date).format('YYYY-MM-DD');
                            if (data && data.length > 0) {
                                const isHighlighted = data.find((item) => moment(item.workDay).format('YYYY-MM-DD') === dateString);
                                return isHighlighted ? 'bg-gray' : '';
                            }
                            return '';
                        }} />


                </div>
            </div>


        </>
    );
}

export default CalendarStaff;