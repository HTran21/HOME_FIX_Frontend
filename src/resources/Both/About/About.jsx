import styles from "./About.module.scss";
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faMoneyBill1, faStar, faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faCalendarDay, faUsers } from "@fortawesome/free-solid-svg-icons";
import { Tabs } from 'antd';
const { TabPane } = Tabs;

const cx = classNames.bind(styles);

function About() {

    const onChange = (key) => {
    };
    const items = [
        {
            key: '1',
            label: 'Lợi ích 1',
            children: (
                <div>
                    <p>Đội ngũ kỹ thuật viên của chúng tôi sẽ đảm bảo bạn nhận được dịch vụ sửa chữa tốt nhất. Tận dụng kinh nghiệm và kiến thức sâu rộng, họ sẽ nhanh chóng xác định và khắc phục mọi sự cố trên mọi thiết bị gia dụng.</p>
                </div>
            ),
        },
        {
            key: '2',
            label: 'Lợi ích 2',
            children: (
                <div>
                    <p>Chúng tôi cam kết mang lại sự linh hoạt cho bạn với dịch vụ sửa chữa đa dạng, từ máy giặt, tủ lạnh, đến bếp gas. Không chỉ vậy, chúng tôi còn hỗ trợ sửa chữa và bảo dưỡng các thiết bị điện tử như TV và máy tính.</p>
                </div>
            ),
        },
        {
            key: '3',
            label: 'Lợi ích 3',
            children: (
                <div>
                    <p>Với phương châm "Khách hàng là trên hết", chúng tôi luôn lắng nghe và đáp ứng mọi yêu cầu của bạn. Dù là sự cố nhỏ nhất, chúng tôi đều cam kết giải quyết một cách nhanh chóng và hiệu quả, để bạn luôn hài lòng với dịch vụ của chúng tôi.</p>
                </div>
            ),
        }
    ];

    return (
        <>
            <div className={cx("titleAbout")}>
                <h1>ABOUT US</h1>
                <h6 className={"mt-4"}>HOME / ABOUT</h6>
            </div>
            <section className={`container ${cx("contentAbout")}`}>
                <div className={cx("introAbout")}>
                    <div className={cx("titleIntro")}>
                        Tầm nhìn của bạn, Tương lai của chúng tôi
                    </div>
                    <div className={cx("desIntro")}>

                        Tầm nhìn của chúng tôi là trở thành đối tác tin cậy hàng đầu trong lĩnh vực sửa chữa và bảo dưỡng thiết bị gia dụng. Chúng tôi cam kết cung cấp dịch vụ chất lượng cao, hiệu quả và đổi mới, đồng hành cùng khách hàng trong mọi nhu cầu sửa chữa và bảo dưỡng, đem lại cuộc sống tiện lợi và an tâm.
                    </div>
                    <div className={cx("contentIntro")}>
                        <div className="row">
                            <div className="col">
                                <img className={cx("imageAppliance")} src="../public/imagerepair/homeAppliance.png" alt="" />
                            </div>
                            <div className="col">
                                <Tabs defaultActiveKey="1" items={items} onChange={onChange}>
                                    {items.map((item) => (
                                        <TabPane key={item.key} tab={item.tab}>
                                            {item.content}
                                        </TabPane>
                                    ))}
                                </Tabs>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx("theTeam")}>
                    <div className={cx("titleTheTeam")}>
                        NHÓM CHÚNG TÔI
                    </div>
                    <div className={cx("line")}></div>
                    <p>Chúng tôi là những người tuyệt vời</p>
                    <div className={cx("listPeople")}>
                        <div className="row">
                            <div className="col-lg-3 col-md-4 col-sm-6 m-auto mt-3">
                                <div className={cx("profilePeople")}>
                                    <img className={cx("imageProfile")} src="../public/User/user1.jpg" alt="" />
                                </div>
                                <div className={cx("desProfile")}>
                                    <h5 className="text-light">Alan Daunin</h5>
                                    <p className={cx("textDes")}>TECHNICIEN</p>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-4 col-sm-6 m-auto mt-3">
                                <div className={cx("profilePeople")}>
                                    <img className={cx("imageProfile")} src="../User/user2.jpg" alt="" />
                                </div>
                                <div className={cx("desProfile")}>
                                    <h5 className="text-light">Alan Daunin</h5>
                                    <p className={cx("textDes")}>TECHNICIEN</p>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-4 col-sm-6 m-auto mt-3">
                                <div className={cx("profilePeople")}>
                                    <img className={cx("imageProfile")} src="../User/user3.jpg" alt="" />
                                </div>
                                <div className={cx("desProfile")}>
                                    <h5 className="text-light">Alan Daunin</h5>
                                    <p className={cx("textDes")}>CEO - FOUNDER</p>
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-4 col-sm-6 m-auto mt-3">
                                <div className={cx("profilePeople")}>
                                    <img className={cx("imageProfile")} src="../User/user4.jpg" alt="" />
                                </div>
                                <div className={cx("desProfile")}>
                                    <h5 className="text-light">Alan Daunin</h5>
                                    <p className={cx("textDes")}>CEO - FOUNDER</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx("contentAbout2")}>
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className={cx("DesContent")}>
                                <h2>Làm cho tất cả có ý nghĩa.</h2>
                                <p className="pe-5">Chúng tôi làm mọi thứ trở nên ý nghĩa. Giúp cho bạn cảm thấy hài lòng về mọi thứ bạn mong muốn. Hãy đến với
                                    chúng tôi để trải nghiệm dịch vụ tuyệt vời</p>
                                <button className={cx("btnReadMore")}>Đọc thêm</button>
                            </div>
                        </div>
                        {/* <div className="col-lg-6 col-md-6 col-sm-12">
                            <iframe className="m-auto d-flex" width="560" height="315" src="https://www.youtube.com/embed/SIEaicTT7Ms?si=cSKYg4bzeu3FFD_I" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                        </div> */}
                    </div>
                </div>
            </section>

        </>
    );
}

export default About;