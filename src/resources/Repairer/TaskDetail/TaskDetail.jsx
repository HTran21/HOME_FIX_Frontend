import { faArrowLeft, faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./TaskDetail.module.scss";
import classNames from 'classnames/bind';
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { AndroidOutlined, AppleOutlined } from '@ant-design/icons';
import { Tabs, DatePicker, Modal, Button, Drawer } from 'antd';
import axios from '../../../service/customize_axios';
import moment from 'moment';
import { toast } from "react-toastify";
const cx = classNames.bind(styles);

import { io } from "socket.io-client";

const socket = io.connect("http://localhost:3000", {
    transports: ["websocket"],
});


function TaskDetail() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState();
    const [listService, setListService] = useState();
    const [listCategories, setListCategories] = useState();
    const [listOperations, setListOperations] = useState();
    const [idService, setIdService] = useState();
    const [idCategori, setidCategori] = useState();
    const [operation, setOperation] = useState({});
    const [listTask, setListTask] = useState([]);
    const [listOperationShow, setListOperationShow] = useState();

    const [totalAmount, setTotalAmount] = useState(0);

    const getDetailOrder = async () => {
        if (id) {
            const detailOrder = await axios.get("http://localhost:3000/order/fullDetail/" + id);
            setData(detailOrder.data.exsitDetailOrder)

        }
    }

    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
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
        if (operation !== "0") {
            axios.get("http://localhost:3000/service/getOperation")
                .then(res => {
                    setListOperationShow(res.data)
                })
        }
    }, [operation])
    useEffect(() => {
        getDetailOrder();
        fetchData();

    }, [])

    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        if (operation !== "0") {
            let total = totalAmount;
            const selectedeOperation = listOperationShow.find(op => op.id == operation)
            total += selectedeOperation.price;
            setTotalAmount(total)
            console.log("Tong", total)
            setListTask(prevState => [...prevState, selectedeOperation]);
            setIsModalOpen(false);
            setIdService("");
            setidCategori("")
            setOperation("")
            setListOperations()
        }
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        setIdService("");
        setidCategori("")
        setOperation("")
    };

    const deleteTask = (task) => {
        const id = task.id;
        let total = totalAmount;
        total -= task.price;

        let deleted = false;

        const newListTask = listTask.filter(op => {
            if (op.id === id && !deleted) {
                deleted = true;
                return false;
            }
            return true;
        });

        setListTask(newListTask);
        setTotalAmount(total);
    }


    const paymentTask = () => {
        console.log("Danh sach cac thao tac", listTask);
        console.log("Tong so tien phai tra", totalAmount);
        if (listTask.length > 0) {
            axios.post("http://localhost:3000/order/taskRepair/" + id, { totalAmount, listTask })
                .then(res => {
                    if (res.data.success) {
                        toast.success(res.data.message);
                        navigate("/repairer/confirm/" + id);
                        socket.emit("orderStatusChange")
                    }
                    else {
                        toast.error(res.data.message)
                    }
                })
        }
        else {
            toast.warn("Vui lòng thêm thao tác")
        }
    }

    return (
        <div className="container">
            <div className={cx("titlePage")}>
                <div className={cx("iconBack")} onClick={() => navigate("/repairer/work")}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </div>
                <h4>Thao tác tiến hành</h4>
                <div className="d-flex">
                    <Button className="d-inline" type="primary" onClick={showDrawer}>Đơn sửa chữa</Button>
                    <Button className="d-inline ms-auto" type="primary" onClick={showModal}>Thêm thao tác</Button>
                </div>

            </div>
            <div className="contentPage">
                <div className="listTask mt-3 mb-5">

                    <div className="row">
                        {listTask && listTask.length > 0 && listTask.map((task, index) => (
                            <div key={index} className="col-lg-4 col-md-6 col-sm-12">
                                <div className={cx("cardTask")}>
                                    <div className={cx("titleTask")}>
                                        <p>Sửa chữa {task.Categori.nameCategories}</p>
                                        <div className={cx("iconCancle")} onClick={() => deleteTask(task)}><FontAwesomeIcon icon={faXmark} /></div>
                                    </div>
                                    <div className="row mt-1">
                                        <div className={`col-9 ${cx("textTask")}`}>{task.nameOperation}</div>
                                        <div className={`col-3 ${cx("priceTask")}`}>{VND.format(task.price)}</div>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>


                </div>
                <div className={cx("payment")} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <p>Tổng tiền: {VND.format(totalAmount)}</p>
                    <div className="d-flex">
                        <button className={cx("btnPayment")} onClick={paymentTask}>Thanh toán</button>
                    </div>
                </div>
            </div>
            <Modal title="Thêm thao tác" okText="Thêm" cancelText="Đóng" centered open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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
        </div>
    );
}

export default TaskDetail;