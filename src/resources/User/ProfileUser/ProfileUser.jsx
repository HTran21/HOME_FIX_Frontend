import axios from "../../../service/customize_axios";
import { useEffect, useState } from "react";
import className from "classnames/bind";
import styles from "./ProfileUser.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Tabs, Space, Table, Tag, Drawer } from 'antd';
import { faChevronRight, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from 'moment';
const cx = className.bind(styles);

function ProfileUser() {
    const idUser = useSelector((state) => state.user.user.id);

    const [data, setData] = useState();
    const [listOrder, setListOrder] = useState();

    const fetchProfile = async () => {
        let getUser = await axios.get("http://localhost:3000/getProfile");
        setData(getUser.data);
    }

    const fetchOrder = async () => {
        let getOrder = await axios.get("http://localhost:3000/order/user/" + idUser);
        setListOrder(getOrder.data.data)
    }

    useEffect(() => {
        fetchProfile();
        fetchOrder();
    }, [])

    // const onChange = (key) => {
    //     console.log(key);
    // };

    const columns = [
        {
            title: 'STT',
            dataIndex: 'key',
            key: 'id',
            render: (text, record, index) => <a>{index + 1}</a>,
        },
        {
            title: 'Dịch vụ',
            dataIndex: 'Categori',
            key: 'nameService',
            render: (_, { Categori, index }) => {
                return (
                    <div key={index + 1} >
                        {Categori.Service.nameService}
                    </div>
                )
            }
        },
        {
            title: 'Loại thiết bị',
            dataIndex: "Categori",
            key: 'nameCategories',
            render: (_, { Categori, index }) => {
                return (
                    <div key={index + 1}>
                        {Categori.nameCategories}
                    </div>
                )
            }
        },
        {
            title: 'Ngày đăng ký',
            dataIndex: 'desireDate',
            key: 'desireDate',
            render: (_, { desireDate, index }) => {
                return (
                    <div key={index + 1}>
                        {moment(desireDate).format('DD/MM/YYYY')}
                    </div>
                )
            }
        },
        {
            title: 'Trạng thái',
            key: 'status',
            dataIndex: 'status',
            render: (_, { status, index }) => {
                let color = status === 'D' ? 'red' : (status === 'W' ? 'yellow' : 'green');
                let text = status === 'D' ? 'Đã hủy' : (status === 'W' ? 'Đang chờ' : 'Đã duyệt');

                return (
                    <Tag key={index + 1} style={{ width: "70px", textAlign: "center" }} color={color} >
                        {text}
                    </Tag>

                );
            }

        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record, index) => (
                <Space size="middle" key={index + 1}>
                    {/* <Link to={`/repair/edit/${record?.id}?ID_Service=${record.Categori.ID_Service}`}><FontAwesomeIcon icon={faPenToSquare} size="lg" style={{ color: "#024bca", }} /></Link> */}
                    {/* <FontAwesomeIcon icon={faTrash} size="lg" style={{ color: "#cc0000", }} /> */}
                    <FontAwesomeIcon icon={faChevronRight} size="lg" style={{ color: "#005eff", marginLeft: "10px" }} onClick={() => showDrawer(record)} />
                </Space>
            ),
        },
    ];
    const items = [
        {
            key: '1',
            label: 'Đơn sửa chữa',
            children: <Table columns={columns} dataSource={listOrder} pagination={{
                defaultPageSize: 3,
                showSizeChanger: true,
                pageSizeOptions: ['3']
            }}
                onChange={handleTableChange} />,
        },
        {
            key: '2',
            label: 'Hóa đơn',
            children:
                <div className={cx("emptyData")}>
                    <img src="../public/icon/file.png" alt="" />
                    <h6>Dữ liệu rỗng</h6>
                </div>,
        }
    ];

    const [open, setOpen] = useState(false);
    const [record, setRecord] = useState();
    const showDrawer = (record) => {
        setOpen(true);
        setRecord(record);
    };
    const onClose = () => {
        setOpen(false);
    };

    // const [pagination, setPagination] = useState({});

    // function handleTableChange() {

    //     requestToServer().then((data) => {
    //         pagination.total = your_value;
    //         setPagination(pagination);
    //     })
    // }

    const [pagination, setPagination] = useState({});

    function handleTableChange() {
        requestToServer().then((data) => {
            const newPagination = { ...pagination };
            newPagination.total = your_value;
            setPagination(newPagination);
        });
    }


    return (
        <div className="containerPage">
            <div className="contentPage">
                <section style={{ backgroundColor: "#eee" }}>
                    <div className="container mt-2">
                        <div className="row">
                            <div className="col-lg-4">
                                <div className="card mb-4">
                                    <div className="card-body text-center">
                                        <img
                                            src={`http://localhost:3000/${data?.avatar}`}
                                            alt="avatar"
                                            className="rounded-circle img-fluid"
                                            style={{ width: 140, height: 140 }}
                                        />
                                        <h5 className="my-3 mb-1">{data?.username}</h5>
                                        <h6 className="text-muted mb-1">{data?.role === "KH" ? ("Khách hàng") : ("")}</h6>
                                        <div className="d-flex justify-content-center mb-2">
                                            <Link to={"/user/edit"}>
                                                <button type="button" className="btn btn-outline-dark mt-2">
                                                    Chỉnh sửa
                                                </button>
                                            </Link>

                                        </div>
                                    </div>
                                </div>
                                <div className="card mb-4 mb-lg-0">
                                    <div className="card-body p-0">
                                        <ul className="list-group list-group-flush rounded-3">
                                            <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                                <FontAwesomeIcon icon={faFacebook} size="lg" style={{ color: "#0085eb", }} />
                                                <p className="mb-0">{data?.username}</p>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                                <FontAwesomeIcon icon={faTwitter} size="lg" style={{ color: "#4194e1", }} />
                                                <p className="mb-0">{data?.username}</p>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                                <FontAwesomeIcon icon={faInstagram} size="lg" style={{ color: "#b69eff", }} />
                                                <p className="mb-0">{data?.username}</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-8">
                                <div className="card mb-4">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className={cx("textProfile")}>Họ tên</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className={cx("textProfile")}>{data?.username}</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className={cx("textProfile")}>Email</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className={cx("textProfile")}>{data?.email}</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className={cx("textProfile")}>Số điện thoại</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className={cx("textProfile")}>{data?.phone}</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className={cx("textProfile")}>Địa chỉ</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className={cx("textProfile")}>{data?.address}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card p-0">
                                    <div className="card-body p-0">
                                        <div className="row">
                                            <div className="col">
                                                <div className={cx("cardInfo")}>
                                                    <Tabs defaultActiveKey="1" items={items}
                                                    />
                                                    {/* <Table
                                                dataSource={data} // Dữ liệu của bảng
                                                columns={columns} // Các cột của bảng
                                                pagination={pagination} // Props phân trang
                                                onChange={handleTableChange} // Callback khi phân trang hoặc sắp xếp thay đổi
                                            /> */}


                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Drawer onClose={onClose} open={open} width={600} title={
                <div className={cx("titleForm")}>
                    <h3 className={cx("titleRepair")}>ĐĂNG KÝ SỬA CHỮA</h3>
                    <span className="h1 ms-auto "><img className={cx("imgLogo")} src="../image/logo/logo8.png" alt="" />
                        <p className={cx("textLogo")}>HOME FIX</p></span>
                </div>
            } >
                <div className={cx("oder")}>

                    <div className={cx("inforUser")}>
                        <h5 className="mb-2">Thông tin khách hàng</h5>
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <div className="form-floating mb-3" >
                                    <input
                                        type="text"
                                        className={`${cx("inputForm")} form-control`}
                                        id="floatingInput"
                                        placeholder="name@example.com"
                                        readOnly value={record?.fullName} onChange={() => { }}
                                    />

                                    <label htmlFor="floatingInput">Họ tên</label>
                                </div>

                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className={`${cx("inputForm")} form-control`}
                                        id="floatingInput"
                                        placeholder="name@example.com"
                                        readOnly value={record?.email} onChange={() => { }}
                                    />
                                    <label htmlFor="floatingInput">Email</label>
                                </div>

                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <div className="form-floating mb-3" >
                                    <input
                                        type="text"
                                        className={`${cx("inputForm")} form-control`}
                                        id="floatingInput"
                                        placeholder="name@example.com"
                                        readOnly value={record?.phone} onChange={() => { }}
                                    />

                                    <label htmlFor="floatingInput">Số điện thoại</label>
                                </div>

                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className={`${cx("inputForm")} form-control`}
                                        id="floatingInput"
                                        placeholder="name@example.com"
                                        readOnly value={record?.address} onChange={() => { }}
                                    />
                                    <label htmlFor="floatingInput">Địa chỉ</label>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className={cx("inforRepair")}>
                        <h5 className="mb-2">Thông tin Dịch vụ</h5>
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <div className="form-floating mb-3" >
                                    <input
                                        type="text"
                                        className={`${cx("inputForm")} form-control`}
                                        id="floatingInput"
                                        placeholder="name@example.com"
                                        readOnly value={record?.Categori.Service.nameService} onChange={() => { }}
                                    />

                                    <label htmlFor="floatingInput">Dịch vụ</label>
                                </div>

                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className={`${cx("inputForm")} form-control`}
                                        id="floatingInput"
                                        placeholder="name@example.com"
                                        readOnly value={record?.Categori.nameCategories} onChange={() => { }}
                                    />
                                    <label htmlFor="floatingInput">Loại thiết bị</label>
                                </div>

                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <div className="form-floating mb-3" >
                                    <input
                                        type="text"
                                        className={`${cx("inputForm")} form-control`}
                                        id="floatingInput"
                                        placeholder="name@example.com"
                                        readOnly defaultValue={moment(record?.desireDate).format("DD/MM/YYYY")} onChange={() => { }}
                                    />

                                    <label htmlFor="floatingInput">Thời gian mong muốn</label>
                                </div>

                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <div className="form-floating mb-3">
                                    <textarea
                                        className={`${cx("inputForm")} form-control`}
                                        placeholder="Leave a comment here"
                                        id="floatingTextarea2"
                                        style={{ height: 50 }}
                                        value={record?.desProblem} readOnly onChange={() => { }}
                                    />
                                    <label htmlFor="floatingTextarea2">Comments</label>

                                </div>

                            </div>
                        </div>
                    </div>
                    <div className={cx("statusOrder")}>
                        <span>Trạng thái:</span> <div className={`${cx("status")} ${record && record?.status == 'W' ? 'text-warning border-warning' : (record?.status == 'Y' ? 'text-success border-success' : 'text-danger border-danger')}`}>Đang chờ</div>
                    </div>
                </div>
            </Drawer>
        </div >
    );
}

export default ProfileUser;