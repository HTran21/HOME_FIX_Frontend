import className from "classnames/bind";
import styles from "./Brand.module.scss";
import { useEffect, useState } from "react";
import axios from '../../../service/customize_axios';
import { toast } from "react-toastify";

const cx = className.bind(styles);

import {
    SearchOutlined,
    DeleteOutlined,
    MoreOutlined,
} from '@ant-design/icons';
import { Dropdown, Modal } from 'antd';
import NotFound from '../../../components/NotFound/NotFound';

function Brand() {
    const [modalKey, setModalKey] = useState(0);
    const [data, setData] = useState();
    const [showimageBrand, setShowImageBrand] = useState("../public/icon/image-gallery.png")
    const [imageBrand, setImageBrand] = useState();
    const [nameBrand, setNameBrand] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errors, setErrors] = useState({});

    const fetchData = () => {
        axios.get("http://localhost:3000/product/brand")
            .then(res => {
                setData(res.data)

            })
            .catch(err => console.log(err));

    }

    useEffect(() => {
        fetchData();
    }, [])

    const showModal = () => {
        setIsModalOpen(true);
        setModalKey(prevKey => prevKey + 1);
        console.log(modalKey)
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        setShowImageBrand('../public/icon/image-gallery.png')
        setImageBrand()
        setNameBrand("")
        setErrors({});
    };

    const upload = () => {

        const newErrors = {};

        if (nameBrand.trim() === "") {
            newErrors.nameBrand = "Chưa nhập tên dịch vụ"
        }

        if (!imageBrand) {
            newErrors.imageBrand = "Chưa chọn ảnh"
        }

        if (Object.keys(newErrors).length === 0) {
            setErrors({});
            // console.log("Name", nameBrand);
            // console.log("Image", imageBrand);

            const formData = new FormData();
            formData.append('imageBrand', imageBrand)
            formData.append('nameBrand', nameBrand)
            axios.post("http://localhost:3000/product/brand", formData)
                .then(res => {
                    if (res.data.success === false) {
                        toast.error(res.data.message)
                    }
                    else {
                        toast.success(res.data.message)
                        handleCancel();
                        fetchData();
                    }
                })

        } else {
            setErrors(newErrors);
            console.log(errors)
        }

    }

    const handleSearch = async (searchTerm) => {
        try {
            if (searchTerm.trim() === '') {
                const res = await axios.get('http://localhost:3000/product/brand')

                console.log("data search", res.data);
                setData(res.data);

            }
            else {
                const res = await axios.get(`http://localhost:3000/product/brand?search=${searchTerm}`)
                setData(res.data);
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch(e.target.value)
        }
    };

    const [isModalDelete, setIsModalDelete] = useState(false);
    const [deleteItem, setDeleteItem] = useState();

    const handleShowDelete = (brand) => () => {
        setIsModalDelete(true);
        setDeleteItem(brand);
    }

    const handleDelete = (id) => {
        console.log("id", id)
        axios.delete('http://localhost:3000/product/brand/' + id)
            .then(res => {
                toast.success(res.data.message);
                setIsModalDelete(false);
                fetchData();
            })
            .catch((e) => console.log(e))
    }

    return (
        <>
            <div className={cx("containerPage")}>
                <div className="titleProduct">
                    <h4 className="d-inline-block">Danh sách Thương hiệu</h4>
                </div>
                <div className={cx("contentPage")}>

                    <div className={cx("listProducts")}>
                        <div className={cx("headerListProducts")}>
                            <button className={cx("btnAddProduct")} onClick={showModal}>Thêm thương hiệu</button>
                            <div className={cx("searchGroup")}>
                                <div className={cx("searchBorder")}>
                                    <input
                                        type="text"
                                        className={cx("inputSearch")}
                                        placeholder="Tìm kiếm..."
                                        autoComplete="off"
                                        onKeyDown={handleKeyDown}
                                    />
                                    <label htmlFor="search" className={cx("iconSearch")}><SearchOutlined /></label>
                                </div>

                            </div>
                        </div>
                        <div className={cx("contentListProduct")}>
                            <div className="row">
                                {data?.length > 0 ? (data?.map((brand, i) =>
                                    <div className="col-lg-3 col-md-6 col-sm-12 mb-3" key={i}>
                                        <div className={cx("cardProduct")}>
                                            <Dropdown className={cx("iconMore")}
                                                menu={{
                                                    items: [
                                                        {
                                                            label: <p onClick={handleShowDelete(brand)}><DeleteOutlined className="pe-2" />Xóa</p>,
                                                            key: '0',
                                                        },
                                                    ]
                                                }}
                                                trigger={['click']}
                                                placement="bottomRight"
                                            >
                                                <a onClick={(e) => e.preventDefault()} >
                                                    <MoreOutlined />

                                                </a>
                                            </Dropdown>
                                            <div className={cx("borderImage")}>
                                                <img src={`http://localhost:3000/${brand.imageBrand}`} className={cx("imgProduct")} alt="" />
                                            </div>
                                            <p className={cx("titleProduct")}>
                                                {brand.nameBrand}
                                            </p>
                                            <p className={cx("quantityItem")}>
                                                15 thiết bị
                                            </p>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="mt-5">
                                        <NotFound />
                                    </div>
                                )
                                }


                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <Modal title="Tạo thông tin thương hiệu" open={isModalOpen} onOk={upload} onCancel={handleCancel} okText="Tạo" cancelText="Đóng" key={modalKey}>
                <form action="" >
                    <div className="group">
                        <input type="file" name="imgBrand" id="imgBrand" className="d-none"
                            accept="image/jpeg, image/png, image/jpg"
                            // onChange={(e) => {
                            //     if (e.target.files && e.target.files[0]) {
                            //         setShowImageBrand(URL.createObjectURL(e.target.files[0]))
                            //         setImageBrand(e.target.files[0])
                            //     }
                            // }}
                            onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                    setShowImageBrand(URL.createObjectURL(e.target.files[0]))
                                    setImageBrand(e.target.files[0])
                                }


                            }}
                        />
                        <label htmlFor="imgBrand" className={`${cx("labelImgBrand")} ${errors.imageBrand ? 'border-danger' : ''}`} >
                            <img src={showimageBrand} alt="" className={cx("imgBrand")} />
                        </label>
                        {errors.imageBrand && <p className={cx("errors")}>{errors.imageBrand}</p>}
                    </div>
                    <div className="mt-2">
                        <p style={{ fontWeight: 500, fontSize: " 16px" }}>Tên thương hiệu</p>
                        <input
                            type="text"
                            className={`form-control mt-2 ${cx("inputForm")} ${errors.nameBrand ? 'border-danger' : ''} `}
                            id="exampleFormControlInput1"
                            placeholder="Nhập tên thương hiệu"
                            value={nameBrand}
                            onChange={(e) => setNameBrand(e.target.value)}
                            autoComplete="off"
                        />
                        {errors.nameBrand && <p className={cx("errors")}>{errors.nameBrand}</p>}
                    </div>
                </form>
            </Modal>

            <Modal title="Xóa dịch vụ" open={isModalDelete}
                onOk={() => handleDelete(deleteItem?.id)}
                onCancel={() => setIsModalDelete(false)}
                okButtonProps={{ style: { backgroundColor: 'red' } }} >
                <p>Bạn chắn chắn muốn xóa nhãn hàng {deleteItem?.nameBrand}</p>
            </Modal>


        </>
    );
}

export default Brand;