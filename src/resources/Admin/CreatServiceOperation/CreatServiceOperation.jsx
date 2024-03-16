import className from "classnames/bind";
import styles from "./CreatServiceOperation.module.scss";
import axios from '../../../service/customize_axios';
import { toast } from "react-toastify";


const cx = className.bind(styles);

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Table } from 'antd';
import { useEffect, useState } from "react";

function CreatServiceOperation() {

    const [listService, setListService] = useState();
    const [nameOperation, setNameOperation] = useState("");
    const [priceOperation, setPriceOperation] = useState();
    const [idService, setIdService] = useState();
    const [errors, setErrors] = useState({});

    const fetchData = () => {
        axios.get("http://localhost:3000/service/getService")
            .then(res => {
                setListService(res.data.listService)
            })
    }
    useEffect(() => {
        fetchData();
    }, [])

    const upload = () => {
        // console.log("Ten thao tac", nameOperation)
        // console.log("Gia thao tac", priceOperation)
        // console.log("Loai dich vu", idService)


        const newErrors = {};

        if (nameOperation.trim() === "") {
            newErrors.nameOperation = "Chưa nhập tên thao tác"
        }

        if (!priceOperation || priceOperation < 0) {
            newErrors.priceOperation = "Nhập sai định dạng"
        }


        if (!idService) {
            newErrors.idService = "Chưa chọn dịch vụ"
        }

        if (Object.keys(newErrors).length === 0) {
            setErrors({});
            axios.post("http://localhost:3000/service/createOperation", { nameOperation, priceOperation, idService })
                .then(res => {
                    if (res.data.success === false) {
                        toast.error(res.data.message)
                    }
                    else {
                        toast.success(res.data.message)
                        setNameOperation("")
                        setPriceOperation("");
                        setIdService("")


                    }
                })
                .catch(err => console.log(err));


        }
        else {
            setErrors(newErrors)
            console.log(errors)
        }

    }



    return (
        <>
            <div className={cx("containerPage")}>
                <div className="titleProduct">
                    <h4 className="d-inline-block">Tạo thao tác cho dịch vụ</h4>
                </div>
                <div className={cx("contentPage")}>
                    <div className={cx("titleContentService")}>
                        <img src="../public/icon/creatoperation.png" alt="" className={cx("iconTitleContentService")} />
                        <div className={cx("contentTitleContentService")}>
                            <h5>Tạo thao tác</h5>
                            <p>Điền đầy đủ thông tin bên dưới.</p>
                        </div>
                    </div>

                    <div className="mb-3 mt-4">
                        <h5>Chọn loại dịch vụ</h5>
                        <select className={`form-control mt-2 ${cx("inputForm")} ${errors.idService ? ' border-danger' : ''} `} aria-label="Default select example"
                            value={idService} onChange={(e) => setIdService(e.target.value)}
                        >
                            <option defaultValue="">Chọn dịch vụ</option>
                            {
                                listService?.map((service, i) =>
                                    <option key={i} value={service.id}>{service.nameService}</option>
                                )
                            }
                        </select>
                        {errors.idService && <p className={cx("errors")}>{errors.idService}</p>}

                    </div>

                    <div className="mb-3 mt-4">
                        <h5>Chọn thiết bị</h5>
                        <select className={`form-control mt-2 ${cx("inputForm")} ${errors.idService ? ' border-danger' : ''} `} aria-label="Default select example"
                            value={idService} onChange={(e) => setIdService(e.target.value)}
                        >
                            <option defaultValue="">Chọn thiết bị</option>
                            {
                                listService?.map((service, i) =>
                                    <option key={i} value={service.id}>{service.nameService}</option>
                                )
                            }
                        </select>
                        {errors.idService && <p className={cx("errors")}>{errors.idService}</p>}

                    </div>


                    <div className={cx("titleService")}>
                        <div className="mb-3 mt-4">
                            <h5>Tên thao tác</h5>
                            <input
                                type="text"
                                className={`form-control mt-2 ${cx("inputForm")} ${errors.priceOperation ? ' border-danger' : ''} `}
                                id="exampleFormControlInput1"
                                placeholder="Nhập tên thao tác"
                                value={nameOperation}
                                onChange={(e) => { setNameOperation(e.target.value) }}
                                autoComplete="off"
                            />
                            {errors.nameOperation && <p className={cx("errors")}>{errors.nameOperation}</p>}
                        </div>

                        <div className="mb-3 mt-4">
                            <h5>Giá thao tác</h5>
                            <input
                                type="number"
                                className={`form-control mt-2 ${cx("inputForm")} ${errors.priceOperation ? ' border-danger' : ''} `}
                                id="exampleFormControlInput1"
                                placeholder="Nhập giá thao tác"
                                value={priceOperation}
                                onChange={(e) => { setPriceOperation(e.target.value) }}
                                autoComplete="off"
                            />
                            {errors.priceOperation && <p className={cx("errors")}>{errors.priceOperation}</p>}
                        </div>


                        <button className={cx("btnCreat")} onClick={upload}>Tạo thao tác</button>

                    </div>
                </div>
            </div>
        </>
    );
}

export default CreatServiceOperation;