import styles from "./Test.module.scss";
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Test() {
    return (
        <section className="vh-100 gradient-custom">
            <div className="container h-100">
                <div className="row justify-content-center align-items-center h-100">
                    <div className="col-12 col-lg-9 col-xl-7">
                        <div
                            className="card shadow-2-strong card-registration"
                            style={{ borderRadius: 15 }}
                        >
                            <div className="card-body p-3 p-md-4">
                                <div style={{
                                    display: "flex",
                                    alignItems: "center"
                                }}>
                                    <h3 style={{
                                        fontFamily: "'Reem Kufi', sans-serif",
                                        fontWeight: "bold"
                                    }}>ĐƠN SỬA CHỮA</h3>
                                    <span className="h1 ms-auto "><img style={{
                                        width: "50px",
                                        display: "inline-block"
                                    }} src="../../image/logo/logo8.png" alt="" />
                                        <p style={{
                                            fontWeight: "bold",
                                            fontFamily: "'Reem Kufi', sans-serif",
                                            display: "inline-block",
                                            fontSize: "26px",
                                            marginLeft: "5px",
                                        }}>HOME FIX</p></span>
                                </div>

                                <div className="row mb-2 mt-2" >
                                    <h6 className="mb-2">Thông tin khác hàng</h6>
                                    <div className="col-md-6 mb-2">

                                        <p style={{ fontSize: "15px" }} ><span style={{
                                            fontWeight: "bold"
                                        }}>Họ và tên: </span>Trần Hoàng Trân</p>
                                    </div>

                                    <div className="col-md-6 mb-2">

                                        <p style={{ fontSize: "15px" }} ><span style={{
                                            fontWeight: "bold"
                                        }}>Địa chỉ: </span>Đường số 2, Phường 3, Quận Ninh Kiều, Thành Phố Cần Thơ</p>
                                    </div>
                                    <div className="col-md-6 mb-2">

                                        <p style={{ fontSize: "15px" }} ><span style={{
                                            fontWeight: "bold"
                                        }}>Số điện thoại </span>0987654321</p>
                                    </div>
                                    <div className="col-md-6 mb-2">

                                        <p style={{ fontSize: "15px" }} ><span style={{
                                            fontWeight: "bold"
                                        }}>Email: </span>tranhoangtran22225@gmail.com</p>
                                    </div>
                                </div>
                                <hr className="border-secondary m-1" />
                                <div className="row mb-2 mt-2">
                                    <h6 className="mb-2">Dịch vụ mong muốn</h6>
                                    <div className="col-md-6 mb-2">

                                        <p style={{ fontSize: "15px" }} ><span style={{
                                            fontWeight: "bold"
                                        }}>Dịch vụ: </span>Dịch vụ sửa chữa</p>
                                    </div>

                                </div>
                                <hr className="border-secondary m-1" />

                                <div className="row mb-2 mt-2">
                                    <h6 className="mb-2">Thông tin thiết bị</h6>
                                    <div className="row">
                                        <div className="col-md-6 mb-2">

                                            <p style={{ fontSize: "15px" }} ><span style={{
                                                fontWeight: "bold"
                                            }}>Nhãn hàng: </span>Samsung</p>
                                        </div>
                                        <div className="col-md-6 mb-2">

                                            <p style={{ fontSize: "15px" }} ><span style={{
                                                fontWeight: "bold"
                                            }}>Loại thiết bị: </span>Máy giặt</p>
                                        </div>
                                        <div className="col-md-6 mb-2">

                                            <p style={{ fontSize: "15px" }} ><span style={{
                                                fontWeight: "bold"
                                            }}>Thiết bị: </span>Máy giặt LG cửa đơn 12 Kg</p>
                                        </div>
                                        <div className="col-md-6 mb-2">

                                            <p style={{ fontSize: "15px" }} ><span style={{
                                                fontWeight: "bold"
                                            }}>Mô tả lỗi: </span>Máy giặt bị rung lắc</p>
                                        </div>
                                    </div>
                                </div>
                                <hr className="border-secondary m-1" />
                                <div className="row">
                                    <h6 className="mb-2">Thời gian sửa chữa</h6>
                                    <div className="col-md-6 mb-2">

                                        <p style={{ fontSize: "15px" }} ><span style={{
                                            fontWeight: "bold"
                                        }}>Ngày sửa chữa: </span>10/04/2024</p>
                                    </div>
                                    <div className="col-md-6 mb-2">

                                        <p style={{ fontSize: "15px" }} ><span style={{
                                            fontWeight: "bold"
                                        }}>Thời gian dự kiến: </span>7:00 - 8:00</p>
                                    </div>

                                </div>
                                <hr className="border-secondary m-1" />
                                <div className="row mb-2 mt-2" >
                                    <h6 className="mb-2">Thông tin thợ</h6>
                                    <div className="col-md-6 mb-2">

                                        <p style={{ fontSize: "15px" }} ><span style={{
                                            fontWeight: "bold"
                                        }}>Họ và tên: </span>Trần Trung Trực</p>
                                    </div>

                                    <div className="col-md-6 mb-2">

                                        <p style={{ fontSize: "15px" }} ><span style={{
                                            fontWeight: "bold"
                                        }}>Số điện thoại: </span>0987456321</p>
                                    </div>
                                    <div className="col-md-6 mb-2">

                                        <p style={{ fontSize: "15px" }} ><span style={{
                                            fontWeight: "bold"
                                        }}>Email: </span>trungtruc@gmail.com</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Test;