import className from "classnames/bind";
import styles from "./Specialization.module.scss";
import { useEffect, useState } from "react";
import axios from '../../../service/customize_axios';
import { toast } from "react-toastify";

const cx = className.bind(styles);

import {
    EditOutlined,
    DeleteOutlined,
    MoreOutlined,
} from '@ant-design/icons';
import { Dropdown, Modal, Drawer } from 'antd';

function Specialization() {

    const [data, setData] = useState();
    const [showImage, setShowImage] = useState("../public/icon/image-gallery.png")
    const [nameSpecialize, setNameSpecialize] = useState("");
    const [imageSpecialize, setImageSpecialize] = useState();
    const [desSpecialize, setDesSpecialize] = useState("");
    const [errors, setErrors] = useState({});

    const fetchData = () => {
        axios.get("http://localhost:3000/specialization/")
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

        if (nameSpecialize.trim() === "") {
            newErrors.nameSpecialize = "Chưa nhập tên chuyên môn"
        }

        if (!imageSpecialize) {
            newErrors.imageSpecialize = "Chưa chọn ảnh"
        }

        if (desSpecialize.trim() === "") {
            newErrors.desSpecialize = "Chưa nhập mô tả"
        }

        if (Object.keys(newErrors).length === 0) {
            setErrors({});
            const formData = new FormData();
            formData.append('imageSpecialize', imageSpecialize)
            formData.append('nameSpecialize', nameSpecialize)
            formData.append('desSpecialize', desSpecialize)
            axios.post("http://localhost:3000/specialization/", formData)
                .then(res => {
                    if (res.data.success === false) {
                        toast.error(res.data.message)
                    }
                    else {
                        toast.success(res.data.message)
                        fetchData()
                        setNameSpecialize('');
                        setShowImage('../public/icon/image-gallery.png')
                        setImageSpecialize();
                        setDesSpecialize("");
                    }
                })

        } else {
            setErrors(newErrors);
        }

    }

    const [open, setOpen] = useState(false);
    const [itemDrawer, setItemDrawer] = useState();
    const showDrawer = (item) => {
        setOpen(true);
        setItemDrawer(item)
        console.log("Item", item)
    };
    const onClose = () => {
        setOpen(false);
    };

    const [isModalDelete, setIsModalDelete] = useState(false);
    const [record, setRecord] = useState();
    const [isModalEdit, setIsModalEdit] = useState(false);
    const [nameSpecializeEidt, setNameSpecializeEdit] = useState('');
    const [imageSpecializeEidt, setImageSpecializeEidt] = useState();
    const [newImage, setNewImage] = useState();
    const [desSpecializeEdit, setDesSpecializeEidt] = useState();
    const [showImageEdit, setShowImageEdit] = useState();
    const [modalKey, setModalKey] = useState(0);

    const handleShowEdit = (item) => {
        setIsModalEdit(true);
        setRecord(item)
        setNameSpecializeEdit(item.nameSpecialization);
        // setImageSpecializeEidt(item.logoSpecialization);
        setDesSpecializeEidt(item.desSpecialization);
        setModalKey(prevKey => prevKey + 1);
    }


    const handleEdit = (id) => {
        const formData = new FormData();
        formData.append('imageSpecializeEidt', imageSpecializeEidt)
        formData.append('nameSpecializeEidt', nameSpecializeEidt)
        formData.append('desSpecializeEdit', desSpecializeEdit)
        axios.put("http://localhost:3000/specialization/" + id, formData)
            .then(res => {
                if (res.data.success === false) {
                    toast.error(res.data.message)
                }
                else {
                    toast.success(res.data.message)
                    fetchData()
                    handleCloseEdit();
                }
            })

    }

    const handleCloseEdit = () => {
        setRecord()
        setIsModalEdit(false);
        setShowImageEdit(undefined);
    }
    const handleShowDelete = (item) => () => {
        setIsModalDelete(true);
        setRecord(item)


    }

    const handleDelete = (id) => {
        axios.delete('http://localhost:3000/specialization/' + id)
            .then(res => {
                toast.success(res.data.message);
                handleCloseDelete();
                fetchData();
            })
            .catch((e) => console.log(e))
    }

    const handleCloseDelete = () => {
        setRecord()
        setIsModalDelete(false);
    }





    return (
        <>
            <div className={cx("containerPage")}>
                <div className="titleProduct">
                    <h4 className="d-inline-block">Danh mục chuyên môn</h4>
                </div>
                <div className={cx("contentPage")}>
                    <div className="row">
                        <div className="col-lg-3 col-sm-12">
                            <div className={cx("AddCategories")}>
                                <h5>Tạo chuyên môn</h5>
                                <div className="mb-3 mt-3">
                                    <h6>Tên chuyên môn</h6>
                                    <input
                                        type="text"
                                        className={`form-control mt-2 ${cx("inputForm")} ${errors.nameSpecialize ? ' border-danger' : ''} `}
                                        id="exampleFormControlInput1"
                                        placeholder="Nhập tên chuyên môn"
                                        value={nameSpecialize}
                                        onChange={(e) => setNameSpecialize(e.target.value)}
                                        autoComplete="off"
                                    />
                                    {errors.nameSpecialize && <p className={cx("errors")}>{errors.nameSpecialize}</p>}
                                </div>
                                <div className="mb-3 mt-4">
                                    <h6>Logo chuyên môn</h6>
                                    <div className="group">
                                        <input type="file" name="imgBrand" id="imgBrand" className="d-none"
                                            accept="image/jpeg, image/png, image/jpg"
                                            onChange={(e) => {
                                                if (e.target.files && e.target.files[0]) {
                                                    setShowImage(URL.createObjectURL(e.target.files[0]))
                                                    setImageSpecialize(e.target.files[0])
                                                }


                                            }}
                                        />
                                        <label htmlFor="imgBrand" className={`${cx("labelImgBrand")} ${errors.imageSpecialize ? 'border-danger' : ''}`}>
                                            <img src={showImage} alt="" className={cx("imgBrand")} />
                                        </label>
                                        {errors.imageSpecialize && <p className={cx("errors")}>{errors.imageSpecialize}</p>}
                                    </div>
                                </div>
                                <div className="mb-3 mt-4">
                                    <h6>Mô tả chuyên môn</h6>
                                    <textarea
                                        className={`form-control mt-2 ${cx("inputForm")} ${errors.desSpecialize ? 'border-danger' : ''}`}
                                        id="exampleFormControlTextarea1"
                                        rows={5}
                                        onChange={(e) => setDesSpecialize(e.target.value)}
                                        value={desSpecialize}
                                    />
                                    {errors.desSpecialize && <p className={cx("errors")}>{errors.desSpecialize}</p>}
                                </div>
                                <div className="mt-4">
                                    <button className={cx("btnAddCategories")} onClick={upload}>Tạo chuyên môn</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-9 col-sm-12">
                            <div className={cx("listCategories")}>
                                <div className="row">

                                    {data?.map((specialize, i) => (
                                        <div className="col-lg-3 col-md-6 col-sm-12" key={i}>
                                            <div className={cx("cardProduct")}>
                                                <Dropdown className={cx("iconMore")}
                                                    menu={{
                                                        items: [
                                                            {
                                                                label: <p onClick={() => handleShowEdit(specialize)}  ><EditOutlined className="pe-2" />Sửa</p>,
                                                                key: '0',
                                                            },
                                                            {
                                                                label: <p onClick={handleShowDelete(specialize)}  ><DeleteOutlined className="pe-2" />Xóa</p>,
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
                                                <div className={cx("borderImage")}>
                                                    <img src={`http://localhost:3000/${specialize.logoSpecialization}`} className={cx("imgProduct")} alt="" />
                                                </div>
                                                <p onClick={() => showDrawer(specialize)} className={cx("titleProduct")}>
                                                    {specialize.nameSpecialization}
                                                </p>
                                                <p className={cx("quantityItem")}>
                                                    10 thợ
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
            <Drawer title={itemDrawer?.nameSpecialization} onClose={onClose} open={open}>
                <img className={cx("imgDrawer")} src={`http://localhost:3000/${itemDrawer?.logoSpecialization}`} alt="" />
                <p className={cx("textDrawer")}>{itemDrawer?.desSpecialization}</p>
            </Drawer>

            <Modal title="Chỉnh sửa chuyên môn" open={isModalEdit}
                onOk={() => handleEdit(record?.id)}
                onCancel={() => handleCloseEdit()} >
                <>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">
                            Tên chuyên môn
                        </label>
                        <input
                            type="text"
                            value={nameSpecializeEidt}
                            onChange={(e) => setNameSpecializeEdit(e.target.value)}
                            className="form-control"
                            id="exampleInputPassword1"
                            autoComplete="off"
                        />
                    </div>
                    <div>
                        <input type="file" name="imgEdit" id="imgEdit" className="d-none"
                            accept="image/jpeg, image/png, image/jpg"
                            onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                    setShowImageEdit(URL.createObjectURL(e.target.files[0]));
                                    setImageSpecializeEidt(e.target.files[0])
                                }
                            }}
                        />
                        <label htmlFor="imgEdit" className={`${cx("labelImgBrand")}`}>
                            <img src={showImageEdit || `http://localhost:3000/${record?.logoSpecialization}`} alt="" className={cx("imgBrand")} />
                        </label>

                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">
                            Mô tả chuyên môn
                        </label>
                        <textarea
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            rows={3}
                            value={desSpecializeEdit}
                            onChange={(e) => setDesSpecializeEidt(e.target.value)}
                        />
                    </div>
                </>

            </Modal>
            <Modal title="Xóa dịch vụ" open={isModalDelete}
                onOk={() => handleDelete(record?.id)}
                onCancel={() => setIsModalDelete(false)}
                okButtonProps={{ style: { backgroundColor: 'red' } }} >
                <p>Bạn chắn chắn muốn xóa chuyên môn {record?.nameSpecialization}</p>
            </Modal>
        </>
    );
}

export default Specialization;