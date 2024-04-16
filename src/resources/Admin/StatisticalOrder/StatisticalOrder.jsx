import axios from "../../../service/customize_axios";
import { useEffect, useState, useRef } from "react";
import className from "classnames/bind";
import styles from "./StatisticalOrder.module.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from 'moment';
import { toast } from "react-toastify";
import { Button, DatePicker, Empty, Select, Space, TimePicker } from 'antd';
const { RangePicker } = DatePicker;

import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

const cx = className.bind(styles);

const { Option } = Select;
const PickerWithType = ({ type, onChange }) => {
    if (type === 'datepicker') return <RangePicker onChange={onChange} />
    // if (type === 'week') return <DatePicker onChange={onChange} picker="week" />;
    if (type === 'month') return <DatePicker picker="month" onChange={onChange} />;
    if (type === 'year') return <DatePicker picker="year" onChange={onChange} />;
};


function StatisticalOrder() {

    const [type, setType] = useState('datepicker');
    const [dataEarning, setDataEarning] = useState();
    const [dateSend, setDateSend] = useState();
    const [loadings, setLoadings] = useState();

    const handleDateChange = (dates, dateStrings) => {
        let dataToSend = {};
        switch (type) {
            case 'datepicker':
                dataToSend = { type: "datepicker", data: dateStrings };
                break;
            // case 'week':
            //     dataToSend = { type: "week", data: dateStrings };
            //     break;
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
            axios.get("http://localhost:3000/statistical/order", {
                params: {
                    dateSend
                }
            })
                .then(res => {
                    if (res.data.success) {
                        setTimeout(() => {
                            setLoadings(false)
                            setDataEarning(res.data.orderTotal)
                        }, 2000)
                        console.log(res.data)
                    }
                    else {
                        toast.error(res.data.message)
                    }
                })
        } else {
            toast.warn("Vui lòng chọn thời gian")
        }


    }


    const featchEarning = async () => {
        let res = await axios.get("http://localhost:3000/statistical/order");
        if (res && res.data) {
            setDataEarning(res.data.orderTotal)
            console.log(res.data)
        }
    }

    useEffect(() => {
        featchEarning()
    }, [])

    const labels = dataEarning?.map(item => moment(item.createdAt).format('DD/MM/YYYY'));
    const data = dataEarning?.map(item => +item.count);

    const revenueData = {
        labels: labels,
        datasets: [
            {
                label: 'Đơn sửa chữa',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(75, 192, 192, 0.4)',
                hoverBorderColor: 'rgba(75, 192, 192, 1)',
                data: data,
            }
        ]
    };

    const chartOptions = {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Đơn sửa chữa'
                }
            },
            x: {
                title: {
                    display: true,
                    // text: 'Ngày'
                }
            }
        }
    };

    return (
        <div className={cx("containerPage")}>
            <div className="titlePage">
                <h4>Thống kê đơn sửa chữa</h4>
            </div>
            <div className="contentPage">
                <div className="datepick">
                    <Space className="mt-2">
                        <Select style={{ width: "130px" }} value={type} onChange={setType}>
                            <Option value="datepicker">Khoảng ngày</Option>
                            {/* <Option value="week">Tuần</Option> */}
                            <Option value="month">Tháng</Option>
                            <Option value="year">Năm</Option>
                        </Select>
                        <PickerWithType type={type} onChange={handleDateChange} />
                    </Space>
                    <Button loading={loadings} type="primary" className="ms-5 mt-2" onClick={handleConfirm}>Thống kê</Button>
                </div>

                <div className="chart">
                    {/* <Line data={revenueData} style={{ maxHeight: "500px" }} options={chartOptions} /> */}
                    <Bar data={revenueData} style={{ maxHeight: "500px" }} options={chartOptions} />
                </div>
            </div>
        </div >
    );
}

export default StatisticalOrder;