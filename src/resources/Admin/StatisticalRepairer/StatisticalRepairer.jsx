import axios from "../../../service/customize_axios";
import { useEffect, useState, useRef } from "react";
import className from "classnames/bind";
import styles from "./StatisticalRepairer.module.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from 'moment';
import { toast } from "react-toastify";
import { Button, DatePicker, Empty, Select, Space, TimePicker } from 'antd';
const { RangePicker } = DatePicker;
import PieChart from "./PieChart"

import Chart from 'chart.js/auto';
import { Bar, Doughnut } from 'react-chartjs-2';

const cx = className.bind(styles);

const { Option } = Select;
const PickerWithType = ({ type, onChange }) => {
    if (type === 'datepicker') return <RangePicker onChange={onChange} />
    // if (type === 'week') return <DatePicker onChange={onChange} picker="week" />;
    if (type === 'month') return <DatePicker picker="month" onChange={onChange} />;
    if (type === 'year') return <DatePicker picker="year" onChange={onChange} />;
};



function StatisticalRepairer() {

    const [type, setType] = useState('datepicker');
    const [dataOrder, setDataOrder] = useState();
    const [totalOrderSuccess, setTotalOrderSuccess] = useState();
    const [totalOrderFail, setTotalOrderFail] = useState();
    const [dateSend, setDateSend] = useState();
    const [loadings, setLoadings] = useState();

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
            axios.get("http://localhost:3000/statistical/repairerStatistic", {
                params: {
                    dateSend
                }
            })
                .then(res => {
                    if (res.data.success) {
                        setTimeout(() => {
                            setLoadings(false)
                            setDataOrder(res.data.totalOrderByRepaier)
                            setTotalOrderSuccess(res.data.totalOrderSuccess)
                            setTotalOrderFail(res.data.totalOrderFail)
                        }, 2000)
                        // console.log(res.data)
                    }
                    else {
                        toast.error(res.data.message)
                    }
                })
        } else {
            toast.warn("Vui lòng chọn thời gian")
        }


    }

    const fetchOrderByRepairer = async () => {
        let res = await axios.get("http://localhost:3000/statistical/repairerStatistic");
        if (res && res.data) {
            console.log(res.data)
            setDataOrder(res.data.totalOrderByRepaier)
            setTotalOrderSuccess(res.data.totalOrderSuccess)
            setTotalOrderFail(res.data.totalOrderFail)
        }
    }

    useEffect(() => {
        fetchOrderByRepairer();
    }, [])

    const labels = dataOrder?.map(repairer => repairer.repairer.usernameRepairer);
    const successData = dataOrder?.map(order => order.ordersSuccess.length);
    const failureData = dataOrder?.map(order => order.ordersFail.length);

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

    let totalOrder = totalOrderSuccess + totalOrderFail;

    const data = {
        labels: ['Thành công', 'Thất bại'],
        datasets: [
            {
                label: 'Tỷ lệ',
                data: [((totalOrderSuccess / totalOrder) * 100).toFixed(1), ((totalOrderFail / totalOrder) * 100).toFixed(1)],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(255, 99, 132, 0.6)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className={cx("containerPage")}>
            <div className="contentPage">
                <div className={cx("chartCard")}>
                    <h4>Thống kê thợ sửa chữa</h4>
                    <div className="datepick">
                        <Space className="mt-3">
                            <Select style={{ width: "130px" }} value={type} onChange={setType}>
                                <Option value="datepicker">Khoảng ngày</Option>

                                <Option value="month">Tháng</Option>
                                <Option value="year">Năm</Option>
                            </Select>
                            <PickerWithType type={type} onChange={handleDateChange} />
                        </Space>
                        <Button loading={loadings} type="primary" className="ms-5 mt-2" onClick={handleConfirm}>Thống kê</Button>
                    </div>

                    <div className="chart row mt-5" style={{ minHeight: "400px" }}>

                        <div className="col-lg-9 col-md-12 col-sm-12">
                            <Bar
                                data={chartData}
                                options={options}
                            />
                        </div>
                        <div className="col-lg-3 col-md-12 col-sm-12 justify-content-center align-items-center" style={{ display: "flex", flexDirection: "column" }}>
                            <Doughnut data={data} />
                        </div>
                    </div>
                </div>



            </div>
        </div >
    );
}

export default StatisticalRepairer;