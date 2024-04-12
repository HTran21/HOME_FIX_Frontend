import { useEffect, useState } from "react";
import styles from "./ConfirmOrder.module.scss";
import classNames from 'classnames/bind';
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tabs, DatePicker, Modal, Button, Drawer } from 'antd';
import { Link, useNavigate, useParams } from "react-router-dom";
import moment from 'moment';
import axios from '../../../service/customize_axios';

import { faArrowLeft, faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
const cx = classNames.bind(styles);

function ConfirmOrder() {
    const { id } = useParams();
    const [totalAmount, setTotalAmount] = useState(0);
    const [data, setData] = useState();
    const [taskRepair, setTaskRepair] = useState();
    const [listTask, setListTask] = useState();
    const [listService, setListService] = useState();
    const [listCategories, setListCategories] = useState();
    const [listOperations, setListOperations] = useState();
    const [idService, setIdService] = useState();
    const [idCategori, setidCategori] = useState();
    const [operation, setOperation] = useState();
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    const getDetailOrder = async () => {
        if (id) {
            const detailOrder = await axios.get("http://localhost:3000/order/fullDetail/" + id);
            setData(detailOrder.data)

        }
    }

    const fetchListTask = () => {
        axios.get("http://localhost:3000/order/detailTaskRepair/" + id)
            .then(res => {
                setTaskRepair(res.data)
                setListTask(res.data.TaskRepairs)
                setTotalAmount(res.data.totalAmount)
            })
            .catch((e) => console.log(e))
    }

    const fetchData = () => {
        axios.get("http://localhost:3000/service/getService")
            .then(res => {
                setListService(res.data.listService)
            })
    }
    useEffect(() => {
        if (idService !== '') {
            const id = idService;
            axios.get("http://localhost:3000/product/categories/" + id)
                .then(res => {
                    setListCategories(res.data)
                })
                .catch(err => console.log(err));
        }
        else {
            setListCategories()
        }
    }, [idService])
    useEffect(() => {
        if (idCategori) {
            axios.get("http://localhost:3000/service/getAllOperation", {
                params: {
                    ID_Categori: idCategori
                }
            })
                .then(res => {
                    setListOperations(res.data)
                    setOperation("")
                })
        }
    }, [idCategori])

    useEffect(() => {
        getDetailOrder();
        fetchListTask();
        fetchData();
    }, [])

    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    const [loadings, setLoadings] = useState();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        setIdService("");
        setidCategori("")
        setOperation("")
    };
    const handleOk = () => {
        if (operation !== "0") {
            setLoadings(true)
            let total = totalAmount;
            const selectedeOperation = listOperations.find(op => op.id == operation)
            total += selectedeOperation.price;
            axios.put("http://localhost:3000/order/updateTaskRepair/" + id, { total, operation })
                .then(res => {
                    if (res.data.success) {
                        setLoadings(false)
                        handleCancel();
                        toast.success(res.data.message);
                        getDetailOrder();
                        fetchListTask();
                        fetchData();
                    }
                    else {
                        toast.error(res.data.message);
                    }
                })
        }
    };


    const deleteTask = async (task) => {
        if (task) {
            let total = totalAmount;
            let ID_TaskRepair = task.id;
            console.log("ID_Task", ID_TaskRepair)
            // console.log("Task", task)
            total -= task.Operation.price;
            console.log("Task", total)

            axios.delete("http://localhost:3000/order/deleteTaskRepair/" + ID_TaskRepair)
                .then(res => {
                    if (res.data.success) {
                        toast.success(res.data.message)
                        fetchListTask();

                    }
                    else {
                        toast.success(res.data.message)
                    }
                })
        }

    }

    return (
        <>
            <div className="container">
                <div className={cx("titlePage")}>
                    <h4>Xác nhận đơn sửa chữa</h4>
                    <div className="d-flex">
                        <Button className="d-inline" type="primary" onClick={showDrawer}>Đơn sửa chữa</Button>
                        <div className={`d-inline ms-auto ${cx("amountNumber")}`}>Tổng tiền: {VND.format(totalAmount)}</div>
                    </div>
                    <div className={cx("statusPayment")}>
                        <div>
                            <Button onClick={() => showModal()} className="d-inline" type="primary" >Thêm thao tác</Button>
                        </div>
                        <p className="p-2 ms-auto">Thanh toán: {taskRepair?.paymentStatus == 'UP' ? 'Chưa thanh toán' : 'Đã thanh toán'}</p>

                    </div>
                </div>
                <div className="contentPage">
                    <div className="listTask mt-2 mb-2">

                        <div className="row">
                            {listTask?.map((task, index) => (
                                <div key={index} className="col-lg-4 col-md-6 col-sm-12">
                                    <div className={cx("cardTask")}>
                                        <div className={cx("titleTask")}>
                                            <p>Sửa chữa {task.Operation.Categori.nameCategories}</p>
                                            <div className={cx("iconCancle")} onClick={() => deleteTask(task)}><FontAwesomeIcon icon={faXmark} /></div>
                                        </div>
                                        <div className="row mt-1">
                                            <div className={`col-9 ${cx("textTask")}`}>{task.Operation.nameOperation}</div>
                                            <div className={`col-3 ${cx("priceTask")}`}>{task.Operation.price}</div>
                                        </div>
                                    </div>

                                </div>
                            ))}


                        </div>


                    </div>


                    <div className={cx("backHome")}>
                        <Link to={'/repairer'} className="text-decoration"> <button className={cx("btnBackHome")}>Về trang chủ</button></Link>
                    </div>
                </div>

            </div >
            <Modal title="Thêm thao tác" okText="Thêm" cancelText="Đóng" centered open={isModalOpen} onOk={handleOk} onCancel={handleCancel} confirmLoading={loadings} >
                <select className="form-select mb-2" value={idService} onChange={(e) => setIdService(e.target.value)} aria-label="Default select example">
                    <option value="0">Chọn dịch vụ</option>
                    {
                        listService?.map((service, i) =>
                            <option key={i} value={service.id}>{service.nameService}</option>
                        )
                    }
                </select>
                <select className="form-select mb-2" aria-label="Default select example"
                    value={idCategori} onChange={(e) => setidCategori(e.target.value)}>
                    <option value="0">Chọn thiết bị</option>
                    {
                        listCategories?.map((catagory, i) =>
                            <option key={i} value={catagory.id}>{catagory.nameCategories}</option>
                        )
                    }
                </select>
                <select className="form-select mb-2" aria-label="Default select example"
                    value={operation} onChange={(e) => setOperation(e.target.value)}>
                    <option value="0">Chọn thao tác</option>
                    {
                        listOperations?.map((operation, i) =>
                            <option key={i} value={operation.id}>{operation.nameOperation}</option>
                        )
                    }
                </select>


            </Modal>
            <Drawer title={(<div style={{ fontSize: "18px" }}>Thông tin sửa chữa</div>)} onClose={onClose} closeIcon={false} width={300} open={open}>
                <div className="inforUser mb-2">
                    <h6 className="mb-2">Thông tin khách hàng</h6>
                    <p className={cx("textInfor")}><span className={cx("tileInfo")}>Họ tên:</span> {data?.Order.fullName}</p>
                    <p className={cx("textInfor")}><span className={cx("tileInfo")}>Địa chỉ:</span> {data?.Order.address}</p>
                    <p className={cx("textInfor")}><span className={cx("tileInfo")}>Email:</span> {data?.Order.email}</p>
                    <p className={cx("textInfor")}><span className={cx("tileInfo")}>Số điện thoại:</span> {data?.Order.phone}</p>

                </div>
                <div className="service mb-2">
                    <h6>Thông tin dịch vụ</h6>
                    <p className={cx("textInfor")}><span className={cx("tileInfo")}>Dịch vụ:</span> {data?.Order.Categori.Service.nameService}</p>
                </div>
                <div className="inforProduct mb-2">
                    <h6 className="mb-2">Thông tin thiết bị</h6>
                    <p className={cx("textInfor")}><span className={cx("tileInfo")}>Nhãn hàng:</span> {data?.Order.ID_Product && data?.Order.Product.Brand.nameBrand}</p>
                    <p className={cx("textInfor")}><span className={cx("tileInfo")}>Loại thiết bị:</span> {data?.Order.Categori.nameCategories}</p>
                    <p className={cx("textInfor")}><span className={cx("tileInfo")}>Thiết bị:</span> {data?.Order.ID_Product && data?.Order.Product.nameProduct}</p>
                </div>
                <div className="inforRepair mb-2">
                    <h6>Thông tin sửa chữa</h6>
                    <p className={cx("textInfor")}><span className={cx("tileInfo")}>Ngày sửa chữa:</span> {moment(data?.Schedule.workDay).format('DD-MM-YYYY')}</p>
                    <p className={cx("textInfor")}><span className={cx("tileInfo")}>Thợ sửa chữa:</span> {data?.Schedule.Repairer.usernameRepairer}</p>
                    <p className={cx("textInfor")}><span className={cx("tileInfo")}>Thời gian</span> {data?.timeRepair}</p>
                </div>
            </Drawer>
        </>
    );
}

export default ConfirmOrder;