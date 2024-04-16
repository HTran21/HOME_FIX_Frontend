import axios from "../../../service/customize_axios";
import { useEffect, useState, useRef } from "react";
import className from "classnames/bind";
import styles from "./Statistical.module.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from 'moment';
import { toast } from "react-toastify";
import { Button, DatePicker, Empty, Select, Space, TimePicker } from 'antd';
const { RangePicker } = DatePicker;

import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

const cx = className.bind(styles);

const { Option } = Select;
const PickerWithType = ({ type, onChange }) => {
    if (type === 'datepicker') return <RangePicker onChange={onChange} />
    // if (type === 'week') return <DatePicker onChange={onChange} picker="week" />;
    if (type === 'month') return <DatePicker picker="month" onChange={onChange} />;
    if (type === 'year') return <DatePicker picker="year" onChange={onChange} />;
};


function Statistical() {

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
            axios.get("http://localhost:3000/statistical/earningSelect", {
                params: {
                    dateSend
                }
            })
                .then(res => {
                    if (res.data.success) {
                        setTimeout(() => {
                            setLoadings(false)
                            setDataEarning(res.data.earningTotal)
                        }, 2000)
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
        let res = await axios.get("http://localhost:3000/statistical/earning");
        if (res && res.data) {
            setDataEarning(res.data.earningTotal)
        }
    }

    useEffect(() => {
        featchEarning()
    }, [])

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

    return (
        <div className={cx("containerPage")}>
            <div className="titlePage">
                <h4>Thống kê doanh thu</h4>
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
                    <Line data={revenueData} style={{ maxHeight: "500px" }} options={chartOptions} />
                </div>
            </div>
        </div >
    );
}

export default Statistical;