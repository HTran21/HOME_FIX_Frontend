import className from "classnames/bind";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet, faScrewdriverWrench, faCircleUser, faDesktop } from "@fortawesome/free-solid-svg-icons";
import { Space, Table, Tag } from 'antd';
import styles from "./AdminHomePage.module.scss";

import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

import 'rsuite/dist/rsuite.min.css';
import { DateRangePicker } from 'rsuite';


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

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: (_, { tags }) => (
            <>
                {tags.map((tag) => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
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
                <a>Invite {record.name}</a>
                <a>Delete</a>
            </Space>
        ),
    },
];
const dataTable = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];


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

    const handleDateRangeChange = (value) => {
        setDateRange(value);
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
                        <h5>Recent Orders</h5>
                        <Table columns={columns} dataSource={dataTable} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminHomePage;