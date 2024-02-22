import styles from "./FormRepair.module.scss";
import classNames from 'classnames/bind';
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function FormRepair() {
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
                                        <h3 className={cx("titleRepair")}>ĐĂNG KÝ SỬA CHỮA</h3>
                                        <span className="h1 ms-auto "><img className={cx("imgLogo")} src="../image/logo/logo8.png" alt="" />
                                            <p className={cx("textLogo")}>HOME FIX</p></span>
                                    </div>
                                    <form>
                                        <div className="row">
                                            <h6>Thông tin khác hàng</h6>
                                            <div className="col-md-6 mb-4">
                                                <div className="form-floating mb-3">
                                                    <input type="text" className={`form-control ${cx("inputForm")}`} placeholder="name@example.com" />
                                                    <label htmlFor="floatingInput">Họ và tên</label>
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <div className="form-floating mb-3">
                                                    <input type="text" className={`form-control ${cx("inputForm")}`} placeholder="name@example.com" />
                                                    <label htmlFor="floatingInput">Địa chỉ</label>
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <div className="form-floating mb-3">
                                                    <input type="text" className={`form-control ${cx("inputForm")}`} placeholder="name@example.com" />
                                                    <label htmlFor="floatingInput">Số điện thoại</label>
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <div className="form-floating mb-3">
                                                    <input type="text" className={`form-control ${cx("inputForm")}`} placeholder="name@example.com" />
                                                    <label htmlFor="floatingInput">Email</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <h6>Thông tin thiết bị</h6>
                                            <div className="col-md-6 mb-4">
                                                <div className="form-floating mb-3">
                                                    <input type="text" className={`form-control ${cx("inputForm")}`} placeholder="name@example.com" />
                                                    <label htmlFor="floatingInput">Loại thiết bị</label>
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <div className="form-floating mb-3">
                                                    <input type="text" className={`form-control ${cx("inputForm")}`} placeholder="name@example.com" />
                                                    <label htmlFor="floatingInput">Thương hiệu</label>
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <div className="form-floating mb-3">
                                                    <input type="text" className={`form-control ${cx("inputForm")}`} placeholder="name@example.com" />
                                                    <label htmlFor="floatingInput">Mô hình</label>
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <div className="form-floating">
                                                    <textarea className={`form-control ${cx("inputForm")}`} placeholder="Leave a comment here" id="floatingTextarea2"></textarea>
                                                    <label htmlFor="floatingTextarea2">Comments</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <h6>Thời gian sửa chữa</h6>
                                            <div className="col-md-6 mb-4 pb-2">
                                                <div className="form-outline">
                                                    <label className="form-label" htmlFor="dayRepair">
                                                        Ngày sửa chữa
                                                    </label>
                                                    <input
                                                        type="date"
                                                        id="dayRepair"
                                                        className={`form-control ${cx("inputForm")}`}
                                                    />

                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-4 pb-2">
                                                <div className="form-outline">
                                                    <p className="mb-2 pb-1">Thời gian sửa chữa </p>
                                                    <div className="form-check form-check-inline">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="inlineRadioOptions"
                                                            id="femaleGender"
                                                            defaultValue="option1"
                                                            defaultChecked=""
                                                        />
                                                        <label className="form-check-label" htmlFor="femaleGender">
                                                            Sáng
                                                        </label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="inlineRadioOptions"
                                                            id="femaleGender"
                                                            defaultValue="option1"
                                                            defaultChecked=""
                                                        />
                                                        <label className="form-check-label" htmlFor="femaleGender">
                                                            Trưa
                                                        </label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="inlineRadioOptions"
                                                            id="femaleGender"
                                                            defaultValue="option1"
                                                            defaultChecked=""
                                                        />
                                                        <label className="form-check-label" htmlFor="femaleGender">
                                                            Chiều
                                                        </label>
                                                    </div>


                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-inline">
                                            <button
                                                className={`d-inline ${cx("btnRepair")}`}
                                            >ĐĂNG KÝ</button>
                                            <button className={`d-inline ${cx("btnCancel")}`}>
                                                <Link className="text-decoration-none text-light" to="/">HỦY</Link>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}

export default FormRepair;