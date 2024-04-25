import styles from "./FeedbackRepairer.module.scss";
import classNames from 'classnames/bind';
import { useSelector } from "react-redux";

const cx = classNames.bind(styles);
import { DatePicker, Empty } from 'antd';
import { useEffect, useState } from "react";

const { RangePicker } = DatePicker;
// const dateFormat = 'MM/DD/YYYY';
import axios from '../../../service/customize_axios';
import { toast } from "react-toastify";
import moment from 'moment';
import { faCircleCheck, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function FeedbackRepairer() {
    const user = useSelector((state) => state.user.user);
    const id = user?.id;
    const role = user?.role;
    const [listFeedback, setListFeedback] = useState();

    const fetchFeedback = () => {
        if (id && role) {
            axios.get("http://localhost:3000/feedback/getByUser", {
                params: {
                    ID_User: id,
                    role: role
                }
            })
                .then(res => {
                    if (res.data.success) {
                        console.log("Data", res.data)
                        setListFeedback(res.data.listFeedback)
                    } else {
                        toast.error(res.data.message)
                    }
                })
        }
    }

    useEffect(() => {
        fetchFeedback()
    }, [])
    return (
        <>
            <div className="container">
                <div>
                    <p className={cx("textTitle")}>Danh sách phản hồi</p>

                </div>
                <div className="contentPage">
                    <div className="row listFeedback mt-3">
                        {listFeedback?.map((feedback, index) => (
                            <div key={index} className="col-lg-4 col-md-6 col-sm-12">
                                <div className={cx("cardFeedback")}>
                                    <div className={cx("titleCard")}>
                                        <div className="idOrder">ID Order: {feedback.ID_Order}</div>
                                        <div className="statusFeedback ms-auto">
                                            <FontAwesomeIcon className="me-1" icon={feedback.feedbackStatus === 'W' ? faClock : faCircleCheck} />
                                            {feedback.feedbackStatus === 'W' ? 'Đang chờ' : 'Đã duyệt'}
                                        </div>
                                    </div>
                                    <div className={cx("contentCard")}>
                                        <p className={cx("feedbackType")}>{feedback.feedbackType === 'change_date_repair' ? 'Thay đổi ngày sủa chữa' : 'Khác'}</p>
                                        <p className="mt-1"><span className={cx("lableContentCard")}>Ngày thay đổi:</span> {moment(feedback.dateChange).format('DD/MM/YYYY')}</p>
                                        <p className="mt-1"><span className={cx("lableContentCard")}>Lý do:</span> {feedback.contentFeedback}</p>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div >
        </>
    );
}

export default FeedbackRepairer;