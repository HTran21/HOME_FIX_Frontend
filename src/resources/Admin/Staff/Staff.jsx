import className from "classnames/bind";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faEye, faEyeSlash, faImage, faLock, faMagnifyingGlass, faPenToSquare, faPhone, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";

import styles from "./Staff.module.scss";
import { Link } from "react-router-dom";
import axios from '../../../service/customize_axios';
import { toast } from "react-toastify";

import {
    FilterOutlined,
    SearchOutlined,
    MoreOutlined,
    EditOutlined,
    DeleteOutlined
} from '@ant-design/icons';

import { Button, Modal, Table, Space, Tag, ConfigProvider } from 'antd';

const cx = className.bind(styles);

function Staff() {
    const [lisetSpecialize, setListSpecialize] = useState();
    const [data, setData] = useState();
    const fetchSpecialize = () => {
        axios.get("http://localhost:3000/specialization/")
            .then(res => {
                setListSpecialize(res.data)
            })
            .catch((error) => console.log(error));
    }

    const fetchData = () => {
        axios.get("http://localhost:3000/admin/getAll")
            .then(res => {
                setData(res.data.users)
            })
            .catch((error) => console.log(error));
    }

    useEffect(() => {
        fetchSpecialize();
        fetchData();
    }, [])


    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [avatar, setAvatar] = useState();
    const [address, setAddress] = useState('');
    const [position, setPosition] = useState('');
    const [specialize, setSpecialize] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState();
    const [modalKey, setModalKey] = useState(0);

    const onChangeIcon = () => {
        setShowPassword(!showPassword);
    }
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
        setModalKey(prevKey => prevKey + 1);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setUserName('');
        setAvatar(undefined);
        setEmail('')
        setPassword('');
        setPhone('');
        setAddress('');
        setPosition('');
        setSpecialize(0);
    }

    const upload = () => {
        const newErrors = {};

        if (username.trim() === '') {
            newErrors.username = 'Vui lòng nhập họ tên';
        }
        if (password.trim() === '') {
            newErrors.password = 'Vui lòng nhập mật khẩu';
        }
        if (email.trim() === '') {
            newErrors.email = 'Vui lòng nhập email';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email không hợp lệ';
        }

        if (!avatar) {
            newErrors.avatar = 'Vui lòng chọn ảnh đại diện';
        }

        if (position.trim() === '') {
            newErrors.position = 'Vui lòng chọn vị trí'
        }

        if (specialize == 0) {
            newErrors.specialization = 'Vui lòng chọn kỷ năng'
        }


        if (phone.trim() === '') {
            newErrors.phone = 'Vui lòng nhập số điện thoại';
        } else if (phone.length < 10 || !/^(0\d{9,10})$/.test(phone)) {
            newErrors.phone = 'Số điện thoại không hợp lệ';
        }

        if (address.trim() === '') {
            newErrors.address = 'Vui lòng nhập địa chỉ';
        }
        if (Object.keys(newErrors).length === 0) {
            setErrors();
            const formData = new FormData()
            formData.append('avatar', avatar)
            formData.append('username', username)
            formData.append('password', password)
            formData.append('position', position)
            formData.append('email', email)
            formData.append('phone', phone)
            formData.append('address', address)
            formData.append('specialize', specialize)
            axios.post('http://localhost:3000/admin/repairer', formData)
                .then(res => {
                    if (res.data.success) {
                        toast.success(res.data.message);
                        handleCancel();
                        fetchData();
                    }
                    else {
                        toast.error(res.data.message)
                    }

                    // fetchData();
                })
                .catch((e) => console.log(e))
        }
        else {
            setErrors(newErrors);
        }
    }

    const handleSearch = async (searchTerm) => {
        try {
            if (searchTerm.trim() === '') {
                const res = await axios.get(`http://localhost:3000/admin/getAll`)
                setData(res.data.users)

            }
            else {
                const res = await axios.get(`http://localhost:3000/admin/getAll?search=${searchTerm}`)
                setData(res.data.users);
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

    const [id, setId] = useState();
    const [isModalEdit, setIsModalEdit] = useState(false);
    const [record, setRecord] = useState();
    const [usernameEdit, setUserNameEdit] = useState('');
    const [emailEdit, setEmailEdit] = useState('');
    const [phoneEdit, setPhoneEdit] = useState('');
    const [avatarEdit, setAvatarEdit] = useState();
    const [addressEdit, setAddressEdit] = useState('');
    const [positionEdit, setPositionEdit] = useState('');
    const [specializeEdit, setSpecializeEdit] = useState(0);

    const showModalEdit = (user) => {
        setId(user.id);
        setIsModalEdit(true);
        setUserNameEdit(user.username);
        setEmailEdit(user.email);
        setPhoneEdit(user.phone);
        setAddressEdit(user.address);
        setSpecializeEdit(user.skill);
        setPositionEdit(user.position);
    }

    const handleCancelEdit = () => {
        setIsModalEdit(false);
        setUserNameEdit('');
        setAvatarEdit(undefined);
        setEmailEdit('')
        setShowPassword('');
        setPhoneEdit('');
        setAddressEdit('');
        setPositionEdit('');
        setId();
        setSpecializeEdit(0);
    }

    const uploadEdit = () => {
        const newErrors = {};

        if (usernameEdit.trim() === '') {
            newErrors.username = 'Vui lòng nhập họ tên';
        }
        if (emailEdit.trim() === '') {
            newErrors.email = 'Vui lòng nhập email';
        } else if (!/\S+@\S+\.\S+/.test(emailEdit)) {
            newErrors.email = 'Email không hợp lệ';
        }
        if (positionEdit.trim() === '') {
            newErrors.position = 'Vui lòng chọn vị trí'
        }

        if (specializeEdit == 0) {
            newErrors.specialization = 'Vui lòng chọn kỷ năng'
        }


        if (phoneEdit.trim() === '') {
            newErrors.phone = 'Vui lòng nhập số điện thoại';
        } else if (phoneEdit.length < 10 || !/^(0\d{9,10})$/.test(phoneEdit)) {
            newErrors.phone = 'Số điện thoại không hợp lệ';
        }

        if (addressEdit.trim() === '') {
            newErrors.address = 'Vui lòng nhập địa chỉ';
        }
        if (Object.keys(newErrors).length === 0) {
            setErrors();
            const formData = new FormData()
            formData.append('avatar', avatarEdit)
            formData.append('username', usernameEdit)
            formData.append('position', positionEdit)
            formData.append('email', emailEdit)
            formData.append('phone', phoneEdit)
            formData.append('address', addressEdit)
            formData.append('specialize', specializeEdit)
            axios.put('http://localhost:3000/repair/update/' + id, formData)
                .then(res => {
                    if (res.data.success) {
                        toast.success(res.data.message);
                        handleCancelEdit();
                        fetchData();
                    }
                    else {
                        toast.error(res.data.message)
                    }

                    // fetchData();
                })
                .catch((e) => console.log(e))
        }
        else {
            setErrors(newErrors);
        }
    }

    const [isModalDelete, setIsModalDelete] = useState(false);

    const showModalDelete = (user) => {
        setIsModalDelete(true);
        setRecord(user)
    }

    const handleDelete = (id) => {
        axios.delete('http://localhost:3000/admin/repairer/delete/' + id)
            .then(res => {
                if (res.data.success) {
                    toast.success(res.data.message);
                    setIsModalDelete(false);
                    fetchData();
                }
                else {
                    toast.error(res.data.message)
                }

                // fetchData();
            })
            .catch((e) => console.log(e))
    }



    return (
        <>
            <div className={cx("containerPage")}>
                <div className="titlePage">
                    <h4 className="d-inline-block">Danh sách nhân viên</h4>

                </div>
                <div className={cx("contentPage")}>
                    <div className={cx("headerListProducts")}>
                        <div className={cx("searchGroup")}>
                            <div className={cx("searchBorder")}>
                                <input type="text" className={cx("inputSearch")} onKeyDown={handleKeyDown} name="" id="search" placeholder="Tìm kiếm..." autoComplete="off" />
                                <label htmlFor="search" className={cx("iconSearch")}><SearchOutlined /></label>
                            </div>

                        </div>
                        <button className={cx("btnAddProduct")} onClick={() => showModal()}>Thêm nhân viên</button>

                    </div>



                    <table className="mt-3 table-bordered table table-secondary table-hover text-center mt-4">
                        <thead>
                            <tr>
                                <th scope="col">STT</th>
                                <th scope="col">Họ tên</th>
                                <th scope="col">Email</th>
                                <th scope="col">Số điện thoại</th>
                                <th scope="col">Chức vụ</th>
                                <th scope="col">Role</th>
                                <th scope="col">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.length > 0 ? (
                                data?.map((staff, i) => (
                                    <tr key={i}>
                                        <th scope="row">{i + 1}</th>
                                        <td><img src={`http://localhost:3000/${staff.avatar}`} className={cx("avatarUser")} alt="" /> {staff.username}</td>
                                        <td>{staff.email}</td>
                                        <td>{staff.phone}</td>
                                        <td>{staff.position}</td>
                                        <td>{staff.role}</td>
                                        <td className="text-center">
                                            {staff.role === 'AD' ? (
                                                <div></div>
                                            ) : (
                                                <div>
                                                    <FontAwesomeIcon onClick={() => showModalEdit(staff)} icon={faPenToSquare} size="lg" style={{ color: "#106cb2", padding: "3px" }} />
                                                    <FontAwesomeIcon onClick={() => showModalDelete(staff)} icon={faTrash} style={{ color: "#d12323", padding: "3px" }} />
                                                </div>
                                            )}

                                        </td>
                                    </tr>
                                ))

                            ) : (
                                <tr key={`0`}>
                                    <td colSpan={7} className={cx("dataEmpty")}><img src="../public/icon/file.png" alt="" /><p>Dữ liệu rỗng</p></td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                </div>
            </div>

            <Modal title="Thêm nhân viên"
                open={isModalOpen}
                onOk={upload} onCancel={handleCancel}
                width={700}
                key={modalKey}>
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className={`${errors?.username ? `${cx("borderError")}` : ''} ${cx("groupInput")}`}>
                            <label htmlFor="username"><FontAwesomeIcon icon={faUser} /></label>
                            <input type="text" name="" value={username} onChange={(e) => setUserName(e.target.value)} id="username" placeholder="Họ và tên" autoComplete="off" />

                        </div>
                        {errors?.username && <p className={cx("errors")}>{errors.username}</p>}
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className={`${errors?.password ? `${cx("borderError")}` : ''} ${cx("groupForm2")}`}>
                            <label htmlFor="password" className={cx("iconInputForm2")}>
                                <FontAwesomeIcon icon={faLock} />
                            </label>
                            <input type={showPassword ? 'text' : 'password'} className={cx("inputForm2")} value={password}
                                name="password" id="password" onChange={(e) => setPassword(e.target.value)} placeholder="Mật khẩu" />
                            <div className={cx("iconEye")} onClick={onChangeIcon}> {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />} </div>

                        </div>
                        {errors?.password && <p className={cx("errors")}>{errors.password}</p>}
                    </div>

                </div>

                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className={`${errors?.email ? `${cx("borderError")}` : ''} ${cx("groupInput")}`}>
                            <label htmlFor="email"><FontAwesomeIcon icon={faEnvelope} /></label>
                            <input type="text" name="" value={email} onChange={(e) => setEmail(e.target.value)} id="email" placeholder="Email" autoComplete="off" />
                        </div>
                        {errors?.email && <p className={cx("errors")}>{errors.email}</p>}
                    </div>


                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className={`${errors?.phone ? `${cx("borderError")}` : ''} ${cx("groupInput")}`}>
                            <label htmlFor="phone"><FontAwesomeIcon icon={faPhone} /></label>
                            <input type="text" name="" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Số điện thoại" autoComplete="off" />
                        </div>
                        {errors?.phone && <p className={cx("errors")}>{errors.phone}</p>}
                    </div>

                </div>

                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className={`${errors?.avatar ? `${cx("borderError")}` : ''} ${cx("groupInput")}`}>
                            <label htmlFor="avatar"><FontAwesomeIcon icon={faImage} /></label>
                            <input type="file" name="avatar" onChange={(e) => setAvatar(e.target.files[0])} id="avatar" placeholder="Ảnh đại diện" />
                        </div>
                        {errors?.avatar && <p className={cx("errors")}>{errors.avatar}</p>}
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className={`${errors?.specialization ? `${cx("borderError")}` : ''} ${cx("groupInput3")}`}>
                            <select className="form-select" aria-label="Default select example"
                                value={specialize} onChange={(e) => setSpecialize(e.target.value)}>
                                <option value="0">Chọn kỷ năng</option>
                                {lisetSpecialize?.map((specialization, i) => (
                                    <option value={specialization.id} key={i} >{specialization.nameSpecialization}</option>
                                ))}
                            </select>

                        </div>
                        {errors?.specialization && <p className={cx("errors")}>{errors.specialization}</p>}
                    </div>

                </div>
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className={`${errors?.position ? `${cx("borderError")}` : ''} ${cx("groupInput3")}`}>
                            <select className="form-select" aria-label="Default select example"
                                value={position} onChange={(e) => setPosition(e.target.value)}>
                                <option value="">Chọn vị trí</option>
                                <option value="Quản lý">Quản lý</option>
                                <option value="Thợ sửa chữa">Thợ sửa chữa</option>
                            </select>

                        </div>
                        {errors?.position && <p className={cx("errors")}>{errors.position}</p>}
                    </div>

                </div>
                <div className={`form-floating ${errors?.Edit ? 'border-danger' : ''} ${cx("addressInput")}`}>
                    <textarea
                        className="form-control"
                        placeholder="Leave a comment here"
                        id="floatingTextarea"
                        value={address} onChange={(e) => setAddress(e.target.value)}
                    />
                    <label htmlFor="floatingTextarea">Địa chỉ</label>
                </div>
                {errors?.address && <p className={cx("errors")}>{errors.address}</p>}


            </Modal >


            <Modal title="Chỉnh sửa thông tin"
                open={isModalEdit}
                onOk={uploadEdit} onCancel={handleCancelEdit}
                width={700}>
                <div className="row">

                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className={`${errors?.username ? `${cx("borderError")}` : ''} ${cx("groupInput")}`}>
                            <label htmlFor="username"><FontAwesomeIcon icon={faUser} /></label>
                            <input type="text" name="" value={usernameEdit} onChange={(e) => setUserNameEdit(e.target.value)} id="username" placeholder="Họ và tên" autoComplete="off" />

                        </div>
                        {errors?.username && <p className={cx("errors")}>{errors.username}</p>}
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className={`${errors?.position ? `${cx("borderError")}` : ''} ${cx("groupInput3")}`}>
                            <select className="form-select" aria-label="Default select example"
                                value={positionEdit} onChange={(e) => setPositionEdit(e.target.value)}>
                                <option value="">Chọn vị trí</option>
                                <option value="Quản lý">Quản lý</option>
                                <option value="Thợ sửa chữa">Thợ sửa chữa</option>
                            </select>

                        </div>
                        {errors?.position && <p className={cx("errors")}>{errors.position}</p>}
                    </div>

                </div>

                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className={`${errors?.email ? `${cx("borderError")}` : ''} ${cx("groupInput")}`}>
                            <label htmlFor="email"><FontAwesomeIcon icon={faEnvelope} /></label>
                            <input type="text" name="" value={emailEdit} onChange={(e) => setEmailEdit(e.target.value)} id="email" placeholder="Email" autoComplete="off" />
                        </div>
                        {errors?.email && <p className={cx("errors")}>{errors.email}</p>}
                    </div>


                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className={`${errors?.phone ? `${cx("borderError")}` : ''} ${cx("groupInput")}`}>
                            <label htmlFor="phone"><FontAwesomeIcon icon={faPhone} /></label>
                            <input type="text" name="" id="phone" value={phoneEdit} onChange={(e) => setPhoneEdit(e.target.value)} placeholder="Số điện thoại" autoComplete="off" />
                        </div>
                        {errors?.phone && <p className={cx("errors")}>{errors.phone}</p>}
                    </div>

                </div>

                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className={`${errors?.avatar ? `${cx("borderError")}` : ''} ${cx("groupInput")}`}>
                            <label htmlFor="avatar"><FontAwesomeIcon icon={faImage} /></label>
                            <input type="file" name="avatar" onChange={(e) => setAvatarEdit(e.target.files[0])} id="avatar" placeholder="Ảnh đại diện" />
                        </div>
                        {errors?.avatar && <p className={cx("errors")}>{errors.avatar}</p>}
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className={`${errors?.specialization ? `${cx("borderError")}` : ''} ${cx("groupInput3")}`}>
                            <select className="form-select" aria-label="Default select example"
                                value={specializeEdit} onChange={(e) => setspecializeEdit(e.target.value)}>
                                <option value="0">Chọn kỷ năng</option>
                                {lisetSpecialize?.map((specialization, i) => (
                                    <option value={specialization.id} key={i} >{specialization.nameSpecialization}</option>
                                ))}
                            </select>

                        </div>
                        {errors?.specialization && <p className={cx("errors")}>{errors.specialization}</p>}
                    </div>

                </div>
                <div className={`form-floating ${errors?.address ? 'border-danger' : ''} ${cx("addressInput")}`}>
                    <textarea
                        className="form-control"
                        placeholder="Leave a comment here"
                        id="floatingTextarea"
                        value={addressEdit} onChange={(e) => setAddressEdit(e.target.value)}
                    />
                    <label htmlFor="floatingTextarea">Địa chỉ</label>
                </div>
                {errors?.address && <p className={cx("errors")}>{errors.address}</p>}


            </Modal >

            <Modal title="Xóa tài khoản" open={isModalDelete} okButtonProps={{ style: { backgroundColor: "red" } }} onOk={() => handleDelete(record?.id)} onCancel={() => setIsModalDelete(false)}>
                <p>Bạn chắc chắn muốn xóa người dùng {record?.username}</p>
            </Modal >



        </>
    );
}

export default Staff;