import { Link } from "react-router-dom";
import styles from "./RepairerHomePage.module.scss";
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons";
import moment from 'moment';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from '../../../service/customize_axios';

const cx = classNames.bind(styles);
function RepairerHomePage() {
    const user = useSelector((state) => state.user.user);
    const id = user?.id;

    // console.log("ID", id)

    const currentDate = moment().format('YYYY-MM-DD');
    // const currentDate = '2024-04-24';
    // console.log("CurrentDay", currentDate);
    const [listWorkToDay, setListworkToDay] = useState();
    useEffect(() => {
        axios.get("http://localhost:3000/schedule/workRepair/" + id, {
            params: {
                currentDate: currentDate,

            }
        })
            .then(res => {
                // console.log("List work", res.data[0].DetailOrders)
                if (res.data) {
                    setListworkToDay(res.data.DetailOrders)
                    // console.log(res.data.DetailOrders)
                }
            })
    }, [])

    const completedWorksCount = listWorkToDay?.every(work => work.Order.status !== 'W');

    return (
        <div className="container">
            <section className={cx("introHomePage")}>
                <div className={cx("contentIntro")}>
                    <div className="row align-items-center">
                        <div className="col-6">
                            <p className={cx("textTitle")}>Chào mừng những người thợ tuyệt vời</p>

                        </div>
                        <div className="col-6">
                            <img className={cx("imgHomePage")} src="../illustration/repairmanNew.png" alt="" />
                        </div>
                    </div>
                </div>
            </section>
            <section className={cx("listWorkDay")}>
                <div className="p-2">
                    <p className={cx("titleWork")}>Công việc hôm nay</p>
                    <div className="row listWork">
                        {listWorkToDay && listWorkToDay.length > 0 ? (
                            listWorkToDay?.map((work, index) => (
                                work.Order.status === 'W' ? (
                                    <div key={index} className={`col-lg-4 col-md-6 col-sm-12`}>
                                        <div className={cx("cardWork")} >
                                            <div className="row" >
                                                <div className="col"><p className={cx("titleWorkContent")}>Sửa chữa {work.Order.Categori.nameCategories}</p></div>
                                                <div className="col text-end">{work.timeRepair} {currentDate}</div>
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
                            <div className={cx("emptyWork")}>
                                <img src="../public/icon/emptyWork.png" alt="" />
                                <p>Không có công việc</p>
                            </div>
                        )}

                        {listWorkToDay?.length > 0 && listWorkToDay?.every(work => (work.Order.status === 'S')) && (
                            <div className={cx("emptyWork")}>
                                < img src="../public/icon/verified.png" alt="" />
                                <p>Bạn đã hoàn thành công việc</p>
                            </div>
                        )}

                    </div>
                </div>
            </section >
        </div >

    );
}

export default RepairerHomePage;