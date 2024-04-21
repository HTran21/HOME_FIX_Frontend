import styles from "./FormRepair.module.scss";
import classNames from 'classnames/bind';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from '../../../service/customize_axios';
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import moment from "moment";
import { DatePicker } from 'antd';

const cx = classNames.bind(styles);

function FormRepair() {

    const idUser = useSelector((state) => state.user.user.id);
    const user = useSelector((state) => state.user.user);

    const [listCategories, setListCategories] = useState();
    const [listBrands, setListBrands] = useState();
    const [listProduct, setListProduct] = useState();
    const [listService, setListService] = useState();
    const [idCategori, setidCategori] = useState();
    const [idBrand, setidBrand] = useState();
    const [errors, setErrors] = useState();

    const [idService, setIdService] = useState();
    const [idProduct, setIdProduct] = useState();
    const [fullName, setFullName] = useState(user.username);
    const [address, setAddress] = useState(user.address);
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState(user.phone);
    const [desRepair, setDesRepair] = useState('');
    const [dateRepair, setDateRepair] = useState('');

    const [dateRepairArray, setDateRepairArray] = useState([]);

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
                })
                .catch((error) => console.log(error));
        }

    }, [idService])

    useEffect(() => {
        // fetchCategories();
        fetchBrands();
        fetchService();


    }, [])

    const handleServiceChange = (e) => {
        const newService = e.target.value;
        setIdService(newService);

        if (newService !== "1") {
            setDesRepair("");
            setidCategori("");
            setIdProduct("");
        }
    };

    const onChange = (date, dateString) => {
        console.log(dateString);
        setDateRepairArray(date)
    };

    const uploadRepair = () => {
        const newErrors = {};

        if (fullName.trim() === '') {
            newErrors.fullName = 'Vui lòng nhập họ tên'
        }

        if (address.trim() === '') {
            newErrors.address = 'Vui lòng nhập địa chỉ sửa chữa'
        }
        if (phone.trim() === '') {
            newErrors.phone = 'Vui lòng nhập số điện thoại';
        } else if (phone.length < 10 || !/^(0\d{9,10})$/.test(phone)) {
            newErrors.phone = 'Số điện thoại không hợp lệ';
        }
        if (email.trim() === '') {
            newErrors.email = 'Vui lòng nhập email';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email không hợp lệ';
        }
        if (!idService) {
            newErrors.idService = 'Vui lòng chọn dịch vụ'
        }
        if (dateRepairArray.length === 0) {
            newErrors.dateRepairArray = 'Vui lòng chọn ngày sửa chữa'
        }
        if (Object.keys(newErrors).length === 0) {
            setErrors();
            console.log('Date', dateRepairArray)
            axios.post("http://localhost:3000/order", { idUser, fullName, address, phone, email, idCategori, idProduct, desRepair, dateRepairArray })
                .then(res => {
                    if (res.data.success === false) {
                        toast.error(res.data.message)
                    }
                    else {
                        toast.success(res.data.message)
                        setFullName('');
                        setAddress('');
                        setPhone('');
                        setEmail('');
                        setIdService('');
                        // setDateRepair('');
                        setDateRepairArray('');
                    }
                })
        }
        else {
            setErrors(newErrors);
        }


    }
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
                                    <div className="row">
                                        <h6 className="mb-2">Thông tin khác hàng</h6>
                                        <div className="col-md-6 mb-3">
                                            <div className="form-floating">
                                                <input type="text" className={`form-control ${cx("inputForm")} ${errors && errors.fullName ? 'is-invalid' : ''}`} placeholder="name@example.com"
                                                    value={fullName} onChange={(e) => setFullName(e.target.value)} />
                                                <label htmlFor="floatingInput">Họ và tên *</label>
                                                {errors && <p className={cx("errors")}>{errors.fullName}</p>}


                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <div className="form-floating">
                                                <input type="text" className={`form-control ${cx("inputForm")} ${errors && errors.address ? 'is-invalid' : ''}`} placeholder="name@example.com"
                                                    value={address} onChange={(e) => setAddress(e.target.value)} />
                                                <label htmlFor="floatingInput">Địa chỉ *</label>
                                                {errors && <p className={cx("errors")}>{errors.address}</p>}
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <div className="form-floating">
                                                <input type="text" className={`form-control ${cx("inputForm")} ${errors && errors.phone ? 'is-invalid' : ''} `} placeholder="name@example.com"
                                                    value={phone} onChange={(e) => setPhone(e.target.value)} />
                                                <label htmlFor="floatingInput">Số điện thoại *</label>
                                                {errors && <p className={cx("errors")}>{errors.phone}</p>}
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <div className="form-floating">
                                                <input type="text" className={`form-control ${cx("inputForm")} ${errors && errors.email ? 'is-invalid' : ''}`} placeholder="name@example.com"
                                                    value={email} onChange={(e) => setEmail(e.target.value)} />
                                                <label htmlFor="floatingInput">Email *</label>
                                                {errors && <p className={cx("errors")}>{errors.email}</p>}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <h6 className="mb-2">Dịch vụ mong muốn</h6>
                                        <div className="col-md-6 mb-3">
                                            <div className="form-floating">

                                                <select className={`form-control mt-2 ${cx("inputForm")} ${errors && errors.idService ? 'is-invalid' : ''}`} aria-label="Default select example"
                                                    value={idService} onChange={handleServiceChange}
                                                >
                                                    <option value="0">Chọn dịch vụ</option>
                                                    {
                                                        listService?.map((service, i) =>
                                                            <option key={i} value={service.id}>{service.nameService}</option>
                                                        )
                                                    }
                                                </select>
                                                <label htmlFor="floatingInput">Dịch vụ *</label>
                                                {errors && <p className={cx("errors")}>{errors.idService}</p>}
                                            </div>
                                        </div>

                                    </div>

                                    <div className="row">
                                        <h6 className="mb-2">Thông tin thiết bị</h6>

                                        {idService === "1" ? (
                                            <div className="row">
                                                <div className="col-md-6 mb-4">
                                                    <div className="form-floating mb-3">

                                                        <select className={`form-control mt-2 ${cx("inputForm")} `} aria-label="Default select example"
                                                            value={idCategori} onChange={(e) => filterProduct(e.target.value, idBrand)}
                                                        >
                                                            <option value="0">Chọn loại thiết bị</option>
                                                            {
                                                                listCategories?.map((catagory, i) =>
                                                                    <option key={i} value={catagory.id}>{catagory.nameCategories}</option>
                                                                )
                                                            }
                                                        </select>
                                                        <label htmlFor="floatingInput">Loại thiết bị *</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 mb-4">
                                                    <div className="form-floating">
                                                        <textarea className={`form-control mt-2 ${cx("inputForm")}`} placeholder="Leave a comment here" id="floatingTextarea2"
                                                            value={desRepair} onChange={(e) => setDesRepair(e.target.value)}></textarea>
                                                        <label htmlFor="floatingTextarea2" >Mô tả lỗi</label>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : idService === "2" ? (
                                            <div className="row">
                                                <div className="col-md-6 mb-4">
                                                    <div className="form-floating mb-3">

                                                        <select className={`form-control mt-2 ${cx("inputForm")} `} aria-label="Default select example"
                                                            value={idCategori} onChange={(e) => filterProduct(e.target.value, idBrand)}
                                                        >
                                                            <option value="0">Chọn loại thiết bị</option>
                                                            {
                                                                listCategories?.map((catagory, i) =>
                                                                    <option key={i} value={catagory.id}>{catagory.nameCategories}</option>
                                                                )
                                                            }
                                                        </select>
                                                        <label htmlFor="floatingInput">Loại thiết bị *</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 mb-4">
                                                    <div className="form-floating">
                                                        <textarea className={`form-control mt-2 ${cx("inputForm")}`} placeholder="Leave a comment here" id="floatingTextarea2"
                                                            value={desRepair} onChange={(e) => setDesRepair(e.target.value)}></textarea>
                                                        <label htmlFor="floatingTextarea2">Mô tả lỗi</label>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : idService === "4" ? (
                                            <div className="row">
                                                <div className="col-md-6 mb-4">
                                                    <div className="form-floating mb-3">

                                                        <select className={`form-control mt-2 ${cx("inputForm")}`} aria-label="Default select example"
                                                            value={idBrand} onChange={(e) => filterProduct(idCategori, e.target.value)}
                                                        >
                                                            <option value="0">Chọn nhãn hàng</option>
                                                            {
                                                                listBrands?.map((brand, i) =>
                                                                    <option key={i} value={brand.id}>{brand.nameBrand}</option>
                                                                )
                                                            }
                                                        </select>
                                                        <label htmlFor="floatingInput">Thương hiệu *</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 mb-4">
                                                    <div className="form-floating mb-3">

                                                        <select className={`form-control mt-2 ${cx("inputForm")} `} aria-label="Default select example"
                                                            style={{ color: "#000" }} value={idCategori} onChange={(e) => filterProduct(e.target.value, idBrand)}
                                                        >
                                                            <option value="0">Chọn loại thiết bị</option>
                                                            {
                                                                listCategories?.map((categori, i) =>
                                                                    <option key={i} value={categori.id}>{categori.nameCategories}</option>
                                                                )
                                                            }
                                                        </select>
                                                        <label htmlFor="floatingInput">Loại thiết bị *</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 mb-4">
                                                    <div className="form-floating mb-3">

                                                        <select className={`form-control ${cx("inputForm")}`} aria-label="Default select example"
                                                            value={idProduct} onChange={(e) => setIdProduct(e.target.value)}
                                                        >
                                                            <option value="0">Chọn thiết bị</option>
                                                            {
                                                                listProduct?.map((product, i) =>
                                                                    <option key={i} value={product.id}>{product.nameProduct}</option>
                                                                )
                                                            }
                                                        </select>
                                                        <label htmlFor="floatingInput">Thiết bị *</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 mb-4">
                                                    <div className="form-floating">
                                                        <textarea className={`form-control ${cx("inputForm")}`} placeholder="Leave a comment here" id="floatingTextarea2"
                                                            value={desRepair} onChange={(e) => setDesRepair(e.target.value)}></textarea>
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
                                        <div className="col">
                                            <div className="form-outline">
                                                <label className="form-label" htmlFor="dayRepair">
                                                    Ngày sửa chữa *
                                                </label>
                                                <DatePicker
                                                    multiple
                                                    onChange={onChange}
                                                    status={errors && errors.dateRepairArray ? 'error' : ''}
                                                    maxTagCount="responsive"
                                                    value={dateRepairArray}
                                                    onCha
                                                    size="large"
                                                    placeholder="Chọn ngày mong muốn"

                                                    disabledDate={(current) => current.isBefore(moment().add(1, 'day'))}
                                                />
                                                {errors && <p className={cx("errors")}>{errors.dateRepairArray}</p>}
                                            </div>
                                        </div>
                                        {/* <div className="col-md-6 mb-4 pb-2">
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
                                                            Chiều
                                                        </label>
                                                    </div>


                                                </div>
                                            </div> */}
                                    </div>
                                    <div className="d-inline">
                                        <button
                                            className={`d-inline ${cx("btnRepair")}`}
                                            onClick={() => uploadRepair()}
                                        >

                                            ĐĂNG KÝ</button>
                                        <button className={`d-inline ${cx("btnCancel")}`}>
                                            <Link className="text-decoration-none text-light" to="http://localhost:5173/">HỦY</Link>
                                        </button>
                                    </div>
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