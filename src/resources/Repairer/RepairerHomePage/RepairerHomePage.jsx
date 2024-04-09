import { Link } from "react-router-dom";
import styles from "./RepairerHomePage.module.scss";
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);
function RepairerHomePage() {
    return (
        <div className="container">
            <section className={cx("introHomePage")}>
                {/* <div className="row">
                    <div className="col-md-12 col-lg-6">
                        <div className={cx("titleIntro")}>
                            <h1 >CHÀO MỪNG NHỮNG NGƯỜI THỢ TUYỆT VỜI</h1>
                        </div>
                        <div className={cx("line")} ></div>
                        <h4>Chúng ta cùng nhau tạo nên những thứ tuyệt vời</h4>
                        <button className={cx("btnGet")}><Link className="text-decoration-none text-light">Đăng ký sửa chữa ngay</Link></button>
                    </div>
                    <div className="col-md-6 col-lg-6 ">
                        <img className={cx("imgHomePage")} src="../illustration/repairman.png" alt="" />
                    </div>
                </div> */}
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
                        <div className={`col-lg-4 col-md-6 col-sm-12`}>
                            <div className={cx("cardWorK")} >
                                <div className="row" >
                                    <div className="col"><p className={cx("titleWorkContent")}>Sửa chữa tủ lạnh</p></div>
                                    <div className="col text-end">8h 28/03/2024</div>
                                </div>
                                <div className="row">
                                    <div className={`${cx("contentWork")}`}>
                                        <p>Tên: Trần Văn A</p>
                                        <p>Số điện thoại: 09754314</p>
                                        <p>Địa Chỉ: Khu II, Phường Xuân Khánh, Quận Ninh Kiều, Thành Phố Cần Thơ</p>
                                    </div>

                                </div>
                            </div>

                        </div>
                        <div className={` col-lg-4 col-md-6 col-sm-12`}>
                            <div className={cx("cardWorK")}>
                                <div className="row">
                                    <div className="col"><p className={cx("titleWorkContent")}>Sửa chữa tủ lạnh</p></div>
                                    <div className="col text-end">8h 28/03/2024</div>
                                </div>
                                <div className="row">
                                    <div className={`${cx("contentWork")}`}>
                                        <p>Tên: Trần Văn A</p>
                                        <p>Số điện thoại: 09754314</p>
                                        <p>Địa Chỉ: Khu II, Phường Xuân Khánh, Quận Ninh Kiều, Thành Phố Cần Thơ</p>
                                    </div>

                                </div>
                            </div>

                        </div>
                        <div className={`col-lg-4 col-md-6 col-sm-12`}>
                            <div className={cx("cardWorK")}>
                                <div className="row">
                                    <div className="col"><p className={cx("titleWorkContent")}>Sửa chữa tủ lạnh</p></div>
                                    <div className="col text-end">8h 28/03/2024</div>
                                </div>
                                <div className="row">
                                    <div className={`${cx("contentWork")}`}>
                                        <p>Tên: Trần Văn A</p>
                                        <p>Số điện thoại: 09754314</p>
                                        <p>Địa Chỉ: Khu II, Phường Xuân Khánh, Quận Ninh Kiều, Thành Phố Cần Thơ</p>
                                    </div>

                                </div>
                            </div>

                        </div>
                        <div className={` col-lg-4 col-md-6 col-sm-12`}>
                            <div className={cx("cardWorK")}>
                                <div className="row">
                                    <div className="col"><p className={cx("titleWorkContent")}>Sửa chữa tủ lạnh</p></div>
                                    <div className="col text-end">8h 28/03/2024</div>
                                </div>
                                <div className="row">
                                    <div className={`${cx("contentWork")}`}>
                                        <p>Tên: Trần Văn A</p>
                                        <p>Số điện thoại: 09754314</p>
                                        <p>Địa Chỉ: Khu II, Phường Xuân Khánh, Quận Ninh Kiều, Thành Phố Cần Thơ</p>
                                    </div>

                                </div>
                            </div>

                        </div>
                        {/* <div className={cx("emptyWork")}>
                            <img src="../public/icon/emptyWork.png" alt="" />
                            <p>Không có công việc</p>
                        </div> */}
                    </div>
                </div>
            </section>
        </div>

    );
}

export default RepairerHomePage;