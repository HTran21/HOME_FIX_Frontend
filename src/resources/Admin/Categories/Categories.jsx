import className from "classnames/bind";
import styles from "./Categories.module.scss";
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

function Categories() {

    const [data, setData] = useState();
    const [showImage, setShowImage] = useState("../public/icon/image-gallery.png")
    const [nameCategories, setNameCategories] = useState("");
    const [imageCategories, setImageCategories] = useState();
    const [errors, setErrors] = useState({});

    const fetchData = () => {
        axios.get("http://localhost:3000/product/categories")
            .then(res => {
                setData(res.data)
            })
            .catch((error) => console.log(error));
    }

    useEffect(() => {
        fetchData();
    }, [])

    const upload = () => {

        const newErrors = {};

        if (nameCategories.trim() === "") {
            newErrors.nameCategories = "Chưa nhập loại thiết bị"
        }

        if (!imageCategories) {
            newErrors.imageCategories = "Chưa chọn ảnh"
        }

        if (Object.keys(newErrors).length === 0) {
            setErrors({});
            const formData = new FormData();
            formData.append('imageCategories', imageCategories)
            formData.append('nameCategories', nameCategories)
            axios.post("http://localhost:3000/product/categories", formData)
                .then(res => {
                    if (res.data.success === false) {
                        toast.error(res.data.message)
                    }
                    else {
                        toast.success(res.data.message)
                        fetchData()
                        setNameCategories('');
                        setShowImage('../public/icon/image-gallery.png')
                        setImageCategories();
                    }
                })

        } else {
            setErrors(newErrors);
        }

    }

    const [isModalDelete, setIsModalDelete] = useState(false);
    const [deleteItem, setDeleteItem] = useState();

    const handleShowDelete = (categori) => () => {
        setIsModalDelete(true);
        setDeleteItem(categori);
    }

    const handleDelete = (id) => {
        axios.delete('http://localhost:3000/product/categories/' + id)
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
                    <h4 className="d-inline-block">Loại thiết bị</h4>
                </div>
                <div className={cx("contentPage")}>
                    <div className="row">
                        <div className="col-lg-3 col-sm-12">
                            <div className={cx("AddCategories")}>
                                <h5>Tạo loại thiết bị</h5>
                                <div className="mb-3 mt-3">
                                    <h6>Tên loại thiết bị</h6>
                                    <input
                                        type="text"
                                        className={`form-control mt-2 ${cx("inputForm")} ${errors.nameCategories ? ' border-danger' : ''} `}
                                        id="exampleFormControlInput1"
                                        placeholder="Nhập tên loại thiết bị"
                                        value={nameCategories}
                                        onChange={(e) => setNameCategories(e.target.value)}
                                        autoComplete="off"
                                    />
                                    {errors.nameCategories && <p className={cx("errors")}>{errors.nameCategories}</p>}
                                </div>
                                <div className="mb-3 mt-4">
                                    <h6>Hình ảnh</h6>
                                    <div className="group">
                                        <input type="file" name="imgBrand" id="imgBrand" className="d-none"
                                            accept="image/jpeg, image/png, image/jpg"
                                            onChange={(e) => {
                                                if (e.target.files && e.target.files[0]) {
                                                    setShowImage(URL.createObjectURL(e.target.files[0]))
                                                    setImageCategories(e.target.files[0])
                                                }


                                            }}
                                        />
                                        <label htmlFor="imgBrand" className={`${cx("labelImgBrand")} ${errors.imageCategories ? 'border-danger' : ''}`}>
                                            <img src={showImage} alt="" className={cx("imgBrand")} />
                                        </label>
                                        {errors.imageCategories && <p className={cx("errors")}>{errors.imageCategories}</p>}
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <button className={cx("btnAddCategories")} onClick={upload}>Thêm loại thiết bị</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-9 col-sm-12">
                            <div className={cx("listCategories")}>
                                <div className="row">
                                    {data?.map((categoy, i) => (
                                        <div className="col-lg-3 col-md-6 col-sm-12" key={i}>
                                            <div className={cx("cardProduct")}>
                                                <Dropdown className={cx("iconMore")}
                                                    menu={{
                                                        items: [
                                                            {
                                                                label: <p onClick={handleShowDelete(categoy)}  ><DeleteOutlined className="pe-2" />Xóa</p>,
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
                                                    <img src={`http://localhost:3000/${categoy.imageCategories}`} className={cx("imgProduct")} alt="" />
                                                </div>
                                                <p className={cx("titleProduct")}>
                                                    {categoy.nameCategories}
                                                </p>
                                                <p className={cx("quantityItem")}>
                                                    15 thiết bị
                                                </p>
                                            </div>
                                        </div>

                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal title="Xóa dịch vụ" open={isModalDelete}
                onOk={() => handleDelete(deleteItem?.id)}
                onCancel={() => setIsModalDelete(false)}
                okButtonProps={{ style: { backgroundColor: 'red' } }} >
                <p>Bạn chắn chắn muốn xóa nhãn hàng {deleteItem?.nameBrand}</p>
            </Modal>
        </>
    );
}

export default Categories;