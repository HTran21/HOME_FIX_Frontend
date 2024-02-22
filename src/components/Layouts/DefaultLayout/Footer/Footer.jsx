import styles from "./Footer.module.scss";
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faLocationDot, faPhone, faNoteSticky, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <footer className={`text-center ${cx("footerBackground")}`}>

            <section className="d-flex justify-content-center justify-content-lg-between p-4">


            </section>
            <section>
                <div className="container text-center text-md-start mt-2">
                    <div className="row mt-3">
                        <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">

                            <h6 className={`text-uppercase fw-bold mb-4 `}>
                                About us
                            </h6>
                            <p>
                                Praesent tincidunt vulputate, Fusce non hendrerit ante. Curabitur in libero neque. Nulla at vestibulum massa. Fusce feugiat tellus fermentum lorem cursus, at vestibulum mentmt.
                            </p>
                        </div>
                        <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                            <p className={cx("textContactFooter")}>
                                <FontAwesomeIcon className={cx("iconFa")} icon={faPhone} styge={{ cogor: "#ffffff", }} />
                                Phone: +(084) 971 144 857</p>
                            <p className={cx("textContactFooter")}>
                                <FontAwesomeIcon className={cx("iconFa")} icon={faNoteSticky} style={{ color: "#ffffff", }} />
                                Fax: +(084) 880 140 231</p>
                            <p className={cx("textContactFooter")}>
                                <FontAwesomeIcon className={cx("iconFa")} icon={faEnvelope} style={{ color: "#ffffff", }} />
                                Email: homefix@gmail.com</p>
                            <p className={cx("textContactFooter")}>
                                <FontAwesomeIcon className={cx("iconFa")} icon={faLocationDot} style={{ color: "#ffffff", }} />
                                Address: 124BP, Lacasa Ave New York</p>



                        </div>
                        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4 ">

                            <h6 className="text-uppercase fw-bold mb-4">
                                Link
                            </h6>
                            <p>
                                <a className={cx("linkFooter")}>Home</a>
                            </p>
                            <p>
                                <a className={cx("linkFooter")}>Service</a>
                            </p>
                            <p>
                                <a className={cx("linkFooter")}>About</a>
                            </p>
                            <p>
                                <a className={cx("linkFooter")}>Blog</a>
                            </p>
                        </div>
                        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">
                                RECENT POSTS
                            </h6>
                            <p>
                                <a className={cx("linkFooter")}>Hello world</a>
                            </p>
                            <p>
                                <a className={cx("linkFooter")}>Vestibulum risus nulla</a>
                            </p>
                            <p>
                                <a className={cx("linkFooter")}>Aenean rutrum dolor nibh</a>
                            </p>
                            <p>
                                <a className={cx("linkFooter")}>Maecenas massa eu blandit</a>
                            </p>

                        </div>
                    </div>
                </div>
            </section>
            <div className="text-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                © 2024 appliance All rights reserved
            </div>
        </footer>
    );
}

export default Footer;