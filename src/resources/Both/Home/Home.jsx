import styles from "./Home.module.scss";
import classNames from 'classnames/bind';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Accordion from 'react-bootstrap/Accordion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function HomePage() {
    const settings = {
        infinite: true,
        speed: 5000,
        autoplay: true,
        autoplaySpeed: 2000,
        slidesToShow: 5,
        slidesToScroll: 3,
        pauseOnHover: true,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,
                    infinite: true,
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    // initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    const singleItem = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
        <>
            <section className={cx("introHomePage")}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-lg-6">
                            <div className={cx("titleIntro")}>
                                <h1 >CHÚNG TÔI CUNG CẤP DỊCH VỤ MỖI NGÀY</h1>
                            </div>
                            <div className={cx("line")} ></div>
                            <h4>Chúng tôi ưu tiên cung cấp các dịch vụ linh hoạt để đáp ứng nhu cầu của bạn</h4>
                            <button className={cx("btnGet")}><Link className="text-decoration-none text-light" to="/repair">Đăng ký sửa chữa ngay</Link></button>
                        </div>
                        <div className="col-md-6 col-lg-6 d-none d-lg-block">
                            <img className={cx("imgHomePage")} src="../illustration/repairman.png" alt="" />
                        </div>
                    </div>
                </div>
            </section>
            <section className={cx("logoBrand")}>
                <div className="container mt-4">
                    <Slider {...settings}>
                        <div>
                            <img className={cx("imageBrand")} src="../logoBrand/LG.png" alt="" />
                        </div>
                        <div>
                            <img className={cx("imageBrand")} src="../logoBrand/MISUBISHI.png" alt="" />
                        </div>
                        <div>
                            <img className={cx("imageBrand")} src="../logoBrand/PANASONIC.png" alt="" />
                        </div>
                        <div>
                            <img className={cx("imageBrand")} src="../logoBrand/SAMSUNG.png" alt="" />
                        </div>
                        <div>
                            <img className={cx("imageBrand")} src="../logoBrand/SONY.png" alt="" />
                        </div>
                        <div>
                            <img className={cx("imageBrand")} src="../logoBrand/TOSHIBA.png" alt="" />
                        </div>
                        <div>
                            <img className={cx("imageBrand")} src="../logoBrand/XIAOMI.png" alt="" />
                        </div>
                    </Slider>

                </div>
            </section>
            <section className={cx("serviceList")}>
                <div className="container">
                    <div className="row mt-5">
                        <div className="col">
                            <div className={cx("service")}>
                                <div className={cx("leftService")}>
                                    <img className={cx("imgService")} src="../icon/washing-machine.png" alt="" />
                                </div>
                                <div className={cx("rightService")}>
                                    <div className={cx("titleService")}>
                                        Washing Machine Repair
                                    </div>
                                    <div className="detailService">
                                        Fusce non hendrerit ante. Curabitur in libero neque. Nulla at vestibulum massa. Fusce feugiat tellus fermen tum.
                                    </div></div>
                            </div>

                        </div>
                        <div className="col">
                            <div className={cx("service")}>
                                <div className={cx("leftService")}>
                                    <img className={cx("imgService")} src="../icon/coffee-machine.png" alt="" />
                                </div>
                                <div className={cx("rightService")}>
                                    <div className={cx("titleService")}>
                                        Washing Machine Repair
                                    </div>
                                    <div className="detailService">
                                        Fusce non hendrerit ante. Curabitur in libero neque. Nulla at vestibulum massa. Fusce feugiat tellus fermen tum.
                                    </div></div>
                            </div>

                        </div>
                        <div className="col">
                            <div className={cx("service")}>
                                <div className={cx("leftService")}>
                                    <img className={cx("imgService")} src="../icon/cooker.png" alt="" />
                                </div>
                                <div className={cx("rightService")}>
                                    <div className={cx("titleService")}>
                                        Washing Machine Repair
                                    </div>
                                    <div className="detailService">
                                        Fusce non hendrerit ante. Curabitur in libero neque. Nulla at vestibulum massa. Fusce feugiat tellus fermen tum.
                                    </div></div>
                            </div>

                        </div>

                    </div>
                    <div className="row mt-5">
                        <div className="col">
                            <div className={cx("service")}>
                                <div className={cx("leftService")}>
                                    <img className={cx("imgService")} src="../icon/fridge.png" alt="" />
                                </div>
                                <div className={cx("rightService")}>
                                    <div className={cx("titleService")}>
                                        Washing Machine Repair
                                    </div>
                                    <div className="detailService">
                                        Fusce non hendrerit ante. Curabitur in libero neque. Nulla at vestibulum massa. Fusce feugiat tellus fermen tum.
                                    </div></div>
                            </div>

                        </div>
                        <div className="col">
                            <div className={cx("service")}>
                                <div className={cx("leftService")}>
                                    <img className={cx("imgService")} src="../icon/induction-stove.png" alt="" />
                                </div>
                                <div className={cx("rightService")}>
                                    <div className={cx("titleService")}>
                                        Washing Machine Repair
                                    </div>
                                    <div className="detailService">
                                        Fusce non hendrerit ante. Curabitur in libero neque. Nulla at vestibulum massa. Fusce feugiat tellus fermen tum.
                                    </div></div>
                            </div>

                        </div>
                        <div className="col">
                            <div className={cx("service")}>
                                <div className={cx("leftService")}>
                                    <img className={cx("imgService")} src="../icon/application.png" alt="" />
                                </div>
                                <div className={cx("rightService")}>
                                    <div className={cx("titleService")}>
                                        Washing Machine Repair
                                    </div>
                                    <div className="detailService">
                                        Fusce non hendrerit ante. Curabitur in libero neque. Nulla at vestibulum massa. Fusce feugiat tellus fermen tum.
                                    </div></div>
                            </div>

                        </div>

                    </div>
                </div>
            </section>
            <section className="mb-5">
                <Slider {...settings}>
                    <div >
                        <img className={cx("imageRepair")} src="../public/imagerepair/image2.jpg" alt="" />

                    </div>
                    <div >
                        <img className={cx("imageRepair")} src="../public/imagerepair/image3.jpg" alt="" />

                    </div>
                    <div >
                        <img className={cx("imageRepair")} src="../public/imagerepair/image4.jpg" alt="" />

                    </div>
                    <div >
                        <img className={cx("imageRepair")} src="../public/imagerepair/image5.jpg" alt="" />

                    </div>
                    <div >
                        <img className={cx("imageRepair")} src="../public/imagerepair/image6.jpg" alt="" />

                    </div>
                    <div >
                        <img className={cx("imageRepair")} src="../public/imagerepair/image7.jpg" alt="" />

                    </div>

                </Slider>
            </section>

            <section className={cx("responeUser")}>
                <Slider {...singleItem} className="container">
                    <div className={cx("comment")}>
                        <div className={cx("contentComment")}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam incidunt ipsam voluptas veritatis ab! Libero esse corporis iusto assumenda culpa modi fuga, magnam autem quaerat ipsum similique deleniti possimus corrupti?
                        </div>
                        <div className={cx("userComment")}>
                            Alexander Mitarono
                        </div>
                    </div>
                    <div className={cx("comment")}>
                        <div className={cx("contentComment")}>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus nobis necessitatibus, beatae consequuntur debitis tempora iusto cum, optio quod magnam, laboriosam vel ipsa?
                        </div>
                        <div className={cx("userComment")}>
                            Leonard Jane
                        </div>
                    </div>
                    <div className={cx("comment")}>
                        <div className={cx("contentComment")}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum laborum voluptate consectetur illo placeat adipisci?
                        </div>
                        <div className={cx("userComment")}>
                            Harvey Stephen
                        </div>
                    </div>
                    <div className={cx("comment")}>
                        <div className={cx("contentComment")}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, necessitatibus.
                        </div>
                        <div className={cx("userComment")}>
                            Dennis Jyotsna
                        </div>
                    </div>

                </Slider>
            </section>

            <section className={cx("question")}>
                <div className="row">
                    <div className="col-5">

                    </div>
                    <div className={`col-7 ${cx("rightQuestion")}`}>
                        <p className={cx("textQuestion")}>You’ve got questions, we’ve got answers.</p>
                        <div className={cx("line")}></div>
                        <div className="contentQuestion mt-4 mb-4">
                            <Accordion className={cx("aboutQuestion")} >
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Accordion Item #1</Accordion.Header>
                                    <Accordion.Body className="bg-transparent">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                        culpa qui officia deserunt mollit anim id est laborum.
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>Accordion Item #2</Accordion.Header>
                                    <Accordion.Body>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                        culpa qui officia deserunt mollit anim id est laborum.
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="2">
                                    <Accordion.Header>Accordion Item #3</Accordion.Header>
                                    <Accordion.Body>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                        culpa qui officia deserunt mollit anim id est laborum.
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                    </div>
                </div>
            </section>
            <section className="ourNews mb-5 container">
                <div className="tiltleOurNews">
                    <h1 className="text-center">Tin tức gần đây </h1>
                    <div className={`m-auto mb-3 mt-3 ${cx("line")}`}></div>
                    <div className={cx("contentOurNews")}>
                        <div className="row">
                            <div className="col">
                                <div className={cx("cardNews")}>
                                    <div className={cx("imgCard")}>
                                        <img src="../public/imagerepair/image2.jpg" alt="" />
                                    </div>
                                    <div className={cx("contentCard")}>
                                        <p className="dateNews mb-0 d-flex align-items-center" style={{ fontSize: "14px" }}>
                                            Nov, 17, 2016 - root - Uncategorized
                                        </p>
                                        <div className="detailNews mt-2">
                                            <h4>Hello world!</h4>
                                            Welcome to WordPress. This is your first post. Edit or delete it, then start writing!
                                        </div>
                                        <div className={cx("btnCard")}>Đọc thêm <FontAwesomeIcon icon={faChevronRight} /></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className={cx("cardNews")}>
                                    <div className={cx("imgCard")}>
                                        <img src="../public/imagerepair/image2.jpg" alt="" />
                                    </div>
                                    <div className={cx("contentCard")}>
                                        <p className="dateNews mb-0 d-flex align-items-center" style={{ fontSize: "14px" }}>
                                            Nov, 17, 2016 - root - Uncategorized
                                        </p>
                                        <div className="detailNews mt-2">
                                            <h4>Hello world!</h4>
                                            Welcome to WordPress. This is your first post. Edit or delete it, then start writing!
                                        </div>
                                        <div className={cx("btnCard")}>Đọc thêm <FontAwesomeIcon icon={faChevronRight} /></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className={cx("cardNews")}>
                                    <div className={cx("imgCard")}>
                                        <img src="../public/imagerepair/image2.jpg" alt="" />
                                    </div>
                                    <div className={cx("contentCard")}>
                                        <p className="dateNews mb-0 d-flex align-items-center" style={{ fontSize: "14px" }}>
                                            Nov, 17, 2016 - root - Uncategorized
                                        </p>
                                        <div className="detailNews mt-2">
                                            <h4>Hello world!</h4>
                                            Welcome to WordPress. This is your first post. Edit or delete it, then start writing!
                                        </div>
                                        <div className={cx("btnCard")}>Đọc thêm <FontAwesomeIcon icon={faChevronRight} /></div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </>


    );
}

export default HomePage;