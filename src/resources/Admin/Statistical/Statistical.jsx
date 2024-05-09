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
import { Doughnut, Line } from 'react-chartjs-2';

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


function Statistical() {

    const [type, setType] = useState('datepicker');
    const [typeCategori, setTypeCategori] = useState('datepicker');
    const [dataEarning, setDataEarning] = useState();
    const [dataEarningCategori, setDataEarningCategori] = useState();
    const [dataEarningPie, setDataEarningPie] = useState();
    const [totalAmount, setTotalAmount] = useState();
    const [totalAmountCategori, setTotalAmountCategori] = useState();
    const [dateSend, setDateSend] = useState();
    const [dateSendCategori, setDateSendCategori] = useState();
    const [loadings, setLoadings] = useState();
    const [loadingsCategori, setLoadingsCategori] = useState();

    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });


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
                            setTotalAmount(res.data.totalAmount)
                            setDataEarningPie(res.data.listAmountByService)
                            // console.log(res.data)
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
    const handleConfirmCategori = () => {
        if (dateSendCategori && dateSendCategori.data) {
            console.log(dateSendCategori)

            setLoadingsCategori(true)
            axios.get("http://localhost:3000/statistical/earningbyCategori", {
                params: {
                    dateSendCategori
                }
            })
                .then(res => {
                    if (res.data.success) {
                        setTimeout(() => {
                            setLoadingsCategori(false)
                            setTotalAmountCategori(res.data.totalAmount)
                            setDataEarningCategori(res.data.listOrderByCategori)
                            console.log(res.data)
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
        let res = await axios.get("http://localhost:3000/statistical/earningSelect");
        if (res && res.data) {
            setDataEarning(res.data.earningTotal)
            setTotalAmount(res.data.totalAmount)
            setDataEarningPie(res.data.listAmountByService)
            console.log(res.data.earningTotal)
        }
    }

    const featchEarningByCategori = async () => {
        let res = await axios.get("http://localhost:3000/statistical/earningbyCategori");
        if (res && res.data) {
            setDataEarningCategori(res.data.listOrderByCategori);
            setTotalAmountCategori(res.data.totalAmount)
            console.log(res.data)
        }
    }

    useEffect(() => {
        featchEarning();
        featchEarningByCategori();
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
    const labelsCategori = dataEarningCategori?.map(item => item.categori.nameCategories);
    const dataCategori = dataEarningCategori?.map(item => +item.totalAmount);

    const revenueDataCategori = {
        labels: labelsCategori,
        datasets: [
            {
                label: 'Doanh thu',
                data: dataCategori,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }
        ]
    };

    const chartOptionsCategori = {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Doanh thu (VND)'
                }
            },
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
        labels: dataEarningCategori?.map(item => item.categori.nameCategories),
        datasets: [{
            label: 'Tổng doanh thu',
            data: dataEarningCategori?.map(item => item.totalAmount),
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
            <div className={cx("contentPage")}>
                <div className={cx("chartCard")}>
                    <h4>Thống kê doanh thu</h4>
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

                    <div className="chart mt-4 row">
                        <div className="col-lg-9 col-md-8 col-sm-12">
                            <h6>Tổng doanh thu: {VND.format(totalAmount)}</h6>
                            <Line data={revenueData} style={{ maxHeight: "500px" }} options={chartOptions} />
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-12 d-flex justify-content-center align-items-center">
                            <Doughnut style={{ maxHeight: "300px", maxWidth: "300px" }} data={chartData} />
                        </div>

                    </div>
                </div>
                <div className={cx("chartCard")} style={{ marginTop: "20px" }}>
                    <h4>Thống kê loại thiết bị sửa chữa</h4>
                    <div className="datepick">
                        <Space className="mt-3">
                            <Select style={{ width: "130px" }} value={typeCategori} onChange={setTypeCategori}>
                                <Option value="datepicker">Khoảng ngày</Option>
                                <Option value="month">Tháng</Option>
                                <Option value="year">Năm</Option>
                            </Select>
                            <PickerWithTypeCategori type={typeCategori} onChange={handleDateChangeCategori} />
                        </Space>
                        <Button loading={loadingsCategori} type="primary" className="ms-5 mt-2" onClick={handleConfirmCategori}>Thống kê</Button>
                    </div>
                    <div className="mt-4 row">
                        <div className="col-lg-9 col-md-8 col-sm-12">
                            <h6>Tổng doanh thu: {VND.format(totalAmountCategori)}</h6>
                            <Line data={revenueDataCategori} style={{ maxHeight: "500px" }} options={chartOptionsCategori} />
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-12 d-flex justify-content-center align-items-center">
                            <Doughnut style={{ maxHeight: "300px", maxWidth: "300px" }} data={chartDataCategori} options={chartOptionsPie} />
                        </div>

                    </div>
                </div>
            </div>
        </div >
    );
}

export default Statistical;