import className from "classnames/bind";
import styles from "./ServiceOperation.module.scss";

const cx = className.bind(styles);

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import axios from '../../../service/customize_axios';
import { useEffect, useState } from "react";
import Accordion from 'react-bootstrap/Accordion';
import { Modal } from 'antd';
import { toast } from "react-toastify";

const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});


function ServiceOperation() {

    const [data, setData] = useState();
    const [nameOperation, setNameOperation] = useState("");
    const [priceOperation, setPriceOperation] = useState();
    const [idOperation, setIdOperation] = useState();
    const [errors, setErrors] = useState();

    const fecthData = () => {
        axios.get("http://localhost:3000/service/getAllOperation")
            .then(res => {
                setData(res.data)
                console.log(res.data)
            })
            .catch((error) => console.log(error))
    }


    useEffect(() => {
        fecthData();
    }, [])

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [operation, setOperation] = useState();
    const showModal = (operation) => {
        setIsModalOpen(true);
        setOperation(operation);
        setNameOperation(operation.nameOperation);
        setPriceOperation(operation.price);
        setIdOperation(operation.id);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        setNameOperation("");
        setPriceOperation();
        setIdOperation();

        setErrors();
    };
    const handleOk = () => {
        const newErrors = {};

        if (nameOperation.trim() === "") {
            newErrors.nameOperation = "Chưa nhập tên thao tác"
        }

        if (!priceOperation || priceOperation < 0) {
            newErrors.priceOperation = "Nhập sai định dạng"
        }

        if (Object.keys(newErrors).length === 0) {
            setErrors({});

            axios.post("http://localhost:3000/service/updateOperation/" + idOperation, { nameOperation, priceOperation })
                .then(res => {
                    if (res.data.success === false) {
                        toast.error(res.data.message)
                    }
                    else {
                        toast.success(res.data.message);
                        fecthData();
                        setIsModalOpen(false);
                        setNameOperation("");
                        setPriceOperation("");
                    }
                })
                .catch(err => console.log(err));


        }
        else {
            setErrors(newErrors)
            console.log(errors)
        }
    };

    const [showModalDelete, setShowModalDelete] = useState(false);
    const [idDelete, setIdDelete] = useState();
    const handleShowDelete = (operation) => {
        setShowModalDelete(true);
        setIdDelete(operation);
    }
    const handleDelete = (id) => {
        axios.delete('http://localhost:3000/service/deleteOperation/' + id)
            .then(res => {
                toast.success(res.data.message);
                setShowModalDelete(false);
                fecthData();
            })
            .catch((e) => console.log(e))
    }
    const handleCacleDelete = () => {
        setShowModalDelete(false);
        setIdDelete();
    }




    return (
        <>
            <div className={cx("containerPage")}>
                <div className="titleProduct">
                    <h4 className="d-inline-block">Thao tác của dịch vụ</h4>
                </div>
                <div className={cx("contentPage")}>
                    <div className={cx("titleContentService")}>
                        <img src="../public/icon/operation.png" alt="" className={cx("iconTitleContentService")} />
                        <div className={cx("contentTitleContentService")}>
                            <h5>Danh sách các thao tác</h5>
                            <p>Các thao tác của từng dịch vụ.</p>
                        </div>
                    </div>
                    <div className="listOperationService mt-4">
                        {data?.map((item, i) => (
                            <div key={i}>
                                <Accordion>
                                    <Accordion.Item eventKey={i}>
                                        <Accordion.Header style={{ border: '1px solid #CCD3CA', padding: 0 }}>{item.nameService}</Accordion.Header>
                                        <Accordion.Body>
                                            {item.Categoris.map((category, index) => (
                                                <Accordion key={index}>
                                                    <Accordion.Item eventKey={i}>
                                                        <Accordion.Header style={{ border: '1px solid #CCD3CA' }}>{category.nameCategories}</Accordion.Header>
                                                        <Accordion.Body>
                                                            <table className="table table-bordered text-center">
                                                                <thead>
                                                                    <tr>
                                                                        <th scope="col">STT</th>
                                                                        <th scope="col" style={{ maxWidth: "100px" }}>Tên thao tác</th>
                                                                        <th scope="col">Giá thao tác</th>
                                                                        <th scope="col">Action</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>

                                                                    {(category.Operations)?.map((operation, keyindex) => (
                                                                        <tr key={keyindex}>
                                                                            <td>{keyindex + 1}</td>
                                                                            <td style={{ maxWidth: "100px" }}>{operation.nameOperation}</td>
                                                                            <td>{VND.format(operation.price)}</td>
                                                                            <td>
                                                                                <FontAwesomeIcon onClick={() => showModal(operation)} icon={faPenToSquare} style={{ color: "#5680c8", marginRight: "10px" }} size="lg" />
                                                                                <FontAwesomeIcon onClick={() => handleShowDelete(operation)} icon={faTrash} size="lg" style={{ color: "#d72828", }} />
                                                                            </td>
                                                                        </tr>
                                                                    ))}

                                                                </tbody>
                                                            </table>
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                </Accordion>
                                            ))}

                                            {/* <table className="table table-secondary">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">STT</th>
                                                        <th scope="col" style={{ maxWidth: "100px" }}>Tên thao tác</th>
                                                        <th scope="col">Giá thao tác</th>
                                                        <th scope="col">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {(item.operations)?.map((operation, index) => (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td style={{ maxWidth: "100px" }}>{operation.nameOperation}</td>
                                                            <td>{operation.price}</td>
                                                            <td>
                                                                <FontAwesomeIcon onClick={() => showModal(operation)} icon={faPenToSquare} style={{ color: "#5680c8", marginRight: "10px" }} size="lg" />
                                                                <FontAwesomeIcon onClick={() => handleShowDelete(operation)} icon={faTrash} size="lg" style={{ color: "#d72828", }} />
                                                            </td>
                                                        </tr>
                                                    ))}

                                                </tbody>
                                            </table> */}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </div>
                        ))}
                        {/* {data?.map((item, i) => (
                            <div key={i}>
                                <Accordion>
                                    <Accordion.Item eventKey={i}>
                                        <Accordion.Header style={{ border: '1px solid #CCD3CA', padding: 0 }}>{item.service.nameService}</Accordion.Header>
                                        <Accordion.Body>
                                            <table className="table table-secondary">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">STT</th>
                                                        <th scope="col" style={{ maxWidth: "100px" }}>Tên thao tác</th>
                                                        <th scope="col">Giá thao tác</th>
                                                        <th scope="col">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {(item.operations)?.map((operation, index) => (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td style={{ maxWidth: "100px" }}>{operation.nameOperation}</td>
                                                            <td>{operation.price}</td>
                                                            <td>
                                                                <FontAwesomeIcon onClick={() => showModal(operation)} icon={faPenToSquare} style={{ color: "#5680c8", marginRight: "10px" }} size="lg" />
                                                                <FontAwesomeIcon onClick={() => handleShowDelete(operation)} icon={faTrash} size="lg" style={{ color: "#d72828", }} />
                                                            </td>
                                                        </tr>
                                                    ))}

                                                </tbody>
                                            </table>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>

                            </div>

                        ))} */}
                    </div>
                </div>
            </div>

            <Modal title="Chỉnh sửa thao tác" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText="Lưu" cancelText="Đóng">
                <div>

                    <div className="mb-3 mt-4">
                        <h5>Tên thao tác</h5>
                        <input
                            type="text"
                            className={`form-control mt-2 ${cx("inputForm")} ${errors?.nameOperation ? ' border-danger' : ''} `}
                            id="exampleFormControlInput1"
                            placeholder="Nhập tên thao tác"
                            value={nameOperation}
                            onChange={(e) => { setNameOperation(e.target.value) }}
                            autoComplete="off"
                        />
                        {errors?.nameOperation && <p className={cx("errors")}>{errors.nameOperation}</p>}
                    </div>

                    <div className="mb-3 mt-4">
                        <h5>Giá thao tác</h5>
                        <input
                            type="number"
                            className={`form-control mt-2 ${cx("inputForm")} ${errors?.priceOperation ? ' border-danger' : ''} `}
                            id="exampleFormControlInput1"
                            placeholder="Nhập giá thao tác"
                            value={priceOperation}
                            onChange={(e) => { setPriceOperation(e.target.value) }}
                            autoComplete="off"
                        />
                        {errors?.priceOperation && <p className={cx("errors")}>{errors.priceOperation}</p>}
                    </div>

                </div>
            </Modal>
            <Modal title="Xóa thao tác" open={showModalDelete}
                onOk={() => handleDelete(idDelete?.id)}
                onCancel={() => handleCacleDelete()}
                okButtonProps={{ style: { backgroundColor: 'red' } }} >
                <p>Bạn chắn chắn muốn xóa thao tác {idDelete?.nameOperation}</p>
            </Modal>
        </>
    );
}

export default ServiceOperation;