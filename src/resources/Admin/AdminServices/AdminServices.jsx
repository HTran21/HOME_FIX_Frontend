import className from "classnames/bind";
import styles from "./AdminServices.module.scss";
import axios from '../../../service/customize_axios';

const cx = className.bind(styles);

import {
    FilterOutlined,
    SearchOutlined,
    MoreOutlined,
    EditOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import { Dropdown } from 'antd';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faMoneyBill1, faStar, faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faCalendarDay, faUsers, faScrewdriverWrench, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

function AdminServices() {

    const items = [
        {
            label: <p><EditOutlined className="pe-2" />Sửa</p>,
            key: '0',
        },
        {
            label: <p><DeleteOutlined className="pe-2" />Xóa</p>,
            key: '1',
        },
    ];

    const [listService, setListService] = useState();

    useEffect(() => {
        axios.get("http://localhost:3000/blog/getService")
            .then(res => {
                // console.log("list service", res.data.listService)
                setListService(res.data.listService)
            })

    }, [])
    return (
        <>
            <div className={cx("containerPage")}>
                <div className={cx("titleProduct")}>
                    <h4 className="d-inline-block">Danh sách dịch vụ</h4>
                    <div className={cx("buttonAdd")}>
                        <button className={cx("btnAddService")}>Thêm dịch vụ</button>
                    </div>
                </div>
                <div className={cx("contentPage")}>
                    <div className="row">

                        {listService?.map((service, i) =>
                            <div className="col-lg-3 col-md-4 col-sm-6" key={i}>
                                <div className={cx("detailService")}>
                                    <div className="iconMoreService">
                                        <Dropdown className={cx("iconMore")}
                                            menu={{
                                                items,
                                            }}
                                            trigger={['click']}
                                            placement="bottomRight"
                                        >
                                            <a onClick={(e) => e.preventDefault()} >
                                                <MoreOutlined />

                                            </a>
                                        </Dropdown>
                                    </div>
                                    <img className={cx("imageService")} src={`http://localhost:3000/${service.logoService}`} alt="" />
                                    <div className={cx("titleDetailService")}>{service.nameService}</div>
                                    <div className={cx("viewDetailService")}>XEM CHI TIẾT<FontAwesomeIcon className={cx("iconDetailService")} icon={faArrowRight} /></div>
                                </div>
                            </div>
                        )}


                        {/* <div className="col-lg-3 col-md-4 col-sm-6">
                            <div className={cx("detailService")}>
                                <div className="iconMoreService">
                                    <Dropdown className={cx("iconMore")}
                                        menu={{
                                            items,
                                        }}
                                        trigger={['click']}
                                        placement="bottomRight"
                                    >
                                        <a onClick={(e) => e.preventDefault()} >
                                            <MoreOutlined />

                                        </a>
                                    </Dropdown>
                                </div>
                                <img className={cx("imageService")} src="../public/icon/plug.png" alt="" />
                                <div className={cx("titleDetailService")}>Dịch vụ điện</div>
                                <div className={cx("viewDetailService")}>XEM CHI TIẾT<FontAwesomeIcon className={cx("iconDetailService")} icon={faArrowRight} /></div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <div className={cx("detailService")}>
                                <div className="iconMoreService">
                                    <Dropdown className={cx("iconMore")}
                                        menu={{
                                            items,
                                        }}
                                        trigger={['click']}
                                        placement="bottomRight"
                                    >
                                        <a onClick={(e) => e.preventDefault()} >
                                            <MoreOutlined />

                                        </a>
                                    </Dropdown>
                                </div>
                                <img className={cx("imageService")} src="../public/icon/pipeline.png" alt="" />
                                <div className={cx("titleDetailService")}>Dịch vụ điện</div>
                                <div className={cx("viewDetailService")}>XEM CHI TIẾT<FontAwesomeIcon className={cx("iconDetailService")} icon={faArrowRight} /></div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <div className={cx("detailService")}>
                                <div className="iconMoreService">
                                    <Dropdown className={cx("iconMore")}
                                        menu={{
                                            items,
                                        }}
                                        trigger={['click']}
                                        placement="bottomRight"
                                    >
                                        <a onClick={(e) => e.preventDefault()} >
                                            <MoreOutlined />

                                        </a>
                                    </Dropdown>
                                </div>
                                <img className={cx("imageService")} src="../public/icon/microwave.png" alt="" />
                                <div className={cx("titleDetailService")}>Dịch vụ điện</div>
                                <div className={cx("viewDetailService")}>XEM CHI TIẾT<FontAwesomeIcon className={cx("iconDetailService")} icon={faArrowRight} /></div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <div className={cx("detailService")}>
                                <div className="iconMoreService">
                                    <Dropdown className={cx("iconMore")}
                                        menu={{
                                            items,
                                        }}
                                        trigger={['click']}
                                        placement="bottomRight"
                                    >
                                        <a onClick={(e) => e.preventDefault()} >
                                            <MoreOutlined />

                                        </a>
                                    </Dropdown>
                                </div>
                                <img className={cx("imageService")} src="../public/icon/home-appliance.png" alt="" />
                                <div className={cx("titleDetailService")}>Dịch vụ điện</div>
                                <div className={cx("viewDetailService")}>XEM CHI TIẾT<FontAwesomeIcon className={cx("iconDetailService")} icon={faArrowRight} /></div>
                            </div>
                        </div> */}

                    </div>

                </div>
            </div>
        </>
    );
}

export default AdminServices;