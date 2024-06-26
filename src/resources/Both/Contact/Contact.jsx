import styles from "./Contact.module.scss";
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDay, faLocationDot, faEnvelope, faPhoneVolume, faClock } from "@fortawesome/free-solid-svg-icons";
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

const cx = classNames.bind(styles);

function Contact() {

    return (
        <>
            <div className={cx("titleContact")}>
                <h1>CONTACT</h1>
                <h6 className={"mt-4"}>HOME / CONTACT</h6>
            </div>
            <section className={cx("introContact")}>
                <h2>VĂN PHÒNG CHÚNG TÔI</h2>
                <p className={cx("desIntro")}>
                    Hãy liên hệ với chúng tôi, bạn sẽ được tận hưởng những dịch vụ tuyệt vời mà bạn chưa từng trải nghiệm. Mọi thứ chúng
                    tôi tạo ra sẽ khiến bạn hài lòng
                </p>
            </section>
            <section className={`container ${cx("contactUser")}`}>
                <div className="row">
                    <div className="col-lg-3 col-md-6">
                        <div className={cx("cardInfor")}>
                            <div className={cx("iconInfor")}>
                                <FontAwesomeIcon icon={faPhoneVolume} />
                            </div>
                            <div className={cx("contentInfor")}>
                                <div className={cx("titleContent")}>
                                    Số điện thoại
                                </div>
                                <p>(+84) 0971144857</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className={cx("cardInfor")}>
                            <div className={cx("iconInfor")}>
                                <FontAwesomeIcon icon={faEnvelope} />
                            </div>
                            <div className={cx("contentInfor")}>
                                <div className={cx("titleContent")}>
                                    Email
                                </div>
                                <p>homefix@gmail.com</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className={cx("cardInfor")}>
                            <div className={cx("iconInfor")}>
                                <FontAwesomeIcon icon={faLocationDot} />
                            </div>
                            <div className={cx("contentInfor")}>
                                <div className={cx("titleContent")}>
                                    Địa chỉ
                                </div>
                                <p>Đường số 10,Quận Ninh Kiều, TP.Cần Thơ</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-6">
                        <div className={cx("cardInfor")}>
                            <div className={cx("iconInfor")}>
                                <FontAwesomeIcon icon={faClock} />
                            </div>
                            <div className={cx("contentInfor")}>
                                <div className={cx("titleContent")}>
                                    Mở cửa
                                </div>
                                <p>8:00-17:00</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="row">
                    <div className="col-lg-6 col-md-5 col-sm-12">
                        <div className="row">
                            <div className="col-lg-6 col-sm-12">
                                <div className={cx("titleAdress")}>
                                    TP.Hồ Chí Minh
                                </div>
                                <div className={cx("contentAddress")}>
                                    <div className="mt-3 mb-3">
                                        <FontAwesomeIcon className={cx("iconAddress")} icon={faLocationDot} />
                                        Địa chỉ: Số 9, Đường 10, Quận Bình Thạnh, Thành phố Hồ Chí Minh
                                    </div>
                                    <div className="mb-3">
                                        <FontAwesomeIcon className={cx("iconAddress")} icon={faEnvelope} />
                                        Email: homefix@gmail.com
                                    </div>
                                    <div className="mb-3">
                                        <FontAwesomeIcon className={cx("iconAddress")} icon={faPhone} />
                                        Số điện thoại: +84 0978646315
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-sm-12">
                                <div className={cx("titleAdress")}>
                                    TP.Cần Thơ
                                </div>
                                <div className={cx("contentAddress")}>
                                    <div className="mt-3 mb-3">
                                        <FontAwesomeIcon className={cx("iconAddress")} icon={faLocationDot} />
                                        Địa chỉ: Số 9, Đường 10, Quận Ninh Kiều, Thành phố Cần Thơ
                                    </div>
                                    <div className="mb-3">
                                        <FontAwesomeIcon className={cx("iconAddress")} icon={faEnvelope} />
                                        Email: homefix@gmail.com
                                    </div>
                                    <div className="mb-3">
                                        <FontAwesomeIcon className={cx("iconAddress")} icon={faPhone} />
                                        Số điện thoại: +84 0978654785
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-7 col-sm-12 pe-5">
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">

                                <Form.Control className="p-2" type="text" placeholder="Username" />

                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">

                                <Form.Control className="p-2" type="email" placeholder="Email" />

                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">

                                <Form.Control className="p-2" type="text" placeholder="Vấn Đề" />

                            </Form.Group>
                            <FloatingLabel controlId="floatingTextarea2" label="Comments">
                                <Form.Control
                                    as="textarea"
                                    placeholder="Leave a comment here"
                                    style={{ height: '100px' }}
                                />
                            </FloatingLabel>
                            <button className={cx("btnSend")}>Gửi</button>

                        </Form>
                    </div>
                </div> */}
            </section >
        </>
    );
}

export default Contact;