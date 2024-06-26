import styles from "./Service.module.scss";
import classNames from 'classnames/bind';
import { Tabs } from 'antd';
const { TabPane } = Tabs;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faMoneyBill1, faStar, faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faCalendarDay, faUsers, faScrewdriverWrench, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import axios from '../../../service/customize_axios';
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function Service() {
    const navigate = useNavigate();
    const [listService, setListService] = useState();
    const [dataStatisticalOverview, setDataStatitsticalOverview] = useState();
    const featchStatistical = async () => {
        let res = await axios.get("http://localhost:3000/statistical/overview");
        if (res && res.data) {
            console.log(res.data.data)
            setDataStatitsticalOverview(res.data.data)
        }
    }

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
        featchStatistical();
        window.scrollTo(0, 0);
    }, [])

    const onChange = (key) => {
    };
    const items = [
        {
            key: '1',
            label: 'Đảm bảo chất lượng',
            children: (
                <div>
                    <p>Hệ thống sửa chữa tại nhà cam kết cung cấp dịch vụ chất lượng hàng đầu, từ việc chọn lựa kỹ thuật viên tới quy trình làm việc, mang lại sự an tâm và hài lòng cho mọi khách hàng</p>
                    <img src="../illustration/ISO9001.png" alt="Tab 1" style={{ width: "60px" }} />
                    <img src="../illustration/certificate.jpg" alt="Tab 1" style={{ width: "100px", marginLeft: "10px" }} />
                </div>
            ),
        },
        {
            key: '2',
            label: 'Dịch vụ cùng ngày',
            children: (
                <div>
                    <p>Dịch vụ cùng ngày của chúng tôi giúp khách hàng giải quyết sự cố nhanh chóng và hiệu quả, từ việc kiểm tra, sửa chữa đến bảo dưỡng, đảm bảo thiết bị hoạt động tốt ngay tức thì.</p>
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
                                        <Link className="text-decoration-none" to={`/service/detail/${service.id}`}><div className={cx("viewDetailService")}>XEM CHI TIẾT<FontAwesomeIcon className={cx("iconDetailService")} icon={faArrowRight} /></div></Link>

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
                            <img src="../illustration/repairmanService.png" alt="" />
                        </div>
                    </div>
                    <div className="col-lg-7">
                        <div className="contentIntro mt-5">
                            <h3>CHÚNG TÔI LÀM BẠN YÊU THÍCH THIẾT BIỆT CỦA BẠN!</h3>
                            <h6>Hôm nay không phải ngày mai</h6>
                            <div className={cx("line")}></div>
                            {/* <Tabs defaultActiveKey="1" tabPosition="left" items={items} onChange={onChange}>
                                {items.map((item) => (
                                    <TabPane key={item.key} tab={item.tab}>
                                        {item.content}
                                    </TabPane>
                                ))}
                            </Tabs> */}
                            <Tabs defaultActiveKey="1" tabPosition="left" items={items} onChange={onChange}>


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
                                {dataStatisticalOverview?.totalRepair}
                            </div>
                            <div className={cx("titleInfor")}>
                                DỰ ÁN ĐÃ THỰC HIỆN
                            </div>
                        </div>
                        <div className={`m-auto col-lg-4 col-md-6 col-sm-12 ${cx("detailRepair")}`}>
                            <div className={cx("numberInfor")}>
                                {dataStatisticalOverview?.totalUser}
                            </div>
                            <div className={cx("titleInfor")}>
                                KHÁCH HÀNG HÀI LÒNG
                            </div>
                        </div>
                        <div className={`m-auto col-lg-4 col-md-6 col-sm-12 ${cx("detailRepair")}`}>
                            <div className={cx("numberInfor")}>
                                {dataStatisticalOverview?.totalCategori}
                            </div>
                            <div className={cx("titleInfor")}>
                                THIẾT BỊ ĐA DẠNG
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
                                    Tiết kiệm chi phí với dịch vụ sửa chữa tận nhà của chúng tôi. Khám phá cách chúng tôi giúp bạn tiết kiệm tiền và thời gian thông qua việc sửa chữa thiết bị gia dụng tận nơi
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
                                    Dịch vụ bảo hành 6 tháng của chúng tôi mang đến sự an tâm và tiết kiệm cho bạn. Hãy trải nghiệm chất lượng và sự đảm bảo của chúng tôi ngay hôm nay.
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
                                    Khám phá sự khác biệt với đội ngũ kỹ thuật viên kinh nghiệm của chúng tôi. Sự am hiểu và tinh thần trách nhiệm sẽ đồng hành cùng bạn trong mọi dịch vụ sửa chữa.
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
                                    Chúng tôi cam kết đảm bảo chất lượng cao nhất cho mọi dịch vụ. Sự tin tưởng của khách hàng là động lực để chúng tôi không ngừng nâng cao và hoàn thiện
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
                                    Sửa chữa nhanh chóng, hiệu quả, tiện lợi và tiết kiệm thời gian. Chúng tôi cam kết mang đến cho bạn sự hài lòng và an tâm trong mọi lúc, mọi nơi
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
                                    Sự lựa chọn hàng đầu cho sự hài lòng và chất lượng. Với đội ngũ chuyên nghiệp và dịch vụ tận tâm, chúng tôi mang đến trải nghiệm tuyệt vời nhất cho khách hàng
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
                                        Mức giá hợp lý
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
                                        Mức giá tiết kiệm
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
                                        Mức giá thông thường
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
                                        Mức giá cuối tuần
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