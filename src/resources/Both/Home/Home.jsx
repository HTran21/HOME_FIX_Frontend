import styles from "./Home.module.scss";
import classNames from 'classnames/bind';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Accordion from 'react-bootstrap/Accordion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import axios from '../../../service/customize_axios';
import moment from 'moment';

const cx = classNames.bind(styles);

function HomePage() {

    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const user = useSelector((state) => state.user.user);
    const [listService, setListService] = useState();
    const [listComment, setListComment] = useState();

    const fetchService = () => {
        axios.get("http://localhost:3000/service/getService")
            .then(res => {
                setListService(res.data.listService);
            })
            .catch(error => {
                console.error("Error fetching service data:", error);
            });
    };
    useEffect(() => {
        fetchService()
    }, [])


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
                            <button className={cx("btnGet")}>
                                {user.role === 'KH' ? (
                                    <Link className="text-decoration-none text-light" to={isAuthenticated ? '/repair' : '/login'}>Đăng ký sửa chữa ngay</Link>
                                ) : (
                                    <span className="text-light">Đăng ký sửa chữa ngay</span>
                                )}
                            </button>
                        </div>
                        <div className="col-md-6 col-lg-6 d-none d-lg-block">
                            <img className={cx("imgHomePage")} src="../illustration/repairmanNew.png" alt="" />

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
                                        Sửa Chữa Máy Giặt
                                    </div>
                                    <div className="detailService">
                                        Sửa chữa và bảo trì máy giặt để duy trì hoạt động tối ưu và kéo dài tuổi thọ.
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
                                        Sửa Chữa Máy Pha Cafe
                                    </div>
                                    <div className="detailService">
                                        khắc phục sự cố và bảo dưỡng để đảm bảo hiệu suất tốt nhất
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
                                        Sửa Chữa Lò Nướng
                                    </div>
                                    <div className="detailService">
                                        Chuyên nghiệp, đáng tin cậy để duy trì hiệu suất và an toàn
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
                                        Sửa Chữa Tủ Lạnh
                                    </div>
                                    <div className="detailService">
                                        Đảm bảo tủ lạnh hoạt động ổn định và bảo quản thực phẩm tốt
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
                                        Sửa Chữa Bếp Điện
                                    </div>
                                    <div className="detailService">
                                        Sửa chữa, bảo dưỡng và nâng cấp bếp điện để đảm bảo hoạt động an toàn
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
                                        Sửa Chữa Mọi Thiết Bị
                                    </div>
                                    <div className="detailService">
                                        Sửa chữa, bảo trì, cải tiến mọi thiết bị để giữ chúng hoạt động mạnh mẽ, hiệu quả
                                    </div></div>
                            </div>

                        </div>

                    </div>
                </div>
            </section>
            <section className="mb-5" style={{ overflow: "hidden" }}>
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
                            Hệ thống sửa chữa đa dạng, từ máy móc đến điện tử, đảm bảo tiện ích cho mọi gia đình
                        </div>
                        <div className={cx("userComment")}>
                            Trần Hoàng Trân
                        </div>
                    </div>
                    <div className={cx("comment")}>
                        <div className={cx("contentComment")}>
                            Chất lượng dịch vụ hàng đầu, đội ngũ kỹ thuật viên chuyên nghiệp, luôn sẵn lòng hỗ trợ.
                        </div>
                        <div className={cx("userComment")}>
                            Trần Trường Duy
                        </div>
                    </div>
                    <div className={cx("comment")}>
                        <div className={cx("contentComment")}>
                            Phản hồi nhanh chóng, giải quyết vấn đề một cách chuyên nghiệp, tiết kiệm thời gian và công sức.
                        </div>
                        <div className={cx("userComment")}>
                            Bùi Tuấn Kiệt
                        </div>
                    </div>
                    <div className={cx("comment")}>
                        <div className={cx("contentComment")}>
                            Sự lựa chọn hoàn hảo cho việc bảo dưỡng và sửa chữa thiết bị, mang lại sự yên tâm và hài lòng cho khách hàng.
                        </div>
                        <div className={cx("userComment")}>
                            Phan Đài Cát
                        </div>
                    </div>
                </Slider>
            </section>

            <section className={cx("question")}>
                <div className="row">
                    <div className="col-5">

                    </div>
                    <div className={`col-lg-7 ${cx("rightQuestion")}`}>
                        <p className={cx("textQuestion")}>Bạn có câu hỏi, chúng tôi có câu trả lời</p>
                        <div className={cx("line")}></div>
                        <div className="contentQuestion mt-4 mb-4">
                            <Accordion className={cx("aboutQuestion")} >
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Hệ thống sửa chữa tại nhà là gì?</Accordion.Header>
                                    <Accordion.Body className="bg-transparent">
                                        Hệ thống sửa chữa tại nhà là một nền tảng kết nối giữa người sửa chữa và người cần sửa chữa. Người dùng có thể yêu cầu dịch vụ sửa chữa cho các vấn đề liên quan đến nhà cửa, thiết bị điện tử, cơ điện, cơ khí, và nhiều hạng mục khác. Hệ thống cung cấp một giao diện để người dùng tạo yêu cầu, lựa chọn dịch vụ, đặt lịch, và thanh toán trực tuyến.
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>Lợi ích của việc sử dụng hệ thống sửa chữa tại nhà là gì?</Accordion.Header>
                                    <Accordion.Body>
                                        <ul>
                                            <li>Hệ thống sửa chữa tại nhà mang lại sự tiện lợi cho người dùng bằng cách đặt lịch trực tuyến và chờ kỹ thuật viên đến tận nơi.</li>
                                            <li>Cung cấp một loạt các dịch vụ sửa chữa từ điện tử đến gia dụng và vệ sinh.</li>
                                            <li>Giúp tiết kiệm chi phí bằng cách cung cấp các dịch vụ với mức giá cạnh tranh.</li>
                                        </ul>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="2">
                                    <Accordion.Header>Các tính năng chính của hệ thống sửa chữa tại nhà là gì?</Accordion.Header>
                                    <Accordion.Body>
                                        <ul>
                                            <li>Các tính năng quan trọng bao gồm đặt lịch trực tuyến, thanh toán trực tuyến và chức năng đánh giá dịch vụ.</li>
                                            <li>Thanh toán trực tuyến cung cấp sự an toàn và tiện lợi, giúp tiết kiệm thời gian và tránh rủi ro khi mang theo tiền mặt.</li>
                                        </ul>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                    </div>
                </div>
            </section>
            <section className="ourNews mb-5 container">
                <div className="tiltleOurNews">
                    <h1 className="text-center">Bài viết gần đây</h1>
                    <div className={`m-auto mb-3 mt-3 ${cx("line")}`}></div>
                    <div className={cx("contentOurNews")}>
                        <div className="row">
                            {listService?.map((service, index) => (
                                <div key={index} className="col">
                                    <div className={cx("cardNews")}>
                                        <div className={cx("imgCard")}>
                                            <img src={`http://localhost:3000/${service.logoService}`} alt="" />
                                        </div>
                                        <div className={cx("contentCard")}>
                                            <p className="dateNews mb-0 d-flex align-items-center" style={{ fontSize: "14px" }}>
                                                {moment(service.createdAt).format("DD/MM/YYYY HH:mm")}
                                            </p>
                                            <div className="detailNews mt-2">
                                                <h4>{service.nameService}</h4>

                                            </div>
                                            <Link className={cx("btnCard")} to={`/service/detail/${service.id}`} key={index}>
                                                Đọc thêm <FontAwesomeIcon icon={faChevronRight} />
                                            </Link>
                                            {/* <div className={cx("btnCard")}>Đọc thêm <FontAwesomeIcon icon={faChevronRight} /></div> */}
                                        </div>
                                    </div>
                                </div>
                            ))}


                        </div>
                    </div>
                </div>
            </section>
        </>


    );
}

export default HomePage;