import axios from "../../../service/customize_axios";
import { useEffect, useState } from "react";
import className from "classnames/bind";
import styles from "./ProfileUser.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Tabs, Space, Table, Tag } from 'antd';
import { faChevronRight, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
const cx = className.bind(styles);

function ProfileUser() {

    const [data, setData] = useState();

    const fetchProfile = async () => {
        let getUser = await axios.get("http://localhost:3000/getProfile");
        setData(getUser.data);
    }

    useEffect(() => {
        fetchProfile();
    }, [])

    const onChange = (key) => {
        console.log(key);
    };

    const columns = [
        {
            title: 'STT',
            dataIndex: 'key',
            key: 'key',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Dịch vụ',
            dataIndex: 'service',
            key: 'service',
        },
        {
            title: 'Loại thiết bị',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Ngày đăng ký',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Trạng thái',
            key: 'tags',
            dataIndex: 'tags',
            render: (_, { tags }) => (
                <>
                    {tags.map((tag) => {
                        let color = tag === 'D' ? 'red' : (tag === 'W' ? 'yellow' : 'green');
                        let text = tag === 'D' ? 'Đã hủy' : (tag === 'W' ? 'Đang chờ' : 'Đã duyệt');
                        return (
                            <Tag style={{ width: "70px", textAlign: "center" }} color={color} key={tag}>
                                {text}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <FontAwesomeIcon icon={faPenToSquare} size="lg" style={{ color: "#024bca", }} />
                    <FontAwesomeIcon icon={faTrash} size="lg" style={{ color: "#cc0000", }} />
                    <FontAwesomeIcon icon={faChevronRight} size="lg" style={{ color: "#005eff", }} />
                </Space>
            ),
        },
    ];
    const dataTable = [
        {
            key: '1',
            service: 'John Brown',
            category: 32,
            address: 'New York No. 1 Lake Park',
            date: '14/02/2024',
            tags: ['D'],
        },
        {
            key: '2',
            service: 'Jim Green',
            category: 42,
            address: 'London No. 1 Lake Park',
            date: '14/02/2024',
            tags: ['Y'],
        },
        {
            key: '3',
            service: 'Joe Black',
            category: 32,
            address: 'Sydney No. 1 Lake Park',
            date: '14/02/2024',
            tags: ['W'],
        },
    ];
    const items = [
        {
            key: '1',
            label: 'Đơn sửa chữa',
            children: <Table columns={columns} dataSource={dataTable} />,
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
                                            <button type="button" className="btn btn-outline-dark mt-2">
                                                Chỉnh sửa
                                            </button>
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
                                <div className="row">
                                    <div className="col">
                                        <div className={cx("cardInfo")}>
                                            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>


            </div>
        </div>
    );
}

export default ProfileUser;