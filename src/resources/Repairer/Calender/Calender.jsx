import styles from "./Calender.module.scss";
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
// import { DatePicker, Space, Calendar } from 'antd';
import { Calendar } from 'rsuite';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from '../../../service/customize_axios';
import moment from 'moment';
import { Modal } from 'antd';
import { toast } from "react-toastify";

function CalenderRepairer() {
    const user = useSelector((state) => state.user.user);
    const id = user?.id;
    const [data, setData] = useState();
    // const onChange = (date, dateString) => {
    //     console.log(date, dateString);
    // };
    // const onPanelChange = (value, mode) => {
    //     console.log(value.format('YYYY-MM-DD'), mode);
    // };

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/schedule/dayWork/' + id);
            setData(response.data.data)
            // console.log("Date", response.data.data)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, [])
    // const cellRender = (value) => {
    //     const date = value.format('YYYY-MM-DD');
    //     if (data && data.length > 0) {
    //         const isHighlighted = data.find((item) => moment(item.workDay).format('YYYY-MM-DD') === date);
    //         console.log("isHiglth", isHighlighted)
    //         if (isHighlighted) {
    //             return <div className="highlighted-day" />;
    //         }
    //     }
    //     return <></>;
    // };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [record, setRecord] = useState();
    const showModal = (date) => {
        setIsModalOpen(true);
        const formatDate = moment(date).format('YYYY-MM-DD')
        console.log(formatDate)
        setRecord(formatDate);
    }

    const handleCancel = () => {
        setIsModalOpen(false)
        setRecord()
    }
    const handleOk = (date) => {
        let currentDay = moment();
        if (date && id) {
            if (moment(date).isBefore(currentDay, 'day')) {
                toast.error("Không thể xóa ngày làm việc trong quá khứ")
                handleCancel()
            } else {
                axios.delete("http://localhost:3000/schedule/deleteSchedule", {
                    params: {
                        id: id,
                        date: date
                    }
                })
                    .then(res => {
                        if (res.data.success) {
                            handleCancel()
                            toast.success(res.data.message)
                            fetchData()
                        } else {
                            toast.error(res.data.message)
                        }
                    })
            }
        }
    }

    const [isModalListWork, setIsModalListWork] = useState(false)
    const [recordListWork, setRecordListWork] = useState();
    const showModalListWork = (listWork) => {
        setIsModalListWork(true);
        setRecordListWork(listWork);
    }

    const handleCancelListWork = () => {
        setIsModalListWork(false)
        setRecordListWork()
    }
    return (
        <>
            <style>
                {`
      .bg-gray {
        background-color: #DBEAF8;
      }
      `}
            </style>
            <div className="container">
                <div className={`${cx("titlePage")}`}>
                    <h4>Lịch làm việc</h4>
                    <Link to={"/repairer/calendar/create"} className={`${cx("btnAdd")} text-decoration-none text-light`}> Tạo lịch </Link>
                </div>
                <div className="contentPage">

                    <Calendar
                        bordered
                        cellClassName={(date) => {
                            const dateString = moment(date).format('YYYY-MM-DD');
                            if (data && data.length > 0) {
                                const isHighlighted = data.find((item) => moment(item.workDay).format('YYYY-MM-DD') === dateString);
                                return isHighlighted ? 'bg-gray' : '';
                            }
                            return '';
                        }}

                        renderCell={(value) => {
                            if (data && data.length > 0) {
                                const filteredData = data.filter(item => moment(item.workDay).format('YYYY-MM-DD') === moment(value).format('YYYY-MM-DD'));
                                if (filteredData.length === 0) {
                                    return null;
                                }
                                const workToday = filteredData[0].DetailOrders;
                                if (workToday.length) {
                                    return (
                                        <div>
                                            Đơn: {workToday.length}
                                        </div>
                                    )
                                }
                            }

                        }}

                        onSelect={(value) => {
                            if (data && data.length > 0) {
                                const filteredData = data.filter(item => moment(item.workDay).format('YYYY-MM-DD') === moment(value).format('YYYY-MM-DD'));
                                if (filteredData.length === 0) {
                                    return null;
                                }
                                const workToday = filteredData[0].DetailOrders;
                                if (workToday.length > 0) {
                                    showModalListWork(workToday)
                                    console.log(workToday)
                                } else {
                                    showModal(value)
                                }
                            }

                        }}


                    />

                </div>
            </div >
            <Modal title="Xóa lịch làm việc" open={isModalOpen} onOk={() => handleOk(record)} onCancel={handleCancel} okButtonProps={{ style: { backgroundColor: 'red' } }} okText="Xóa" cancelText="Đóng">
                <p>Bạn chắc chắn muốn xóa lịch làm việc ngày {moment(record).format('DD-MM-YYYY')}</p>
            </Modal>
            <Modal title="Danh sách công việc" open={isModalListWork} onOk={handleCancelListWork} onCancel={handleCancelListWork} okButtonProps={{ style: { display: "none" } }} okText="Xóa" cancelText="Đóng">
                <div>
                    {recordListWork?.map((work, index) => (
                        <div key={index} className={cx("cardWork")}>
                            <div className="row" >
                                <div className="col-6">ID: {work.ID_Order}</div>
                                <div className="col-6 text-end">{work.timeRepair.split('-')[0]} {moment(work.Schedule.workDay).format('DD/MM/YYYY')}</div>
                            </div>
                            <div className="row">
                                <div className={`${cx("contentWork")}`}>
                                    <p className={cx("titleWorkContent")}>Sửa chữa {work.Order.Categori.nameCategories}</p>
                                    <p>Tên: {work.Order.fullName}</p>
                                    <p>Số điện thoại: {work.Order.phone}</p>
                                    <p>Địa Chỉ:  {work.Order.address}</p>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            </Modal>
        </>

    );
}

export default CalenderRepairer;