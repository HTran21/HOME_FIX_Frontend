import styles from "./Service.module.scss";
import classNames from 'classnames/bind';
import { Tabs } from 'antd';
const { TabPane } = Tabs;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faMoneyBill1, faStar, faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faCalendarDay, faUsers, faScrewdriverWrench, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import axios from '../../../service/customize_axios';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function Service() {

    const [listService, setListService] = useState();

    const fetchData = () => {
        axios.get("http://localhost:3000/service/getService")
            .then(res => {
                // console.log("list service", res.data.listService)
                setListService(res.data.listService)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    useEffect(() => {
        fetchData();
    }, [])

    const onChange = (key) => {
    };
    const items = [
        {
            key: '1',
            label: 'Đảm bảo chất lượng',
            children: (
                <div>
                    <p>Chất lượng là nỗi ám ảnh của chúng tôi hôm nay và nút chỉnh sửa ngày mai để thay đổi văn bản này.
                        Khách hàng rất quan trọng, khách hàng sẽ được khách hàng theo đuổi.
                        Là đất của đất, là tang vật cũng không phải là hạ thi của đất, là gối của sư tử.s</p>
                    <img src="https://themes.webdevia.com/appliance/wp-content/uploads/2016/11/badge_pc-1-100x100.png" alt="Tab 1" style={{ width: "80px" }} />
                    <img src="https://themes.webdevia.com/appliance/wp-content/uploads/2016/11/BBB_logo-1.png" alt="Tab 1" />
                </div>
            ),
        },
        {
            key: '2',
            label: 'Dịch vụ cùng ngày',
            children: (
                <div>
                    <p>Tôi là một khối văn bản. Nhấp vào nút chỉnh sửa để thay đổi văn bản này. Khách hàng rất quan trọng, khách hàng sẽ được khách hàng theo đuổi.
                        Là đất của đất, là tang vật cũng không phải là hạ thi của đất, là gối của sư tử.</p>
                </div>
            ),
        }
    ];
    return (
        <>
            <div className={cx("titleService")}>
                <h1>SERVICE</h1>
                <h6 className={"mt-4"}>HOME / SERVICE</h6>
            </div>
            <section className={cx("ourService")}>
                <div className="container">
                    <div className={cx("titleOurService")}>
                        <p className={cx("textTiltle")}><FontAwesomeIcon className={cx("iconTitle")} icon={faScrewdriverWrench} />Dịch vụ của chúng tôi</p>
                        <h1 className="m-auto w-75">Chúng tôi cung cấp giải pháp cải tạo sửa chữa thiết bị</h1>
                    </div>
                    <div className={cx("listService")}>
                        <div className="row ">
                            {listService?.map((service, i) => (
                                <div className="col-lg-3 col-md-4 col-sm-12 mt-2" key={i}>
                                    <div className={cx("detailService")}>
                                        <img className={cx("imageService")} src={`http://localhost:3000/${service.logoService}`} alt="" />
                                        <div className={cx("titleDetailService")}>{service.nameService}</div>
                                        <Link className="text-decoration-none" to={`/detail/${service.id}`}><div className={cx("viewDetailService")}>XEM CHI TIẾT<FontAwesomeIcon className={cx("iconDetailService")} icon={faArrowRight} /></div></Link>

                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </section>
            <section className={`container ${cx("introService")}`}>
                <div className="row ">
                    <div className="col-lg-5">
                        <div className={cx("imageIntroService")}>
                            <img src="https://themes.webdevia.com/appliance/wp-content/uploads/2016/11/man-1-900x1000.jpg" alt="" />
                        </div>
                    </div>
                    <div className="col-lg-7">
                        <div className="contentIntro mt-5">
                            <h3>CHÚNG TÔI LÀM BẠN YÊU THÍCH THIẾT BIỆT CỦA BẠN!</h3>
                            <h6>Hôm nay không phải ngày mai</h6>
                            <div className={cx("line")}></div>
                            <Tabs defaultActiveKey="1" tabPosition="left" items={items} onChange={onChange}>
                                {items.map((item) => (
                                    <TabPane key={item.key} tab={item.tab}>
                                        {item.content}
                                    </TabPane>
                                ))}
                            </Tabs>
                        </div>
                    </div>
                </div>
            </section>
            <section className={` ${cx("inforRepair")}`}>
                <div className="container">
                    <div className="row">
                        <div className={`m-auto col-lg-4 col-md-6 col-sm-12 ${cx("detailRepair")}`}>
                            <div className={cx("numberInfor")}>
                                365
                            </div>
                            <div className={cx("titleInfor")}>
                                DỰ ÁN ĐÃ THỰC HIỆN
                            </div>
                        </div>
                        <div className={`m-auto col-lg-4 col-md-6 col-sm-12 ${cx("detailRepair")}`}>
                            <div className={cx("numberInfor")}>
                                1956
                            </div>
                            <div className={cx("titleInfor")}>
                                KHÁCH HÀNG HÀI LÒNG
                            </div>
                        </div>
                        <div className={`m-auto col-lg-4 col-md-6 col-sm-12 ${cx("detailRepair")}`}>
                            <div className={cx("numberInfor")}>
                                458
                            </div>
                            <div className={cx("titleInfor")}>
                                CUỘC GỌI TUYỆT VỜI
                            </div>
                        </div>
                    </div>
                </div>

            </section>
            <section className={cx("posHomeFix")}>
                <div className="container">
                    <div className="row">

                        <div className="col-lg-4 col-md-6 col-sm-12">
                            <div className={cx("detailPos")}>
                                <div className={cx("iconPos")}>
                                    <FontAwesomeIcon icon={faMoneyBill1} />
                                </div>
                                <div className={cx("titlePos")}>
                                    TIẾT KIỆM TIỀN VỚI CHÚNG TÔI
                                </div>
                                <div className={cx("contentPos")}>
                                    Trước đây anh ấy không đến văn phòng.
                                    Trò chuyện miễn phí hoặc không. Không có khối lượng ở lối vào.
                                    Fusce feugiat đất fermen sau đó.
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12">
                            <div className={cx("detailPos")}>
                                <div className={cx("iconPos")}>
                                    <FontAwesomeIcon icon={faClock} />
                                </div>
                                <div className={cx("titlePos")}>
                                    DỊCH VỤ BẢO HÀNH 6 THÁNG
                                </div>
                                <div className={cx("contentPos")}>
                                    Trước đây anh ấy không đến văn phòng.
                                    Trò chuyện miễn phí hoặc không. Không có khối lượng ở lối vào.
                                    Fusce feugiat đất fermen sau đó.
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12">
                            <div className={cx("detailPos")}>
                                <div className={cx("iconPos")}>
                                    <FontAwesomeIcon icon={faUsers} />
                                </div>
                                <div className={cx("titlePos")}>
                                    KỸ THUẬT VIÊN KINH NGHIỆM
                                </div>
                                <div className={cx("contentPos")}>
                                    Trước đây anh ấy không đến văn phòng.
                                    Trò chuyện miễn phí hoặc không. Không có khối lượng ở lối vào.
                                    Fusce feugiat đất fermen sau đó.
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 col-sm-12">
                            <div className={cx("detailPos")}>
                                <div className={cx("iconPos")}>
                                    <FontAwesomeIcon icon={faThumbsUp} />
                                </div>
                                <div className={cx("titlePos")}>
                                    ĐẢM BẢO CHẤT LƯỢNG
                                </div>
                                <div className={cx("contentPos")}>
                                    Trước đây anh ấy không đến văn phòng.
                                    Trò chuyện miễn phí hoặc không. Không có khối lượng ở lối vào.
                                    Fusce feugiat đất fermen sau đó.
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12">
                            <div className={cx("detailPos")}>
                                <div className={cx("iconPos")}>
                                    <FontAwesomeIcon icon={faCalendarDay} />
                                </div>
                                <div className={cx("titlePos")}>
                                    DỊCH VỤ CÙNG NGÀY
                                </div>
                                <div className={cx("contentPos")}>
                                    Trước đây anh ấy không đến văn phòng.
                                    Trò chuyện miễn phí hoặc không. Không có khối lượng ở lối vào.
                                    Fusce feugiat đất fermen sau đó.
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12">
                            <div className={cx("detailPos")}>
                                <div className={cx("iconPos")}>
                                    <FontAwesomeIcon icon={faStar} />
                                </div>
                                <div className={cx("titlePos")}>
                                    DỊCH VỤ 5 SAO
                                </div>
                                <div className={cx("contentPos")}>
                                    Trước đây anh ấy không đến văn phòng.
                                    Trò chuyện miễn phí hoặc không. Không có khối lượng ở lối vào.
                                    Fusce feugiat đất fermen sau đó.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className={cx("priceService")}>
                <div className="container">
                    <div className={cx("titlePrice")}>
                        MỨC GIÁ
                    </div>
                    <div className={`row ${cx("listPrice")}`}>
                        <div className={`col-3 `}>
                            <div className={cx("detailPrice")}>
                                <div className={cx("titleDetailPrice")}>
                                    <p className="m-0">0-60 phút</p>
                                </div>
                                <div className={cx("contentDetailPrice")}>
                                    <div className={cx("priceDetailService")}>
                                        100.000VND
                                    </div>
                                    <div className={cx("desService")}>
                                        Lorem ipsum dolor sit amet
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className={`col-3 `}>
                            <div className={cx("detailPrice")}>
                                <div className={cx("titleDetailPrice")}>
                                    <p className="m-0">60 + phút</p>
                                </div>
                                <div className={cx("contentDetailPrice")}>
                                    <div className={cx("priceDetailService")}>
                                        150.000VND
                                    </div>
                                    <div className={cx("desService")}>
                                        Lorem ipsum dolor sit amet
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className={`col-3 `}>
                            <div className={cx("detailPrice")}>
                                <div className={cx("titleDetailPrice")}>
                                    <p className="m-0">TRONG TUẦN</p>
                                </div>
                                <div className={cx("contentDetailPrice")}>
                                    <div className={cx("priceDetailService")}>
                                        100.000VND
                                    </div>
                                    <div className={cx("desService")}>
                                        Lorem ipsum dolor sit amet
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className={`col-3 `}>
                            <div className={cx("detailPrice")}>
                                <div className={cx("titleDetailPrice")}>
                                    <p className="m-0">CUỐI TUẦN</p>
                                </div>
                                <div className={cx("contentDetailPrice")}>
                                    <div className={cx("priceDetailService")}>
                                        150.000VND
                                    </div>
                                    <div className={cx("desService")}>
                                        Lorem ipsum dolor sit amet
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

export default Service;