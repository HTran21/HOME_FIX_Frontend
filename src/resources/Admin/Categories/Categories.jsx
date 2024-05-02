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
    EditOutlined
} from '@ant-design/icons';
import { Dropdown, Modal } from 'antd';

function Categories() {

    const [data, setData] = useState();
    const [listService, setListService] = useState();
    const [showImage, setShowImage] = useState("../public/icon/image-gallery.png")
    const [nameCategories, setNameCategories] = useState("");
    const [imageCategories, setImageCategories] = useState();
    const [idService, setIdService] = useState()
    const [errors, setErrors] = useState({});

    const fetchData = () => {
        axios.get("http://localhost:3000/product/categories")
            .then(res => {
                setData(res.data)
                // console.log("Data", res.data)
            })
            .catch((error) => console.log(error));
    }

    const fetchService = () => {
        axios.get("http://localhost:3000/service/getService")
            .then(res => {
                // console.log("list service", res.data.listService)
                setListService(res.data.listService)
            })
    }

    useEffect(() => {
        fetchData();
        fetchService();
    }, [])

    const upload = () => {

        const newErrors = {};

        if (nameCategories.trim() === "") {
            newErrors.nameCategories = "Chưa nhập loại thiết bị"
        }

        if (idService <= 0 || !idService) {
            newErrors.idService = "Chưa chọn dịch vụ"
        }

        if (!imageCategories) {
            newErrors.imageCategories = "Chưa chọn ảnh"
        }

        if (Object.keys(newErrors).length === 0) {
            setErrors({});
            const formData = new FormData();
            formData.append('imageCategories', imageCategories)
            formData.append('nameCategories', nameCategories)
            formData.append('idService', idService)
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
                        setIdService("");
                    }
                })

        } else {
            setErrors(newErrors);
        }

    }

    const [isModalDelete, setIsModalDelete] = useState(false);
    const [deleteItem, setDeleteItem] = useState();

    const handleShowDelete = (categori) => {
        setIsModalDelete(true);
        setDeleteItem(categori);
    }

    const handleDelete = (id) => {
        axios.delete('http://localhost:3000/product/categories/' + id)
            .then(res => {
                if (res.data.success) {
                    toast.success(res.data.message)
                    setIsModalDelete(false);
                    fetchData();
                } else {
                    toast.error(res.data.message)
                    setIsModalDelete(false);
                }
            })
            .catch((e) => console.log(e))
    }

    const [showImageEdit, setShowImageEdit] = useState("")
    const [nameCategoryEdit, setNameCategoryEdit] = useState("");
    const [imageCategoryEdit, setImageCategoryEdit] = useState();
    const [idServiceEdit, setIdServiceEdit] = useState()
    const [editItem, setEditItem] = useState();
    const [isModalEdit, setIsModalEdit] = useState(false)
    const [modalKey, setModalKey] = useState(0);

    const handleShowEdit = (item) => {
        setIsModalEdit(true)
        setEditItem(item);
        setNameCategoryEdit(item.nameCategories);
        setIdServiceEdit(item.ID_Service);
        setModalKey(prevKey => prevKey + 1);
    }

    const handleCloseEdit = () => {
        setEditItem()
        setIsModalEdit(false);
        setShowImageEdit(undefined);
        setImageCategoryEdit(undefined)
    }
    const handleEdit = (id) => {
        if (id) {
            const formData = new FormData();
            formData.append('imageCategories', imageCategoryEdit)
            formData.append('nameCategories', nameCategoryEdit)
            formData.append('idService', idServiceEdit)
            axios.put("http://localhost:3000/product/categories/" + id, formData)
                .then(res => {
                    if (res.data.success === false) {
                        toast.error(res.data.message)
                    }
                    else {
                        toast.success(res.data.message)
                        handleCloseEdit();
                        fetchData()

                    }
                })

        }
    }


    return (
        <>
            <div className={cx("containerPage")} style={{ backgroundColor: "#F0F3F7" }}>
                <div className={cx("titlePage")}>
                    <h4 className="d-inline-block">Loại thiết bị</h4>
                </div>
                <div className={cx("contentPage")}>
                    <div className="row">
                        <div className="col-lg-3 col-sm-12">
                            <div className={cx("AddCategories")}>
                                <h5>Tạo loại thiết bị</h5>
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
                                    {data?.map((category, i) => (
                                        <div className="col-lg-3 col-md-6 col-sm-12" key={i}>
                                            <div className={cx("cardProduct")}>
                                                <div className={cx("titleCardProduct")}>
                                                    <p className={cx("serviceProduct")}>{category.Service.nameService}</p>
                                                    <Dropdown className={cx("iconMore")}
                                                        menu={{
                                                            items: [
                                                                {
                                                                    label: <p onClick={() => handleShowEdit(category)}  ><EditOutlined className="pe-2" />Sửa</p>,
                                                                    key: '0',
                                                                },
                                                                {
                                                                    label: <p onClick={() => handleShowDelete(category)}  ><DeleteOutlined className="pe-2" />Xóa</p>,
                                                                    key: '1',
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
                                                </div>
                                                <div className={cx("borderImage")}>
                                                    <img src={`http://localhost:3000/${category.imageCategories}`} className={cx("imgProduct")} alt="" />
                                                </div>
                                                <p className={cx("titleProduct")}>
                                                    {category.nameCategories}
                                                </p>
                                                {/* <p className={cx("quantityItem")}>
                                                    thiết bị
                                                </p> */}
                                            </div>
                                        </div>

                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal title="Chỉnh sửa thiết bị" open={isModalEdit}
                onOk={() => handleEdit(editItem?.id)}
                onCancel={() => handleCloseEdit()}>
                <select className={`form-control mt-2 ${cx("inputForm")} ${errors.idService ? ' border-danger' : ''} `} aria-label="Default select example"
                    value={idServiceEdit} onChange={(e) => setIdServiceEdit(e.target.value)}
                >
                    <option value="0">Chọn dịch vụ</option>
                    {
                        listService?.map((service, i) =>
                            <option key={i} value={service.id}>{service.nameService}</option>
                        )
                    }
                </select>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                        Tên chuyên môn
                    </label>
                    <input
                        type="text"
                        value={nameCategoryEdit}
                        onChange={(e) => setNameCategoryEdit(e.target.value)}
                        className="form-control"
                        id="exampleInputPassword1"
                        autoComplete="off"
                    />
                </div>
                <h6>Hình ảnh</h6>
                <div className="group">
                    <input type="file" name="imgEdit" id="imgEdit" className="d-none"
                        accept="image/jpeg, image/png, image/jpg"
                        onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                                setShowImageEdit(URL.createObjectURL(e.target.files[0]));
                                setImageCategoryEdit(e.target.files[0])
                            }
                        }}
                    />
                    <label htmlFor="imgEdit" className={`${cx("labelImgBrand")}`}>
                        <img src={showImageEdit || `http://localhost:3000/${editItem?.imageCategories}`} alt="" className={cx("imgBrand")} />
                    </label>


                </div>
            </Modal>
            <Modal title="Xóa thiết bị" open={isModalDelete}
                onOk={() => handleDelete(deleteItem?.id)}
                onCancel={() => setIsModalDelete(false)}
                okButtonProps={{ style: { backgroundColor: 'red' } }} >
                <p>Bạn chắn chắn muốn xóa loại thiết bị {deleteItem?.nameCategories}</p>
            </Modal>
        </>
    );
}

export default Categories;