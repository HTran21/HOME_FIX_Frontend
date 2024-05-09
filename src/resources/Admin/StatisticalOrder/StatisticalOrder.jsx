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

const PickerWithTypeCategori = ({ type, onChange }) => {
    if (type === 'datepicker') return <RangePicker onChange={onChange} />
    // if (type === 'week') return <DatePicker onChange={onChange} picker="week" />;
    if (type === 'month') return <DatePicker picker="month" onChange={onChange} />;
    if (type === 'year') return <DatePicker picker="year" onChange={onChange} />;
};



function StatisticalOrder() {

    const [type, setType] = useState('datepicker');
    const [typeCategori, setTypeCategori] = useState('datepicker');
    const [dataEarning, setDataEarning] = useState();
    const [dataOrder, setDataOrder] = useState();
    const [dataOrderCategori, setDataOrderCategori] = useState();
    const [dataOrderCategoriPie, setDataOrderCategoriPie] = useState();
    const [dateSend, setDateSend] = useState();
    const [dateSendCategori, setDateSendCategori] = useState();
    const [loadings, setLoadings] = useState();
    const [loadingsCategori, setLoadingsCategori] = useState();

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
    const handleDateChangeCategori = (dates, dateStrings) => {
        let dataToSend = {};
        switch (typeCategori) {
            case 'datepicker':
                dataToSend = { typeCategori: "datepicker", data: dateStrings };
                break;
            case 'month':
                dataToSend = { typeCategori: "month", data: dateStrings };
                break;
            case 'year':
                dataToSend = { typeCategori: "year", data: dateStrings };
                break;
            default:
                break;
        }
        setDateSendCategori(dataToSend)

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
                            setDataOrder(res.data.totalOrderByService)
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

    const handleConfirmCategori = () => {
        if (dateSendCategori && dateSendCategori.data) {
            setLoadingsCategori(true)
            axios.get("http://localhost:3000/statistical/orderbyCategori", {
                params: {
                    dateSendCategori
                }
            })
                .then(res => {
                    if (res.data.success) {
                        setTimeout(() => {
                            setLoadingsCategori(false)
                            setDataOrderCategori(res.data.totalOrderByCategori)
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
        let res = await axios.get("http://localhost:3000/statistical/order");
        if (res && res.data) {
            setDataEarning(res.data.orderTotal)
            setDataOrder(res.data.totalOrderByService)
            // console.log(res.data)
        }
    }
    const featchOrderCategori = async () => {
        let res = await axios.get("http://localhost:3000/statistical/orderbyCategori");
        if (res && res.data) {
            setDataOrderCategori(res.data.totalOrderByCategori)
            console.log(res.data)
        }
    }

    useEffect(() => {
        featchEarning();
        featchOrderCategori();
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

    const labelsCategori = dataOrderCategori?.map(item => item.categori.nameCategories);
    const dataCategori = dataOrderCategori?.map(item => +item.orders.length);

    const revenueDataCategori = {
        labels: labelsCategori,
        datasets: [
            {
                label: 'Đơn sửa chữa',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(75, 192, 192, 0.4)',
                hoverBorderColor: 'rgba(75, 192, 192, 1)',
                data: dataCategori,
            }
        ]
    };

    const chartOptionsCategori = {
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

    const chartData = {
        labels: dataOrder?.map(item => item.service.nameService),
        datasets: [{
            label: 'Tổng đơn',
            data: dataOrder?.map(item => item.orders.length),
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

    const colors = [
        'rgba(255, 99, 132, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 206, 86, 0.7)',
        'rgba(75, 192, 192, 0.7)',
        'rgba(153, 102, 255, 0.7)',
        'rgba(255, 159, 64, 0.7)',
        'rgba(255, 99, 64, 0.7)',
        'rgba(54, 162, 64, 0.7)',
        'rgba(255, 162, 86, 0.7)'
    ];

    const chartDataCategori = {
        labels: dataOrderCategori?.map(item => item.categori.nameCategories),
        datasets: [{
            label: 'Tổng đơn',
            data: dataOrderCategori?.map(item => item.orders.length),
            backgroundColor: colors.slice(0, dataCategori?.length),
            borderColor: colors.map(color => color.replace('0.7', '1')),
            borderWidth: 1,
        }]
    };
    const chartOptionsPie = {
        plugins: {
            legend: {
                display: false
            }
        },
        type: 'doughnut'
    };

    return (
        <div className={cx("containerPage")}>
            <div className="contentPage">
                <div className={cx("chartCard")}>
                    <h4>Thống kê đơn sửa chữa</h4>
                    <div className="datepick">
                        <Space className="mt-3">
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

                    <div className="chart row mt-5">

                        <div className="col-lg-8 col-md-6 col-sm-12">
                            <Bar data={revenueData} style={{ maxHeight: "500px" }} options={chartOptions} />
                            <h6 className="text-center mt-3">Số lượng đơn sửa chữa</h6>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 justify-content-center align-items-center" style={{ display: "flex", flexDirection: "column" }}>

                            <Doughnut style={{ maxHeight: "300px", maxWidth: "300px" }} data={chartData} />
                        </div>
                    </div>
                </div>



                <div className={cx("chartCard")} style={{ marginTop: "20px" }}>
                    <h4>Thống kê loại thiết bị sửa chữa</h4>
                    <Space className="mt-3">
                        <Select style={{ width: "130px" }} value={typeCategori} onChange={setTypeCategori}>
                            <Option value="datepicker">Khoảng ngày</Option>
                            {/* <Option value="week">Tuần</Option> */}
                            <Option value="month">Tháng</Option>
                            <Option value="year">Năm</Option>
                        </Select>
                        <PickerWithTypeCategori type={typeCategori} onChange={handleDateChangeCategori} />
                    </Space>
                    <Button loading={loadingsCategori} type="primary" className="ms-5 mt-2" onClick={handleConfirmCategori}>Thống kê</Button>
                    <div className="mt-4 row">
                        <div className="col-lg-8 col-md-6 col-sm-12">
                            <Bar data={revenueDataCategori} style={{ maxHeight: "500px" }} options={chartOptionsCategori} />
                            <h6 className="text-center mt-3">Số lượng đơn sửa chữa theo loại thiết bị</h6>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 justify-content-center align-items-center" style={{ display: "flex", flexDirection: "column" }}>
                            <Doughnut style={{ maxHeight: "300px", maxWidth: "300px" }} data={chartDataCategori} options={chartOptionsPie} />
                        </div>

                    </div>
                </div>
            </div>
        </div >
    );
}

export default StatisticalOrder;