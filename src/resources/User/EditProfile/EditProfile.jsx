import axios from "../../../service/customize_axios";
import { useEffect, useState } from "react";
import className from "classnames/bind";
import styles from "./EditProfile.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Tabs, Space, Table, Tag } from 'antd';
import { faChevronRight, faCloudArrowUp, faPenToSquare, faTrash, faTriangleExclamation, faUpload } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
const cx = className.bind(styles);
import { useSelector, useDispatch } from "react-redux";
import AuthenService from "../../../service/AuthService";
import { doLogoutAction } from "../../../redux/reducer/userSlice";
import { toast } from "react-toastify";

function EditProfile() {

    const idUser = useSelector((state) => state.user.user.id);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [data, setData] = useState();
    const [imageShow, setImageShow] = useState("")
    const [avatar, setAvatar] = useState();
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [warnEmail, setWarnEmail] = useState("");
    const [initialEmail, setInitialEmail] = useState("");
    const [errors, setErrors] = useState({});

    const fetchProfile = async () => {
        let getUser = await axios.get("http://localhost:3000/getProfile");
        setData(getUser.data);
        setImageShow(`http://localhost:3000/${getUser.data.avatar}`)
        setUsername(getUser.data.username);
        setEmail(getUser.data.email);
        setPhone(getUser.data.phone);
        setAddress(getUser.data.address);
        setInitialEmail(getUser.data.email);
    }

    const changeEmail = (e) => {
        if (e.target.value != email) {
            setWarnEmail("Thay đổi email vui lòng đăng nhập lại")
            setEmail(e.target.value)
        }

    }
    const editProfile = () => {
        const newErrors = {};
        if (username.trim() === '') {
            newErrors.username = 'Chưa nhập họ tên';
        }

        if (email.trim() === '') {
            newErrors.email = 'Chưa nhập email';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email không hợp lệ';
        }

        if (address.trim() === '') {
            newErrors.address = 'Chưa nhập địa chỉ';
        }


        if (phone.trim() === '') {
            newErrors.phone = 'Chưa nhập số điện thoại';
        } else if (phone.length < 10) {
            newErrors.phone = 'Số điện thoại không hợp lệ';
        }


        if (Object.keys(newErrors).length === 0) {
            setErrors({});
            const formData = new FormData();
            formData.append("avatar", avatar);
            formData.append("username", username);
            formData.append("email", email);
            formData.append("phone", phone)
            formData.append("address", address)
            axios.put("http://localhost:3000/user/update/" + idUser, formData)
                .then(async res => {
                    if (res.data.emailChange) {
                        const logoutRes = await AuthenService.logoutApi();
                        if (logoutRes.status === 200) {
                            dispatch(doLogoutAction());
                            // toast.success("Đăng xuất thành công");
                            navigate("/login");
                            console.log("Logout thanh cong")
                        }
                    }
                    else {
                        toast.success(res.data.message)
                        window.location.reload();

                    }
                })
        }
        else {
            setErrors(newErrors)
        }


    }
    useEffect(() => {
        fetchProfile();
    }, [])


    return (
        <div className="containerPage">
            <div className="contentPage">
                <section>
                    <div className="container mt-3">
                        <div className="row">
                            <div className="col-lg-4">
                                <div className="card border-0 mb-4" style={{ padding: "22px" }}>
                                    <div className="card-body text-center">
                                        <img
                                            src={imageShow}
                                            alt="avatar"
                                            className="rounded-circle img-fluid"
                                            style={{ width: 140, height: 140 }}
                                        />
                                        <h5 className="my-3 mb-1">{username}</h5>
                                        <input type="file" name="imgProfile" id="imgProfile" accept="image/jpeg, image/png, image/jpg"
                                            onChange={(e) => {
                                                if (e.target.files && e.target.files[0]) {
                                                    setImageShow(URL.createObjectURL(e.target.files[0]))
                                                    setAvatar(e.target.files[0]);
                                                }
                                            }}
                                            className="d-none" />
                                        <label className={cx("btnUploadImage")} htmlFor="imgProfile" ><FontAwesomeIcon icon={faCloudArrowUp} /> Chọn ảnh</label>

                                    </div>
                                </div>

                            </div>
                            <div className="col-lg-8">
                                <div className="card mb-4 border-0">
                                    <div className="card-body pb-4">
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className={cx("textProfile")}>Họ tên</p>
                                            </div>
                                            <div className="col-sm-9 form-group">

                                                <input type="text" className={`${cx("inputForm")} form-control ${errors && errors.username ? 'is-invalid border border-danger' : ''}`}
                                                    value={username || ""} onChange={(e) => setUsername(e.target.value)} id="" />
                                                {errors && <p className="text-danger">{errors.username}</p>}
                                            </div>

                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className={cx("textProfile")}>Email</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <input type="email" className={`${cx("inputForm")} form-control ${errors && errors.email ? 'is-invalid border border-danger' : ''}`} value={email || ""}
                                                    onChange={(e) => changeEmail(e)} name="" id="" spellCheck="false" />
                                                {email !== data?.email && warnEmail && <p className={cx("warningText")}>
                                                    <FontAwesomeIcon icon={faTriangleExclamation} style={{ color: "#e6bf33", marginRight: "10px" }} /> {warnEmail}</p>}
                                                {errors && <p className="text-danger">{errors.email}</p>}
                                            </div>

                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className={cx("textProfile")}>Số điện thoại</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <input type="text" className={`${cx("inputForm")} form-control ${errors && errors.phone ? 'is-invalid border border-danger' : ''}`}
                                                    value={phone || ""} onChange={(e) => setPhone(e.target.value)} name="" id="" />
                                                {errors && <p className="text-danger">{errors.phone}</p>}
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className={cx("textProfile")}>Địa chỉ</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <input type="text" className={`${cx("inputForm")} form-control ${errors && errors.address ? 'is-invalid border border-danger' : ''}`}
                                                    value={address || ""} onChange={(e) => setAddress(e.target.value)} name="" id="" />
                                                {errors && <p className="text-danger">{errors.address}</p>}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <button className={cx("btnSave")} onClick={() => editProfile()}>Cập nhật</button>
                    </div>
                </section>

            </div >
        </div >
    );
}

export default EditProfile;