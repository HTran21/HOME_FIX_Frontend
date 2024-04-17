import styles from "./Product.module.scss";
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faEnvelope, faMoneyBill1, faStar, faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faCalendarDay, faFilter, faLocationDot, faPhone, faUsers } from "@fortawesome/free-solid-svg-icons";
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import axios from '../../../service/customize_axios';
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import NotFound from "../../../components/NotFound/NotFound";

import {
    FilterOutlined,
    SearchOutlined,
    MoreOutlined,
    EditOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import { Drawer } from "antd";

const cx = classNames.bind(styles);

function Product() {

    const [data, setData] = useState();
    const [listCategori, setListCategories] = useState();
    const [listBrand, setListBrand] = useState();
    const [idBrand, setIdBrand] = useState('');
    const [idCategori, setIdCategori] = useState('');
    const [search, setSearch] = useState('')

    const fetchData = () => {
        axios.get("http://localhost:3000/product")
            .then(res => {
                setData(res.data);
                setIdBrand("")
                setIdCategori("")
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const fetchCategori = () => {
        axios.get("http://localhost:3000/product/categories")
            .then(res => {
                setListCategories(res.data);
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const fetchBrand = () => {
        axios.get("http://localhost:3000/product/brand")
            .then(res => {
                setListBrand(res.data);
            })
            .catch((error) => {
                console.log(error)
            })
    }


    const filterProduct = (categori, brand) => {
        setIdBrand(brand)
        setIdCategori(categori)
        axios.get(`http://localhost:3000/product?categori=${categori || ''}&brand=${brand || ''}`)
            .then(res => {
                setData(res.data.rows);
            })
            .catch((error) => {
                console.log(error)
            })

    }

    const handleSearch = async (searchTerm) => {
        try {
            if (searchTerm.trim() === '') {
                toast.warning("Vui lòng nhập dữ liệu")
            }
            else {
                const res = await axios.get(`http://localhost:3000/product?search=${searchTerm}`)
                setData(res.data);
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch(e.target.value)
            // console.log("Check")
        }
    }

    useEffect(() => {
        fetchData();
        fetchCategori();
        fetchBrand();
    }, [])

    const [open, setOpen] = useState(false);
    const [product, setProducct] = useState();
    const showDrawer = (product) => {
        setOpen(true);
        setProducct(product)
    };
    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            <div className="container">
                <div className="row pt-3">
                    <div className="col-lg-3 col-md-4 col-sm-12">
                        <div className={cx("filter")}>
                            <p className={cx("titleFilter")}><FilterOutlined className="pe-2" />Bộ lọc</p>
                            <p className={cx("allProduct")} onClick={() => fetchData()}>Tất cả thiết bị</p>
                            <p style={{ fontWeight: "bold" }}>Danh mục</p>
                            <ul className={cx("listCategori")}>
                                {listCategori?.map((categori, i) => (
                                    <li key={i} onClick={() => filterProduct(categori.id, idBrand)} className={`ps-1 ${(idCategori === categori.id) ? 'text-info' : ''}`}>{categori.nameCategories} </li>
                                ))}
                            </ul>

                            <p style={{ fontWeight: "bold" }}>Hãng</p>
                            <ul className={cx("listCategori")}>
                                {listBrand?.map((brand, i) => (
                                    <li key={i} onClick={() => filterProduct(idCategori, brand.id)} className={`ps-1 ${(idBrand === brand.id) ? 'text-info' : ''}`}>{brand.nameBrand}</li>
                                ))}

                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-9 col-md-8 col-sm-12">
                        <div className="titleContent d-flex">
                            <h4 className={cx("titleContentText")}>Danh sách sản phẩm sửa chữa</h4>
                            <div className={cx("searchGroup")}>
                                <div className={cx("searchBorder")}>
                                    <input type="text" onKeyDown={handleDown} className={cx("inputSearch")} name="" id="search" placeholder="Tìm kiếm..." autoComplete="off" />
                                    <label htmlFor="search" className={cx("iconSearch")}><SearchOutlined /></label>
                                </div>

                            </div>
                        </div>
                        <div className={cx("contentListProduct")}>

                            <div className="row">
                                {data?.length > 0 ? (data?.map((product, i) => (
                                    <div className="col-lg-4 col-md-6 col-sm-12" key={i}>
                                        <div className={cx("cardProduct")}>

                                            <div className={cx("layoutImage")}>
                                                <img src={`http://localhost:3000/${product.imageProduct}`} className={cx("imgProduct")} alt="" />
                                            </div>
                                            <p className={cx("titleProduct")} onClick={() => showDrawer(product)}>
                                                {product.nameProduct}
                                            </p>
                                        </div>
                                    </div>

                                ))) : (
                                    <div className="mt-5">
                                        <NotFound />
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Drawer title={product?.nameProduct} onClose={onClose} open={open} width={400}>
                <img src={`http://localhost:3000/${product?.imageProduct}`} className={cx("imgDrawer")} alt="" />
                <div className="inforProduct mt-3">
                    <h5>Thông tin thiết bị</h5>
                    <p className="mt-2" dangerouslySetInnerHTML={{ __html: product?.contentHTML }}></p>
                </div>
            </Drawer>
        </>
    );
}

export default Product;