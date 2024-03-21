import className from "classnames/bind";
import styles from "./CreatServiceOperation.module.scss";
import axios from '../../../service/customize_axios';
import { toast } from "react-toastify";


const cx = className.bind(styles);
import { useEffect, useState } from "react";

function CreatServiceOperation() {

    const [listService, setListService] = useState();
    const [listCategories, setListCategories] = useState();
    const [nameOperation, setNameOperation] = useState("");
    const [priceOperation, setPriceOperation] = useState();
    const [idService, setIdService] = useState();
    const [idCategori, setidCategori] = useState();
    const [errors, setErrors] = useState({});

    const fetchData = () => {
        axios.get("http://localhost:3000/service/getService")
            .then(res => {
                setListService(res.data.listService)
            })
    }

    const fetchCategories = () => {
        axios.get("http://localhost:3000/product/categories")
            .then(res => {
                setListCategories(res.data)
            })
            .catch((error) => console.log(error));
    }
    useEffect(() => {
        fetchData();
        fetchCategories();
    }, [])

    const upload = () => {
        // console.log("Ten thao tac", nameOperation)
        // console.log("Gia thao tac", priceOperation)
        // console.log("Loai dich vu", idService)
        // console.log("Loai thiet bi", idCategori);


        const newErrors = {};

        if (nameOperation.trim() === "") {
            newErrors.nameOperation = "Chưa nhập tên thao tác"
        }

        if (!priceOperation || priceOperation < 0) {
            newErrors.priceOperation = "Nhập sai định dạng"
        }


        if (idService <= 0 || !idService) {
            newErrors.idService = "Chưa chọn dịch vụ"
        }

        if (idCategori <= 0 || !idCategori) {
            newErrors.idCategori = "Chưa chọn thiết bị"
        }

        if (Object.keys(newErrors).length === 0) {
            setErrors({});
            // axios.post("http://localhost:3000/service/createOperation", { nameOperation, priceOperation, idService, idCategori })
            //     .then(res => {
            //         if (res.data.success === false) {
            //             toast.error(res.data.message)
            //         }
            //         else {
            //             toast.success(res.data.message)
            //             setNameOperation("")
            //             setPriceOperation("")
            //             setIdService("")
            //             setidCategori("")
            //         }
            //     })
            //     .catch(err => console.log(err));
            console.log("GIa", priceOperation)


        }
        else {
            setErrors(newErrors)
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



                    <div className={cx("titleService")}>
                        <div className="mb-3 mt-4">
                            <h5>Chọn loại dịch vụ</h5>
                            <select className={`form-control mt-2 ${cx("inputForm")} ${errors.idService ? ' border-danger' : ''} `} aria-label="Default select example"
                                value={idService} onChange={(e) => setIdService(e.target.value)}
                            >
                                <option value="0">Chọn dịch vụ</option>
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
                            <select className={`form-control mt-2 ${cx("inputForm")} ${errors.idCategori ? ' border-danger' : ''} `} aria-label="Default select example"
                                value={idCategori} onChange={(e) => setidCategori(e.target.value)}
                            >
                                <option value="0">Chọn thiết bị</option>
                                {
                                    listCategories?.map((catagory, i) =>
                                        <option key={i} value={catagory.id}>{catagory.nameCategories}</option>
                                    )
                                }
                            </select>
                            {errors.idCategori && <p className={cx("errors")}>{errors.idCategori}</p>}

                        </div>

                        <div className="mb-3 mt-4">
                            <h5>Tên thao tác</h5>
                            <input
                                type="text"
                                className={`form-control mt-2 ${cx("inputForm")} ${errors.nameOperation ? ' border-danger' : ''} `}
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