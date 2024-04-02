import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./ListWork.module.scss";
import classNames from 'classnames/bind';

import { AndroidOutlined, AppleOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';

const cx = classNames.bind(styles);
function ListWork() {
    const onChange = (key) => {
    };
    const items = [
        {
            key: '1',
            label: 'Công việc mới',
            children: (
                <div className="row listWork">
                    <div className={` col-lg-4 col-md-6 col-sm-12`}>
                        <div className={cx("cardWork")}>
                            <div className="row">
                                <div className="col"><p className={cx("titleWorkContent")}>Sửa chữa tủ lạnh</p></div>
                                <div className="col text-end">8h 28/03/2024</div>
                            </div>
                            <div className="row">
                                <div className={`${cx("contentWork")}`}>
                                    <p>Tên: Trần Văn A</p>
                                    <p>Số điện thoại: 09754314</p>
                                    <p>Địa Chỉ: Khu II, Phường Xuân Khánh, Quận Ninh Kiều, Thành Phố Cần Thơ</p>
                                </div>

                            </div>
                        </div>

                    </div>
                    <div className={` col-lg-4 col-md-6 col-sm-12`}>
                        <div className={cx("cardWork")}>
                            <div className="row">
                                <div className="col"><p className={cx("titleWorkContent")}>Sửa chữa tủ lạnh</p></div>
                                <div className="col text-end">8h 28/03/2024</div>
                            </div>
                            <div className="row">
                                <div className={`${cx("contentWork")}`}>
                                    <p>Tên: Trần Văn A</p>
                                    <p>Số điện thoại: 09754314</p>
                                    <p>Địa Chỉ: Khu II, Phường Xuân Khánh, Quận Ninh Kiều, Thành Phố Cần Thơ</p>
                                </div>

                            </div>
                        </div>

                    </div>
                    <div className={` col-lg-4 col-md-6 col-sm-12`}>
                        <div className={cx("cardWork")}>
                            <div className="row">
                                <div className="col"><p className={cx("titleWorkContent")}>Sửa chữa tủ lạnh</p></div>
                                <div className="col text-end">8h 28/03/2024</div>
                            </div>
                            <div className="row">
                                <div className={`${cx("contentWork")}`}>
                                    <p>Tên: Trần Văn A</p>
                                    <p>Số điện thoại: 09754314</p>
                                    <p>Địa Chỉ: Khu II, Phường Xuân Khánh, Quận Ninh Kiều, Thành Phố Cần Thơ</p>
                                </div>

                            </div>
                        </div>

                    </div>
                    <div className={` col-lg-4 col-md-6 col-sm-12`}>
                        <div className={cx("cardWork")}>
                            <div className="row">
                                <div className="col"><p className={cx("titleWorkContent")}>Sửa chữa tủ lạnh</p></div>
                                <div className="col text-end">8h 28/03/2024</div>
                            </div>
                            <div className="row">
                                <div className={`${cx("contentWork")}`}>
                                    <p>Tên: Trần Văn A</p>
                                    <p>Số điện thoại: 09754314</p>
                                    <p>Địa Chỉ: Khu II, Phường Xuân Khánh, Quận Ninh Kiều, Thành Phố Cần Thơ</p>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            )

        },
        {
            key: '2',
            label: 'Công việc đã xong',
            children: (
                <div className="row listWork">
                    <div className={` col-lg-4 col-md-6 col-sm-12`}>
                        <div className={cx("cardWorked")}>
                            <div className="row">
                                <div className="col"><p className={cx("titleWorkContent")}>Sửa chữa tủ lạnh</p></div>
                                <div className="col text-end">8h 28/03/2024</div>
                            </div>
                            <div className="row">
                                <div className={`${cx("contentWork")}`}>
                                    <p>Tên: Trần Văn A</p>
                                    <p>Số điện thoại: 09754314</p>
                                    <p>Địa Chỉ: Khu II, Phường Xuân Khánh, Quận Ninh Kiều, Thành Phố Cần Thơ</p>
                                </div>

                            </div>
                        </div>

                    </div>
                    <div className={` col-lg-4 col-md-6 col-sm-12`}>
                        <div className={cx("cardWorked")}>
                            <div className="row">
                                <div className="col"><p className={cx("titleWorkContent")}>Sửa chữa tủ lạnh</p></div>
                                <div className="col text-end">8h 28/03/2024</div>
                            </div>
                            <div className="row">
                                <div className={`${cx("contentWork")}`}>
                                    <p>Tên: Trần Văn A</p>
                                    <p>Số điện thoại: 09754314</p>
                                    <p>Địa Chỉ: Khu II, Phường Xuân Khánh, Quận Ninh Kiều, Thành Phố Cần Thơ</p>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            ),
        }
    ];
    return (
        <div className="container">
            <div className={cx("titlePage")}>
                <div className={cx("searchGroup")}>
                    <div className={cx("searchBorder")}>
                        <input className={cx("inputSearch")} type="text" id="search" autoComplete="off" />
                        <label htmlFor="search"><FontAwesomeIcon icon={faMagnifyingGlass} /></label>
                    </div>
                </div>
                <h4>Danh sách công việc</h4>

            </div>
            <div className="contentPage">
                <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
            </div>
        </div>
    );
}

export default ListWork;