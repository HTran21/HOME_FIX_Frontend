import className from "classnames/bind";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet, faScrewdriverWrench, faCircleUser, faDesktop, faPenToSquare, faTrash, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Space, Table, Tag, Drawer } from 'antd';
import styles from "./AdminHomePage.module.scss";
import axios from "../../../service/customize_axios";
import { Link } from "react-router-dom";

import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

import 'rsuite/dist/rsuite.min.css';
import { DateRangePicker } from 'rsuite';

import moment from 'moment';


const cx = className.bind(styles);

const cardData = [
    {
        title: 'TOTAL EARNINGS',
        number: '$98,851.35',
        icon: faWallet,
        color: 'violet',
    },
    {
        title: 'REPAIR',
        number: '65,802',
        icon: faScrewdriverWrench,
        color: 'blue',
    },
    {
        title: 'CUSTOMERS',
        number: '79,802',
        icon: faCircleUser,
        color: 'yellow',
    },
    {
        title: 'PRODUCTS',
        number: '36,758',
        icon: faDesktop,
        color: 'darkblue',
    },
];




function Card({ title, number, icon, color }) {
    return (
        <div className={cx("cardBody", color)}>
            <div className={cx("titleCard")}>
                {title}
            </div>
            <div className={cx("numberCard")}>
                {number}
            </div>
            <div className={cx("iconCard")}>
                <FontAwesomeIcon icon={icon} />
            </div>
        </div>
    );
}


const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
        {
            label: 'Doanh thu',
            data: [10000, 12000, 15000, 18000, 20000, 22000, 25000, 28000, 30000, 32000, 35000, 38000],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }
    ]
};

// Cài đặt biểu đồ
const chartOptions = {
    scales: {
        y: {
            beginAtZero: true,
            title: {
                display: true,
                text: 'Doanh thu (VND)'
            }
        },
        x: {
            title: {
                display: true,
                text: 'Tháng'
            }
        }
    }
};





function AdminHomePage() {

    const [dateRange, setDateRange] = useState([null, null]);
    const [dataTable, setDataTable] = useState();

    const handleDateRangeChange = (value) => {
        setDateRange(value);
    };

    const fetchOrder = async () => {
        let getOrder = await axios.get("http://localhost:3000/order/getAllOrder");
        setDataTable(getOrder.data.data);
    }

    const [pagination, setPagination] = useState({});

    function handleTableChange() {
        requestToServer().then((data) => {
            const newPagination = { ...pagination };
            newPagination.total = your_value;
            setPagination(newPagination);
        });
    }


    const columns = [
        {
            title: 'STT',
            dataIndex: 'key',
            key: 'id',
            render: (text, record, index) => <a>{index + 1}</a>,
        },
        {
            title: 'Họ tên',
            dataIndex: 'fullName',
            key: 'fullName'
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
            title: 'Ngày mong muốn',
            dataIndex: 'desireDate',
            key: 'desireDate',
            defaultSortOrder: 'descend',
            sorter: (a, b) => {
                const dateA = new Date(a.desireDate);
                const dateB = new Date(b.desireDate);

                return dateA - dateB;
            },
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
            filters: [
                {
                    text: 'Đang chờ',
                    value: 'W'
                },
                {
                    text: 'Hoàn thành',
                    value: 'Y'
                },
                {
                    text: 'Đã hủy',
                    value: 'D'
                }
            ],
            onFilter: (value, record) => record.status.indexOf(value) === 0,
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
                    {/* <Link to={`/repair/edit/${record?.id}?ID_Service=${record.Categori.ID_Service}`}><FontAwesomeIcon icon={faPenToSquare} size="lg" style={{ color: "#024bca", }} /></Link>
                    <FontAwesomeIcon icon={faTrash} onClick={() => showModal(record)} size="lg" style={{ color: "#cc0000", }} /> */}
                    <FontAwesomeIcon icon={faChevronRight} size="lg" style={{ color: "#005eff", marginLeft: "10px" }} onClick={() => showDrawer(record)} />
                </Space>
            ),
        },
    ];

    useEffect(() => {
        fetchOrder();
    }, [])

    const [open, setOpen] = useState(false);
    const [record, setRecord] = useState();
    const showDrawer = (record) => {
        setOpen(true);
        setRecord(record);
    };
    const onClose = () => {
        setOpen(false);
    };



    return (
        <>
            <div className={cx("containerPage")}>
                <div className={cx("contentPage")}>
                    <div className={cx("overviewList")}>
                        <div className="row">
                            {cardData.map((card, index) => (
                                <div className="col-sm-12 col-lg-3" key={index}>
                                    <Card

                                        title={card.title}
                                        number={card.number}
                                        icon={card.icon}
                                        color={card.color}
                                    />
                                </div>

                            ))}
                        </div>
                    </div>
                    <div className={cx("chartMoney")}>
                        <h5>Monthly Earnings</h5>
                        <div className="row mb-3">
                            <div className="col-lg-7 col-md-12">
                                <Line data={revenueData} options={chartOptions} />
                            </div>
                            <div className={`${cx("dateRange")} col-lg-5 col-md-12`}>
                                <DateRangePicker format="MM/dd/yyyy" character=" – "
                                    onChange={handleDateRangeChange} className={cx("dateRangePicker")} />
                                {/* {dateRange && (
                                    <div>
                                        Từ: {dateRange[0] ? dateRange[0].toLocaleDateString() : 'Chưa chọn'}
                                        <br />
                                        Đến: {dateRange[1] ? dateRange[1].toLocaleDateString() : 'Chưa chọn'}
                                    </div>
                                )} */}
                                <div className={cx("contentDateRange")}>
                                    <div className="row">
                                        <div className="col-6">
                                            <div className={cx("totalEarning")}>
                                                <div className={cx("number")}>
                                                    65,802
                                                </div>
                                                <div className={cx("titleNumber")}>
                                                    Orders
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className={cx("totalEarning")}>
                                                <div className={cx("number")}>
                                                    65,802
                                                </div>
                                                <div className={cx("titleNumber")}>
                                                    Orders
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <div className={cx("totalEarning")}>
                                                <div className={cx("number")}>
                                                    65,802
                                                </div>
                                                <div className={cx("titleNumber")}>
                                                    Orders
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className={cx("totalEarning")}>
                                                <div className={cx("number")}>
                                                    65,802
                                                </div>
                                                <div className={cx("titleNumber")}>
                                                    Orders
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                    <div className="recentOrders">
                        <h5>Đơn sửa chữa gần đây</h5>
                        <Table className="mt-3" rowKey={"id"} columns={columns} dataSource={dataTable}
                            pagination={{
                                defaultPageSize: 5,
                                showSizeChanger: true,
                                pageSizeOptions: ['5', '10', '15']
                            }}
                            onChange={handleTableChange} />
                    </div>
                </div>
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
        </>
    );
}

export default AdminHomePage;