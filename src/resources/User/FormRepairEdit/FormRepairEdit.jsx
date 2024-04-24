import styles from "./FormRepairEdit.module.scss";
import classNames from 'classnames/bind';
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from '../../../service/customize_axios';
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import moment from 'moment';
import { DatePicker } from "antd";
const cx = classNames.bind(styles);
import dayjs from "dayjs";

function FormRepairEdit() {
    // const history = useHistory();
    const navigate = useNavigate();
    const idUser = useSelector((state) => state.user.user.id);
    const { id } = useParams();
    const ID_Service = new URLSearchParams(window.location.search).get('ID_Service');
    const [listCategories, setListCategories] = useState();
    const [listBrands, setListBrands] = useState();
    const [listProduct, setListProduct] = useState();
    const [listService, setListService] = useState();
    const [idCategori, setidCategori] = useState();
    const [idBrand, setidBrand] = useState();
    const [errors, setErrors] = useState();

    const [idService, setIdService] = useState(ID_Service);
    const [idProduct, setIdProduct] = useState();
    const [fullName, setFullName] = useState();
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [desRepair, setDesRepair] = useState('');
    const [dateRepair, setDateRepair] = useState('');
    const [data, setData] = useState();

    const [dateRepairArray, setDateRepairArray] = useState([]);

    const getDetailOrder = async () => {
        if (id) {
            const detailOrder = await axios.get("http://localhost:3000/order/detail/" + id);
            if (detailOrder.data.data.data) {
                setFullName(detailOrder.data.data.data.fullName)
                setAddress(detailOrder.data.data.data.address)
                setPhone(detailOrder.data.data.data.phone)
                setEmail(detailOrder.data.data.data.email)
                setidCategori(detailOrder.data.data.data.ID_Categori)
                setDesRepair(detailOrder.data.data.data.desProblem)
                const dateArray = detailOrder.data.data.data.desireDate.split(',');
                setDateRepairArray(dateArray.map(date => dayjs(date)))
                if (detailOrder.data.data.data.ID_Product != undefined) {
                    setIdProduct(detailOrder.data.data.data.ID_Product)

                }
                if (detailOrder.data.data.data.Product && detailOrder.data.data.data.Product.ID_Brand != undefined) {
                    setidBrand(detailOrder.data.data.data.Product.ID_Brand)

                }

            } else {
                toast.error(detailOrder.data.data.message)
            }
            // setData(detailOrder.data.data.detailOrder);


        }


    }



    const fetchService = () => {
        axios.get("http://localhost:3000/service/getService")
            .then(res => {
                // console.log("list service", res.data.listService)
                setListService(res.data.listService)
            })
    }
    const fetchBrands = () => {
        axios.get("http://localhost:3000/product/brand")
            .then(res => {
                setListBrands(res.data)

            })
            .catch(err => console.log(err));

    }

    useEffect(() => {
        filterProduct(idCategori, idBrand);
    }, [idCategori, idBrand]);

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
        getDetailOrder();
        fetchBrands();
        fetchService();

    }, [])
    const handleServiceChange = (e) => {
        const newService = e.target.value;
        setIdService(newService);
        if (newService !== ID_Service) {
            setDesRepair("");
            setidCategori("");
            setIdProduct("");
            setidBrand("");
        }
    };

    const onChange = (date, dateString) => {
        console.log(date, dateString);
        setDateRepairArray(date)
    };

    const uploadRepair = () => {
        const newErrors = {};
        const futureDate = moment().add(1, 'days');
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
        // if (!dateRepair) {
        //     newErrors.dateRepair = 'Vui lòng chọn ngày sửa chữa'
        // } else if (moment(dateRepair).isBefore(futureDate, 'day')) {
        //     newErrors.dateRepair = "Vui lòng chọn ngày tương lai";
        // }
        if (dateRepairArray.length === 0) {
            newErrors.dateRepairArray = 'Vui lòng chọn ngày sửa chữa'
        }
        if (Object.keys(newErrors).length === 0) {
            setErrors();
            axios.put("http://localhost:3000/order/update/" + id, { idUser, fullName, address, phone, email, idCategori, idProduct, desRepair, dateRepairArray })
                .then(res => {
                    console.log(res.data)
                    if (res.data.data.success === false) {
                        toast.error(res.data.data.message)
                    }
                    else {
                        toast.success(res.data.data.message)


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
                                        <h3 className={cx("titleRepair")}>CẬP NHẬT SỬA CHỮA</h3>
                                        <span className="h1 ms-auto "><img className={cx("imgLogo")} src="../../image/logo/logo8.png" alt="" />
                                            <p className={cx("textLogo")}>HOME FIX</p></span>
                                    </div>
                                    <div className="row">
                                        <h6 className="mb-2">Thông tin khác hàng</h6>
                                        <div className="col-md-6 mb-3">
                                            <div className="form-floating">
                                                <input type="text" className={`form-control ${cx("inputForm")} ${errors && errors.fullName ? 'is-invalid' : ''}`} placeholder="name@example.com"
                                                    value={fullName || ''} onChange={(e) => setFullName(e.target.value)} />
                                                <label htmlFor="floatingInput">Họ và tên *</label>
                                                {errors && <p className={cx("errors")}>{errors.fullName}</p>}


                                            </div>
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <div className="form-floating">
                                                <input type="text" className={`form-control ${cx("inputForm")} ${errors && errors.address ? 'is-invalid' : ''}`} placeholder="name@example.com"
                                                    value={address || ''} onChange={(e) => setAddress(e.target.value)} />
                                                <label htmlFor="floatingInput">Địa chỉ *</label>
                                                {errors && <p className={cx("errors")}>{errors.address}</p>}
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <div className="form-floating">
                                                <input type="text" className={`form-control ${cx("inputForm")} ${errors && errors.phone ? 'is-invalid' : ''} `} placeholder="name@example.com"
                                                    value={phone || ''} onChange={(e) => setPhone(e.target.value)} />
                                                <label htmlFor="floatingInput">Số điện thoại *</label>
                                                {errors && <p className={cx("errors")}>{errors.phone}</p>}
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <div className="form-floating">
                                                <input type="text" className={`form-control ${cx("inputForm")} ${errors && errors.email ? 'is-invalid' : ''}`} placeholder="name@example.com"
                                                    value={email || ''} onChange={(e) => setEmail(e.target.value)} />
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

                                    <div className="">
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
                                                {/* <input
                                                    type="date"
                                                    id="dayRepair"
                                                    className={`form-control p-3s ${cx("inputForm")} ${errors && errors.dateRepair ? 'is-invalid' : ''}`}
                                                    value={dateRepair} onChange={(e) => setDateRepair(e.target.value)}
                                                />
                                                {errors && <p className={cx("errors")}>{errors.dateRepair}</p>} */}
                                                <DatePicker
                                                    multiple
                                                    onChange={onChange}
                                                    status={errors && errors.dateRepairArray ? 'error' : ''}
                                                    maxTagCount="responsive"
                                                    value={dateRepairArray}
                                                    size="large"
                                                    disabledDate={(current) => current.isBefore(moment().add(0, 'day'))}
                                                />
                                                {errors && <p className={cx("errors")}>{errors.dateRepairArray}</p>}
                                            </div>
                                        </div>

                                    </div>
                                    <div className="d-inline">
                                        <button
                                            className={`d-inline ${cx("btnRepair")}`}
                                            onClick={() => uploadRepair()}
                                        >

                                            CẬP NHẬT</button>
                                        {/* <button className={`d-inline ${cx("btnCancel")}`}>
                                            <Link className="text-decoration-none text-light" to="http://localhost:5173/">HỦY</Link>
                                        </button> */}
                                        <button className={`d-inline ${cx("btnCancel")}`}>
                                            <Link className="text-decoration-none text-light" to={"/user/order"}>QUAY VỀ</Link>
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

export default FormRepairEdit;