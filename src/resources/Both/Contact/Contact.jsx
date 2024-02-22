import styles from "./Contact.module.scss";
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faEnvelope, faMoneyBill1, faStar, faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faCalendarDay, faLocationDot, faPhone, faUsers } from "@fortawesome/free-solid-svg-icons";
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
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam illo tempora cum, consectetur adipisci soluta sit a hic architecto accusamus.
                </p>
            </section>
            <section className={`container ${cx("contactUser")}`}>
                <div className="row">
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
                </div>
            </section>
        </>
    );
}

export default Contact;