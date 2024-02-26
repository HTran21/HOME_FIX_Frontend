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
                    <p>Bresaola beef loin doner tenderloin flank sausage turkey rump. Pastrami pork loin sausage bacon tenderloin tongue kevin hamburger short loin landjaeger beef. Bresaola burgdoggen ribeye.

                        Chuck jerky pastrami capicola brisket pork landjaeger corned beef pork loin beef ham. Meatloaf pork belly hamburger meatball ground round, fatback ham hock chicken.</p>
                </div>
            ),
        },
        {
            key: '2',
            label: 'Lợi ích 2',
            children: (
                <div>
                    <p>Tôi là một khối văn bản. Nhấp vào nút chỉnh sửa để thay đổi văn bản này. Khách hàng rất quan trọng, khách hàng sẽ được khách hàng theo đuổi.
                        Là đất của đất, là tang vật cũng không phải là hạ thi của đất, là gối của sư tử.</p>
                </div>
            ),
        },
        {
            key: '3',
            label: 'Lợi ích 3',
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
            <div className={cx("titleAbout")}>
                <h1>ABOUT US</h1>
                <h6 className={"mt-4"}>HOME / ABOUT</h6>
            </div>
            <section className={`container ${cx("contentAbout")}`}>
                <div className={cx("introAbout")}>
                    <div className={cx("titleIntro")}>
                        Tầm nhìn của bạn, Tương lai của chúng tôi.
                    </div>
                    <div className={cx("desIntro")}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit quidem ipsum deserunt repellendus consectetur, fuga illo quibusdam commodi quas voluptates.
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
                                <h1>Làm cho tất cả có ý nghĩa.</h1>
                                <p className="pe-5">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque quas aperiam nesciunt exercitationem nemo? Error voluptates incidunt repellat totam sed.</p>
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