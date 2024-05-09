import { faBan, faCheck, faHourglassHalf, faMagnifyingGlass, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Statistic.module.scss";
import classNames from 'classnames/bind';
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AndroidOutlined, AppleOutlined } from '@ant-design/icons';
import { Button, DatePicker, Empty, Select, Space, TimePicker } from 'antd';
import axios from '../../../service/customize_axios';
import { io } from "socket.io-client";
import moment from 'moment';
import { toast } from "react-toastify";
import { Bar, Doughnut, Line } from 'react-chartjs-2';
const cx = classNames.bind(styles);

const socket = io.connect("http://localhost:3000", {
    transports: ["websocket"],
});

const { Option } = Select;
const { RangePicker } = DatePicker;
const PickerWithType = ({ type, onChange }) => {
    if (type === 'datepicker') return <RangePicker onChange={onChange} />;
    if (type === 'month') return <DatePicker picker="month" onChange={onChange} />;
    if (type === 'year') return <DatePicker picker="year" onChange={onChange} />;
};


function Statistic() {

    const user = useSelector((state) => state.user.user);
    const id = user?.id;
    const [data, setData] = useState();
    const [type, setType] = useState('datepicker');
    const [dataOrderRepairer, setDataOrderRepairer] = useState();
    const [totalOrderSuccess, setTotalOrderSuccess] = useState();
    const [totalOrderFail, setTotalOrderFail] = useState();
    const [dateSend, setDateSend] = useState();
    const [loadings, setLoadings] = useState();

    const featchJob = () => {
        axios.get("http://localhost:3000/statistical/overviewJob", {
            params: {
                ID_Repairer: id
            }
        })
            .then(res => {
                if (res.data.success) {
                    setData(res.data.listJob)
                }
            })
    }

    const featchJobOverview = () => {
        axios.get("http://localhost:3000/statistical/repairer", {
            params: {
                id
            }
        })
            .then(res => {
                if (res.data.success) {
                    setDataOrderRepairer(res.data.jobTotal)
                    setTotalOrderSuccess(res.data.totalOrderSuccess)
                    setTotalOrderFail(res.data.totalOrderFail)
                }
            })
    }

    useEffect(() => {
        featchJob();
        featchJobOverview();
    }, [])

    const overView = () => {
        let failCount = 0;
        let successCount = 0;

        data?.forEach((order) => {
            if (order.Order.status === 'C') {
                failCount++;
            } else if (order.Order.status === 'S') {
                successCount++;
            }
        });

        return { failCount, successCount };
    }

    const failCount = overView();
    const successCount = overView();


    const handleDateChange = (dates, dateStrings) => {
        let dataToSend = {};
        switch (type) {
            case 'datepicker':
                dataToSend = { type: "datepicker", data: dateStrings };
                break;
            case 'month':
                dataToSend = { type: "month", data: dateStrings };
                break;
            case 'year':
                dataToSend = { type: "year", data: dateStrings };
                break;
            default:
                break;
        }
        setDateSend(dataToSend)

    };
    const handleConfirm = () => {
        if (dateSend && dateSend.data) {
            setLoadings(true)
            axios.get("http://localhost:3000/statistical/repairer", {
                params: {
                    dateSend, id
                }
            })
                .then(res => {
                    if (res.data.success) {
                        setTimeout(() => {
                            setLoadings(false)
                            setDataOrderRepairer(res.data.jobTotal)
                            setTotalOrderSuccess(res.data.totalOrderSuccess)
                            setTotalOrderFail(res.data.totalOrderFail)

                        }, 2000)
                    } else {
                        toast.error(res.data.message)
                    }
                })
        } else {
            toast.warn("Vui lòng chọn thời gian")
        }


    }

    const labels = dataOrderRepairer?.map(item => item.workDay);
    const successData = dataOrderRepairer?.map(item => item.successfulJobs);
    const failureData = dataOrderRepairer?.map(item => item.failedJobs);

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Đơn thành công',
                backgroundColor: 'rgba(75,192,192,0.6)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(75,192,192,0.8)',
                hoverBorderColor: 'rgba(75,192,192,1)',
                data: successData
            },
            {
                label: 'Đơn thất bại',
                backgroundColor: 'rgba(255,99,132,0.6)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.8)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: failureData
            }
        ]
    };
    const options = {
        responsive: true,
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
            },
        },
    };

    const totalOrder = totalOrderSuccess + totalOrderFail;
    const dataPie = {
        labels: ['Thành công', 'Thất bại'],
        datasets: [
            {
                data: [(totalOrderSuccess / totalOrder) * 100, (totalOrderFail / totalOrder) * 100],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const optionsPie = {
        plugins: {
            title: {
                display: true,
                text: 'Biểu đồ tỷ lệ thành công và thất bại của đơn sửa chữa',
                fontSize: 16,
            },
        },
    };

    return (
        <>
            <>
                <style>
                    {
                        ` .ant-picker-panels > *:first-child button.ant-picker-header-next-btn {
            visibility: visible !important;
          }
          
          .ant-picker-panels > *:first-child button.ant-picker-header-super-next-btn {
            visibility: visible !important;
          }
          
          .ant-picker-panels > *:last-child {
            display: none;
          }
          
          .ant-picker-panel-container, .ant-picker-footer {
            width: 280px !important;
          }
          
          .ant-picker-footer-extra > div {
            flex-wrap: wrap !important; 
          `}

                </style></>
            <div className="container">
                <div className={cx("titlePage")}>
                    <div className="row">
                        <div className="col-6">
                            <div className={cx("overviewCard")}>
                                <div className={cx("layoutIconS")}>
                                    <FontAwesomeIcon icon={faCheck} />
                                </div>

                                <div className={cx("contentOverViewCard")}>
                                    <div className={cx("numberOverview")}>
                                        {successCount.successCount}
                                    </div>
                                    <p>Công việc</p>
                                </div>

                            </div>
                        </div>
                        <div className="col-6">
                            <div className={cx("overviewCard")}>
                                <div className={cx("layoutIconW")}>
                                    <FontAwesomeIcon icon={faBan} />
                                </div>
                                <div className={cx("contentOverViewCard")}>
                                    <div className={cx("numberOverview")}>
                                        {failCount.failCount}
                                    </div>
                                    <p>Công việc</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="contentPage">
                    <div className="d-flex mt-2">
                        <h5>Thống kê công việc</h5>
                        <Button loading={loadings} type="primary" className="ms-auto" onClick={handleConfirm}>Thống kê</Button>
                    </div>
                    <Space className="mt-2">
                        <Select style={{ width: "120px" }} value={type} onChange={setType}>
                            <Option value="datepicker">Khoảng ngày</Option>
                            <Option value="month">Tháng</Option>
                            <Option value="year">Năm</Option>
                        </Select>
                        <PickerWithType type={type} onChange={handleDateChange} />
                    </Space>

                    <div className="chart mt-2">
                        <Bar
                            data={chartData}
                            options={options}
                        />

                    </div>
                    <div className="d-flex">
                        <Doughnut className="m-auto" style={{ maxWidth: "230px", maxHeight: "230px" }} data={dataPie} options={optionsPie} />
                    </div>

                </div>


            </div>

        </>
    );
}

export default Statistic;