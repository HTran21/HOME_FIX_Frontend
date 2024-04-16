import className from "classnames/bind";
import styles from "./Products.module.scss";
import { Link } from "react-router-dom";
import { Drawer, Modal } from 'antd';

const cx = className.bind(styles);

import {
    FilterOutlined,
    SearchOutlined,
    MoreOutlined,
    EditOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import { Dropdown } from 'antd';
import axios from '../../../service/customize_axios';
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import NotFound from "../../../components/NotFound/NotFound";

function Products() {


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

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [record, setRecord] = useState();
    const [errors, setErrors] = useState();
    const showModal = (item) => {
        setIsModalOpen(true);
        setRecord(item);
    };
    const handleOk = (id) => {
        setIsModalOpen(false);
        console.log(id)
        axios.delete("http://localhost:3000/product", {
            params: {
                ID_Product: id
            }
        })
            .then(res => {
                if (res.data.success) {
                    toast.success(res.data.message)
                    fetchData();
                }
                else {
                    toast.error(res.data.message)
                }
            })
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };




    return (
        <>
            <div className={cx("containerPage")}>
                <div className="titleProduct">
                    <h4 className="d-inline-block">Danh sách sản phẩm</h4>
                </div>
                <div className={cx("contentPage")}>
                    <div className="row">
                        <div className="col-lg-2 col-sm-12">
                            <div className={cx("filter")}>
                                <p className={cx("titleFilter")}><FilterOutlined className="pe-2" />Bộ lọc</p>
                                <p className={cx("allProduct")} onClick={() => fetchData()}>Tất cả thiết bị</p>
                                <p style={{ fontWeight: "500" }}>Danh mục</p>
                                <ul className={cx("listCategori")}>
                                    {listCategori?.map((categori, i) => (
                                        <li key={i} onClick={() => filterProduct(categori.id, idBrand)} className={`ps-1 ${(idCategori === categori.id) ? 'text-info' : ''}`}>{categori.nameCategories} </li>
                                    ))}
                                </ul>

                                <p style={{ fontWeight: "500" }}>Hãng</p>
                                <ul className={cx("listCategori")}>
                                    {listBrand?.map((brand, i) => (
                                        <li key={i} onClick={() => filterProduct(idCategori, brand.id)} className={`ps-1 ${(idBrand === brand.id) ? 'text-info' : ''}`}>{brand.nameBrand}</li>
                                    ))}

                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-10 col-sm-12">
                            <div className={cx("listProducts")}>
                                <div className={cx("headerListProducts")}>
                                    <Link to="/admin/addproduct" className="text-decoration-none"><button className={cx("btnAddProduct")}>Thêm sản phẩm</button></Link>
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
                                                    <Dropdown className={cx("iconMore")}
                                                        menu={{
                                                            items: [
                                                                {
                                                                    label: <Link to={`/admin/editproduct/${product?.id}`}><p className="text-decoration-none"><EditOutlined className="pe-2" />Sửa</p></Link>,
                                                                    key: '0',
                                                                },
                                                                {
                                                                    label: <p onClick={() => showModal(product)}><DeleteOutlined className="pe-2" />Xóa</p>,
                                                                    key: '1',
                                                                }
                                                            ]
                                                        }}
                                                        trigger={['click']}
                                                        placement="bottomRight"
                                                    >
                                                        <a onClick={(e) => e.preventDefault()} >
                                                            <MoreOutlined />

                                                        </a>
                                                    </Dropdown>
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

                </div>
            </div>
            <Drawer title={product?.nameProduct} onClose={onClose} open={open}>
                <img src={`http://localhost:3000/${product?.imageProduct}`} className={cx("imgDrawer")} alt="" />
                <div className="inforProduct mt-3">
                    <h5>Thông tin thiết bị</h5>
                    <p className="mt-2" dangerouslySetInnerHTML={{ __html: product?.contentHTML }}></p>
                </div>
            </Drawer>

            <Modal title="Xóa thiết bị" open={isModalOpen} onOk={() => handleOk(record?.id)} onCancel={handleCancel} okButtonProps={{ style: { backgroundColor: "red" } }}>
                <div className="mb-3 mt-4">
                    <p>Bạn chắc chắn muốn xóa thiết bị {record?.nameProduct}</p>
                </div>
            </Modal >

        </>
    );
}

export default Products;