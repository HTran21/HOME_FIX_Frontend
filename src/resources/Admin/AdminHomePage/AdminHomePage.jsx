import className from "classnames/bind";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet, faScrewdriverWrench, faCircleUser, faDesktop, faPenToSquare, faTrash, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Space, Table, Tag, Drawer, DatePicker, Statistic } from 'antd';
import styles from "./AdminHomePage.module.scss";
import axios from "../../../service/customize_axios";
import { Link } from "react-router-dom";

import Chart from 'chart.js/auto';
import { Doughnut, Line } from 'react-chartjs-2';

import 'rsuite/dist/rsuite.min.css';
// import { DateRangePicker } from 'rsuite';

import moment from 'moment';
import dayjs from "dayjs";

const { RangePicker } = DatePicker;
const cx = className.bind(styles);

const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});


function AdminHomePage() {

    const [dateRange, setDateRange] = useState([null, null]);
    const [dataTable, setDataTable] = useState();
    const [dataStatisticalOverview, setDataStatitsticalOverview] = useState();
    const [dataEarning, setDataEarning] = useState();
    const [dataEarningPie, setDataEarningPie] = useState();
    const [totalAmount, setTotalAmount] = useState();
    const [date, setDate] = useState([]);
    const [dateArrray, setDateArray] = useState([])

    const handleDateRangeChange = (value) => {
        setDateRange(value);
    };

    const onChange = (date, dateString) => {
        if (dateString != null) {
            setDate(dateString)
            let dateSend = { type: "datepicker", data: dateString };
            axios.get("http://localhost:3000/statistical/earningSelect", {
                params: {
                    dateSend
                }
            })
                .then(res => {
                    console.log("Data doanh thu", res.data)
                    setDataEarning(res.data.earningTotal)
                    setTotalAmount(res.data.totalAmount)
                    setDataEarningPie(res.data.listAmountByService)
                })

        }
    };

    const featchStatistical = async () => {
        let res = await axios.get("http://localhost:3000/statistical/overview");
        if (res && res.data) {
            // console.log(res.data.data)
            setDataStatitsticalOverview(res.data.data)
        }
    }

    const featchEarning = async () => {
        let res = await axios.get("http://localhost:3000/statistical/earningSelect");
        if (res && res.data) {
            // console.log(res.data)
            setDataEarning(res.data.earningTotal)
            setTotalAmount(res.data.totalAmount)
            setDataEarningPie(res.data.listAmountByService)
        }
    }

    const fetchOrder = async () => {
        let getOrder = await axios.get("http://localhost:3000/order/getAllOrder");
        setDataTable(getOrder.data.data);
    }

    const [pagination, setPagination] = useState({});

    // function handleTableChange() {
    //     requestToServer().then((data) => {
    //         const newPagination = { ...pagination };
    //         newPagination.total = your_value;
    //         setPagination(newPagination);
    //     });
    // }

    function handleTableChange(data) {
        setPagination(data);
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
        // {
        //     title: 'Ngày đăng ký',
        //     dataIndex: 'createdAt',
        //     key: 'createdAt',
        //     defaultSortOrder: 'descend',
        //     sorter: (a, b) => {
        //         const dateA = new Date(a.desireDate);
        //         const dateB = new Date(b.desireDate);

        //         return dateA - dateB;
        //     },
        //     render: (_, { createdAt, index }) => {
        //         return (
        //             <div key={index + 1}>
        //                 {moment(createdAt).format('DD/MM/YYYY')}
        //             </div>
        //         )
        //     }
        // },
        {
            title: 'Ngày đăng ký',
            dataIndex: 'createdAt',
            key: 'createdAt',
            defaultSortOrder: 'desc',
            sorter: (a, b) => {
                const dateA = new Date(a.createdAt);
                const dateB = new Date(b.createdAt);

                return dateA - dateB;
            },
            render: (_, { createdAt, index }) => {
                return (
                    <div key={index + 1}>
                        {moment(createdAt).format('DD/MM/YYYY')}
                    </div>
                )
            }
        },
        // {
        //     title: 'Trạng thái',
        //     key: 'status',
        //     dataIndex: 'status',
        //     filters: [
        //         {
        //             text: 'Đang chờ',
        //             value: 'W'
        //         },
        //         {
        //             text: 'Hoàn thành',
        //             value: 'Y'
        //         },
        //         {
        //             text: 'Đã hủy',
        //             value: 'D'
        //         }
        //     ],
        //     onFilter: (value, record) => record.status.indexOf(value) === 0,
        //     render: (_, { status, index }) => {
        //         let color = status === 'D' ? 'red' : (status === 'W' ? 'yellow' : 'green');
        //         let text = status === 'D' ? 'Đã hủy' : (status === 'W' ? 'Đang chờ' : 'Đã duyệt');

        //         return (
        //             <Tag key={index + 1} style={{ width: "70px", textAlign: "center" }} color={color} >
        //                 {text}
        //             </Tag>

        //         );
        //     }

        // },
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
                    text: 'Đang duyệt',
                    value: 'P'
                },
                {
                    text: 'Đã duyệt',
                    value: 'A'
                },
                {
                    text: 'Đang sửa',
                    value: 'R'
                },
                {
                    text: 'Hoàn thành',
                    value: 'Y'
                },
                {
                    text: 'Đã hủy',
                    value: 'C'
                },

            ],
            onFilter: (value, record) => record.status.indexOf(value) === 0,
            render: (_, { status, index }) => {
                let color = status === 'C' ? 'red' : (status === 'W' ? 'yellow' : (status === 'A' ? 'green' : (status === 'R' ? 'orange' : (status === 'P' ? 'pink' : 'blue'))));
                let text = status === 'C' ? 'Đã hủy' : (status === 'W' ? 'Đang chờ' : (status === 'A' ? 'Đã duyệt' : (status === 'R' ? 'Đang sửa' : (status === 'P' ? 'Đang duyệt' : 'Hoàn thành'))));

                return (
                    <Tag key={index + 1} style={{ width: "75px", textAlign: "center" }} color={color} >
                        {text}
                    </Tag>

                );
            },

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
        featchStatistical()
        featchEarning()
    }, [])

    const [open, setOpen] = useState(false);
    const [record, setRecord] = useState();
    const showDrawer = (record) => {
        setOpen(true);
        setRecord(record);
        let formatDate = record.desireDate.split(",");
        setDateArray(formatDate.map(date => dayjs(date)))
    };
    const onClose = () => {
        setOpen(false);
        setDateArray('')
    };


    const cardData = [
        {
            title: 'TỔNG THU NHẬP',
            number: VND.format(dataStatisticalOverview?.totalEarning),
            icon: faWallet,
            color: 'violet',
        },
        {
            title: 'SỬA CHỮA',
            number: dataStatisticalOverview?.totalRepair,
            icon: faScrewdriverWrench,
            color: 'blue',
        },
        {
            title: 'NGƯỜI DÙNG',
            number: dataStatisticalOverview?.totalUser,
            icon: faCircleUser,
            color: 'yellow',
        },
        {
            title: 'THIẾT BỊ',
            number: dataStatisticalOverview?.totalCategori,
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

    const labels = dataEarning?.map(item => moment(item.updatedAt).format('DD/MM/YYYY'));
    const data = dataEarning?.map(item => +item.totalAmount);

    const revenueData = {
        labels: labels,
        datasets: [
            {
                label: 'Doanh thu',
                data: data,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }
        ]
    };

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
                    text: 'Ngày'
                }
            }
        }
    };

    const chartData = {
        labels: dataEarningPie?.map(item => item.service.nameService),
        datasets: [{
            label: 'Tổng đơn',
            data: dataEarningPie?.map(item => item.totalAmount),
            backgroundColor: [
                'rgba(255, 99, 132, 0.7)',
                'rgba(54, 162, 235, 0.7)',
                'rgba(255, 206, 86, 0.7)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1
        }]
    };

    return (
        <>
            <div className={cx("containerPage")} style={{ backgroundColor: "#F0F3F7" }}>
                <div className={cx("contentPage")}>
                    <div className={cx("overviewList")}>
                        <div className="row">
                            {cardData.map((card, index) => (
                                <div className="p-0 col-sm-12 col-lg-3" key={index}>
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
                        <h4>Thống kê doanh thu</h4>
                        <div className="row mb-3">
                            <div className="col-lg-8 col-md-12 d-flex align-items-center">
                                <h6>Tổng doanh thu: {VND.format(totalAmount)}</h6>

                            </div>
                            <div className={`${cx("dateRange")} col-lg-4 col-md-12 d-flex justify-content-center`}>

                                <RangePicker onChange={onChange} className={cx("dateRangePicker")} />


                            </div>
                            <div className="col-lg-8 col-md-8 col-sm-12">
                                <Line data={revenueData} options={chartOptions} />
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-12 d-flex justify-content-center align-items-center">
                                <Doughnut style={{ maxHeight: "300px", maxWidth: "300px" }} data={chartData} />
                            </div>

                        </div>


                    </div>
                    <div className={cx("recentOrders")}>
                        <h4>Đơn sửa chữa gần đây</h4>
                        <Table className="mt-3" rowKey={"id"} columns={columns} dataSource={dataTable}
                            pagination={{
                                defaultPageSize: 5,
                                showSizeChanger: true,
                                pageSizeOptions: ['5', '10', '15']
                            }}
                            onChange={handleTableChange} />
                    </div>

                </div >
            </div >
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
                        <div className="">
                            <div className="form-floating mb-3" >
                                <p className="fw-bold">Thời gian mong muốn</p>
                                <DatePicker
                                    multiple
                                    onChange={() => { }}
                                    maxTagCount="responsive"
                                    value={dateArrray}
                                    size="large"
                                    disabled
                                />
                            </div>

                        </div>

                        <div className="">
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
                    <div className={cx("inforRepair")}>
                        <h5 className="mb-2">Thông tin sửa chữa</h5>
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <div className="form-floating mb-3" >
                                    <input
                                        type="text"
                                        className={`${cx("inputForm")} form-control`}
                                        id="floatingInput"
                                        placeholder="name@example.com"
                                        readOnly value={record?.DetailOrder && record?.DetailOrder.Schedule.Repairer.usernameRepairer} onChange={() => { }}
                                    />

                                    <label htmlFor="floatingInput">Họ tên thợ</label>
                                </div>

                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className={`${cx("inputForm")} form-control`}
                                        id="floatingInput"
                                        placeholder="name@example.com"
                                        readOnly value={record?.DetailOrder && moment(record?.DetailOrder.Schedule.workDay).format('YYYY-MM-DD')} onChange={() => { }}
                                    />
                                    <label htmlFor="floatingInput">Ngày sửa chữa</label>
                                </div>

                            </div>
                            <div>
                                <p ><span className="fw-bold">Thời gian sửa chữa:</span> {record?.DetailOrder && record.DetailOrder.timeRepair ? record.DetailOrder.timeRepair.split('-')[0] : 'Đang chờ thợ duyệt'}</p>
                            </div>
                        </div>
                    </div>
                    <div className={cx("statusOrder")}>
                        <span>Trạng thái:</span>
                        <div className={`${cx("status")} ${record && record?.status === 'W' ? 'text-warning border-warning' :
                            (record?.status === 'A' ? 'text-success border-success' :
                                (record?.status === 'R' ? 'text-warning text-opacity-50 border-warning-subtle' :
                                    (record?.status === 'S' ? 'text-primary border-primary' : 'text-danger border-danger')))}`}>
                            {record && record?.status === 'W' ? 'Đang chờ' : (record?.status == 'A' ? 'Đã duyệt' : (record?.status === 'R' ? 'Đang sửa' : (record?.status === 'S' ? 'Hoàn thành' : (record?.status === 'P' ? 'Đang duyệt' : 'Đã hủy'))))}
                        </div>
                    </div>
                </div>
            </Drawer>
            {/* <Drawer onClose={onClose} open={open} width={600} title={
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
            </Drawer> */}
        </>
    );
}

export default AdminHomePage;