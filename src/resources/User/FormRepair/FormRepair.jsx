import styles from "./FormRepair.module.scss";
import classNames from 'classnames/bind';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from '../../../service/customize_axios';
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

function FormRepair() {
    const [listCategories, setListCategories] = useState();
    const [listBrands, setListBrands] = useState();
    const [listProduct, setListProduct] = useState();
    const [listService, setListService] = useState();
    const [idCategori, setidCategori] = useState();
    const [idBrand, setidBrand] = useState();
    const [errors, setErrors] = useState({});

    const [idService, setIdService] = useState();
    const [idProduct, setIdProduct] = useState();
    const [fullName, setFullName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [dateRepair, setDateRepair] = useState();
    const [time, setTime] = useState();

    const fetchService = () => {
        axios.get("http://localhost:3000/service/getService")
            .then(res => {
                // console.log("list service", res.data.listService)
                setListService(res.data.listService)
            })
    }

    // const fetchCategories = () => {
    //     axios.get("http://localhost:3000/product/categories/" + idService)
    //         .then(res => {
    //             setListCategories(res.data)
    //             console.log("Categories", res.data)
    //         })
    //         .catch((error) => console.log(error));
    // }
    const fetchBrands = () => {
        axios.get("http://localhost:3000/product/brand")
            .then(res => {
                setListBrands(res.data)

            })
            .catch(err => console.log(err));

    }

    const filterProduct = (categori, brand) => {

        setidBrand(brand)
        setidCategori(categori)

        axios.get(`http://localhost:3000/product?categori=${categori || ''}&brand=${brand || ''}`)
            .then(res => {
                setListProduct(res.data.rows)
            })
            .catch((error) => {
                console.log(error)
            })

    }

    useEffect(() => {
        if (idService) {
            axios.get("http://localhost:3000/product/categories/" + idService)
                .then(res => {
                    setListCategories(res.data)
                    console.log("Categories", res.data)
                })
                .catch((error) => console.log(error));
        }

    }, [idService])

    useEffect(() => {
        // fetchCategories();
        fetchBrands();
        fetchService();


    }, [])
    return (
        <>
            <section className="vh-100 gradient-custom">
                <div className="container h-100">
                    <div className="row justify-content-center align-items-center h-100">
                        <div className="col-12 col-lg-9 col-xl-7">
                            <div
                                className="card shadow-2-strong card-registration"
                                style={{ borderRadius: 15 }}
                            >
                                <div className="card-body p-3 p-md-4">
                                    <div className={cx("titleForm")}>
                                        <h3 className={cx("titleRepair")}>ĐĂNG KÝ SỬA CHỮA</h3>
                                        <span className="h1 ms-auto "><img className={cx("imgLogo")} src="../image/logo/logo8.png" alt="" />
                                            <p className={cx("textLogo")}>HOME FIX</p></span>
                                    </div>
                                    <form>
                                        <div className="row">
                                            <h6 className="mb-2">Thông tin khác hàng</h6>
                                            <div className="col-md-6 mb-4">
                                                <div className="form-floating mb-3">
                                                    <input type="text" className={`form-control ${cx("inputForm")}`} placeholder="name@example.com" />
                                                    <label htmlFor="floatingInput">Họ và tên</label>
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <div className="form-floating mb-3">
                                                    <input type="text" className={`form-control ${cx("inputForm")}`} placeholder="name@example.com" />
                                                    <label htmlFor="floatingInput">Địa chỉ</label>
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <div className="form-floating mb-3">
                                                    <input type="text" className={`form-control ${cx("inputForm")}`} placeholder="name@example.com" />
                                                    <label htmlFor="floatingInput">Số điện thoại</label>
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <div className="form-floating mb-3">
                                                    <input type="text" className={`form-control ${cx("inputForm")}`} placeholder="name@example.com" />
                                                    <label htmlFor="floatingInput">Email</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <h6 className="mb-2">Dịch vụ mong muốn</h6>
                                            <div className="col-md-6 mb-4">
                                                <div className="form-floating mb-3">

                                                    <select className={`form-control mt-2 ${cx("inputForm")} ${errors.idBrand ? ' border-danger' : ''} `} aria-label="Default select example"
                                                        value={idService} onChange={(e) => setIdService(e.target.value)}
                                                    >
                                                        <option value="0">Chọn dịch vụ</option>
                                                        {
                                                            listService?.map((service, i) =>
                                                                <option key={i} value={service.id}>{service.nameService}</option>
                                                            )
                                                        }
                                                    </select>
                                                    <label htmlFor="floatingInput">Dịch vụ</label>
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <h2>{idService}</h2>
                                            </div>

                                        </div>

                                        <div className="row">
                                            <h6 className="mb-2">Thông tin thiết bị</h6>

                                            {idService === "1" ? (
                                                <div className="row">
                                                    <div className="col-md-6 mb-4">
                                                        <div className="form-floating mb-3">

                                                            <select className={`form-control mt-2 ${cx("inputForm")} ${errors.idCategori ? ' border-danger' : ''} `} aria-label="Default select example"
                                                                value={idCategori} onChange={(e) => filterProduct(e.target.value, idBrand)}
                                                            >
                                                                <option value="0">Chọn loại thiết bị</option>
                                                                {
                                                                    listCategories?.map((catagory, i) =>
                                                                        <option key={i} value={catagory.id}>{catagory.nameCategories}</option>
                                                                    )
                                                                }
                                                            </select>
                                                            <label htmlFor="floatingInput">Loại thiết bị</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 mb-4">
                                                        <div className="form-floating">
                                                            <textarea className={`form-control mt-2 ${cx("inputForm")}`} placeholder="Leave a comment here" id="floatingTextarea2"></textarea>
                                                            <label htmlFor="floatingTextarea2">Mô tả lỗi</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : idService === "2" ? (
                                                <div className="row">
                                                    <div className="col-md-6 mb-4">
                                                        <div className="form-floating mb-3">

                                                            <select className={`form-control mt-2 ${cx("inputForm")} ${errors.idCategori ? ' border-danger' : ''} `} aria-label="Default select example"
                                                                value={idCategori} onChange={(e) => filterProduct(e.target.value, idBrand)}
                                                            >
                                                                <option value="0">Chọn loại thiết bị</option>
                                                                {
                                                                    listCategories?.map((catagory, i) =>
                                                                        <option key={i} value={catagory.id}>{catagory.nameCategories}</option>
                                                                    )
                                                                }
                                                            </select>
                                                            <label htmlFor="floatingInput">Loại thiết bị</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 mb-4">
                                                        <div className="form-floating">
                                                            <textarea className={`form-control mt-2 ${cx("inputForm")}`} placeholder="Leave a comment here" id="floatingTextarea2"></textarea>
                                                            <label htmlFor="floatingTextarea2">Mô tả lỗi</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : idService === "4" ? (
                                                <div className="row">
                                                    <div className="col-md-6 mb-4">
                                                        <div className="form-floating mb-3">

                                                            <select className={`form-control mt-2 ${cx("inputForm")} ${errors.idBrand ? ' border-danger' : ''} `} aria-label="Default select example"
                                                                value={idBrand} onChange={(e) => filterProduct(idCategori, e.target.value)}
                                                            >
                                                                <option value="0">Chọn nhãn hàng</option>
                                                                {
                                                                    listBrands?.map((brand, i) =>
                                                                        <option key={i} value={brand.id}>{brand.nameBrand}</option>
                                                                    )
                                                                }
                                                            </select>
                                                            <label htmlFor="floatingInput">Thương hiệu</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 mb-4">
                                                        <div className="form-floating mb-3">

                                                            <select className={`form-control mt-2 ${cx("inputForm")} ${errors.idCategori ? ' border-danger' : ''} `} aria-label="Default select example"
                                                                style={{ color: "#000" }} value={idCategori} onChange={(e) => filterProduct(e.target.value, idBrand)}
                                                            >
                                                                <option value="0">Chọn loại thiết bị</option>
                                                                {
                                                                    listCategories?.map((categori, i) =>
                                                                        <option key={i} value={categori.id}>{categori.nameCategories}</option>
                                                                    )
                                                                }
                                                            </select>
                                                            <label htmlFor="floatingInput">Loại thiết bị</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 mb-4">
                                                        <div className="form-floating mb-3">

                                                            <select className={`form-control ${cx("inputForm")} ${errors.idCategori ? ' border-danger' : ''} `} aria-label="Default select example"
                                                                value={idProduct} onChange={(e) => setIdProduct(e.target.value)}
                                                            >
                                                                <option value="0">Chọn thiết bị</option>
                                                                {
                                                                    listProduct?.map((product, i) =>
                                                                        <option key={i} value={product.id}>{product.nameProduct}</option>
                                                                    )
                                                                }
                                                            </select>
                                                            <label htmlFor="floatingInput">Thiết bị</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 mb-4">
                                                        <div className="form-floating">
                                                            <textarea className={`form-control ${cx("inputForm")}`} placeholder="Leave a comment here" id="floatingTextarea2"></textarea>
                                                            <label htmlFor="floatingTextarea2">Mô tả lỗi</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className={cx("pleaseChoose")}>
                                                    <img className={cx("imgChoose")} src="../../public/icon/answer.png" alt="" />
                                                    <h6>Vui lòng chọn dịch vụ</h6>
                                                </div>
                                            )}

                                        </div>
                                        <div className="row">
                                            <h6 className="mb-1">Thời gian sửa chữa</h6>
                                            <div className="col-md-6 mb-4 pb-2">
                                                <div className="form-outline">
                                                    <label className="form-label" htmlFor="dayRepair">
                                                        Ngày sửa chữa
                                                    </label>
                                                    <input
                                                        type="date"
                                                        id="dayRepair"
                                                        className={`form-control p-3s ${cx("inputForm")}`}
                                                    />

                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-4 pb-2">
                                                <div className="form-outline">
                                                    <p className="mb-2 pb-1">Thời gian sửa chữa </p>
                                                    <div className="form-check form-check-inline">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="inlineRadioOptions"
                                                            id="femaleGender"
                                                            defaultValue="option1"
                                                            defaultChecked=""
                                                        />
                                                        <label className="form-check-label" htmlFor="femaleGender">
                                                            Sáng
                                                        </label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="inlineRadioOptions"
                                                            id="femaleGender"
                                                            defaultValue="option1"
                                                            defaultChecked=""
                                                        />
                                                        <label className="form-check-label" htmlFor="femaleGender">
                                                            Trưa
                                                        </label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="inlineRadioOptions"
                                                            id="femaleGender"
                                                            defaultValue="option1"
                                                            defaultChecked=""
                                                        />
                                                        <label className="form-check-label" htmlFor="femaleGender">
                                                            Chiều
                                                        </label>
                                                    </div>


                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-inline">
                                            <button
                                                className={`d-inline ${cx("btnRepair")}`}
                                            >ĐĂNG KÝ</button>
                                            <button className={`d-inline ${cx("btnCancel")}`}>
                                                <Link className="text-decoration-none text-light" to="http://localhost:5173/">HỦY</Link>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}

export default FormRepair;