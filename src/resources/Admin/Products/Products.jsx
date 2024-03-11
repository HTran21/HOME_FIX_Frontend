import className from "classnames/bind";
import styles from "./Products.module.scss";

const cx = className.bind(styles);

import {
    FilterOutlined,
    SearchOutlined,
    MoreOutlined,
    EditOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import { Dropdown } from 'antd';

function Products() {

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

    return (
        <>
            <div className={cx("containerPage")}>
                <div className="titleProduct">
                    <h4 className="d-inline-block">Danh sách sản phẩm</h4>
                </div>
                <div className={cx("contentPage")}>
                    <div className="row">
                        <div className="col-lg-2 col-sm-12">
                            <div className={cx("filter")}>
                                <p className={cx("titleFilter")}><FilterOutlined className="pe-2" />Bộ lọc</p>
                                <p style={{ fontWeight: "500" }}>Danh mục</p>
                                <ul className={cx("listCategori")}>
                                    <li>Tủ lạnh <p className="ms-auto">5</p></li>
                                    <li>Nôi cơm điện <p className="ms-auto">5</p></li>
                                    <li>Máy xay</li>
                                    <li>Lò nướng <p className="ms-auto">5</p></li>
                                    <li>Đèn</li>
                                </ul>

                                <p style={{ fontWeight: "500" }}>Hãng</p>
                                <ul className={cx("listCategori")}>
                                    <li>Panosonic</li>
                                    <li>Xiaomi <p className="ms-auto">5</p></li>
                                    <li>Toshiba</li>
                                    <li>TCL <p className="ms-auto">5</p></li>
                                    <li>LG</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-10 col-sm-12">
                            <div className={cx("listProducts")}>
                                <div className={cx("headerListProducts")}>
                                    <button className={cx("btnAddProduct")}>Thêm sản phẩm</button>
                                    <div className={cx("searchGroup")}>
                                        <div className={cx("searchBorder")}>
                                            <input type="text" className={cx("inputSearch")} name="" id="search" placeholder="Tìm kiếm..." />
                                            <label htmlFor="search" className={cx("iconSearch")}><SearchOutlined /></label>
                                        </div>

                                    </div>
                                </div>
                                <div className={cx("contentListProduct")}>
                                    <div className="row">
                                        <div className="col-lg-4 col-md-6 col-sm-12">
                                            <div className={cx("cardProduct")}>
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
                                                <img src="https://i.pinimg.com/564x/e0/ee/81/e0ee81a43e8b8a41b8e7b6ea912d6f0c.jpg" className={cx("imgProduct")} alt="" />
                                                <p className={cx("titleProduct")}>
                                                    LG Inverter 9 kg T2109VSAB
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-sm-12">
                                            <div className={cx("cardProduct")}>
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
                                                <img src="https://i.pinimg.com/564x/e0/ee/81/e0ee81a43e8b8a41b8e7b6ea912d6f0c.jpg" className={cx("imgProduct")} alt="" />
                                                <p className={cx("titleProduct")}>
                                                    LG Inverter 9 kg T2109VSAB
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-sm-12">
                                            <div className={cx("cardProduct")}>
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
                                                <img src="https://i.pinimg.com/564x/e0/ee/81/e0ee81a43e8b8a41b8e7b6ea912d6f0c.jpg" className={cx("imgProduct")} alt="" />
                                                <p className={cx("titleProduct")}>
                                                    LG Inverter 9 kg T2109VSAB
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-sm-12">
                                            <div className={cx("cardProduct")}>
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
                                                <img src="https://i.pinimg.com/564x/e0/ee/81/e0ee81a43e8b8a41b8e7b6ea912d6f0c.jpg" className={cx("imgProduct")} alt="" />
                                                <p className={cx("titleProduct")}>
                                                    LG Inverter 9 kg T2109VSAB
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default Products;