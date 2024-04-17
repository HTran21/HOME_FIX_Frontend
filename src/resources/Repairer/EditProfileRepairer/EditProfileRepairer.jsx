import { useSelector, useDispatch } from "react-redux";
import styles from "./EditProfileRepairer.module.scss";
import classNames from 'classnames/bind';
import axios from '../../../service/customize_axios';
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { doLogoutAction } from "../../../redux/reducer/userSlice";
import { toast } from 'react-toastify';
import AuthenService from "../../../service/AuthService";

const cx = classNames.bind(styles);


function EditProfileRepairer() {

    const user = useSelector((state) => state.user.user);
    const id = user?.id;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [data, setData] = useState();
    const [avatar, setAvatar] = useState();
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [imageShow, setImageShow] = useState("")
    const [warnEmail, setWarnEmail] = useState("");
    // const [imageShow, setImageShow] = useState(`http://localhost:3000/${user?.avatar}`);
    const [errors, setErrors] = useState({});

    const fetchData = () => {
        axios.get("http://localhost:3000/repair/profile/" + id)
            .then(res => {
                setData(res.data.data.user)
                setData(res.data.data.user);
                setImageShow(`http://localhost:3000/${res.data.data.user.avatarRepairer}`)
                setUsername(res.data.data.user.usernameRepairer);
                setEmail(res.data.data.user.emailRepairer);
                setPhone(res.data.data.user.phoneRepairer);
                setAddress(res.data.data.user.addressRepairer);
                // setInitialEmail(res.data.data.user.emailRepairerl);
            })
            .catch((error) => console.log(error));

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
            axios.put("http://localhost:3000/repair/update/" + id, formData)
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
        fetchData();
    }, [])

    return (
        <div className="">
            <section className="h-100 gradient-custom-2">
                <div className="container h-100 p-0">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-lg-9 col-xl-7">
                            <div className="card">
                                <div
                                    className="rounded-top text-white d-flex flex-row"
                                    // style={{ backgroundColor: "#000", height: 200 }}
                                    style={{ backgroundImage: "url(../../imageRepair/backgroundProfileRepair.jpg)", height: 200 }}

                                >
                                    <div
                                        className="ms-4 d-flex flex-column"
                                        style={{ width: 130, marginTop: "70px" }}
                                    >
                                        <img
                                            src={imageShow}
                                            alt="Generic placeholder image"
                                            className="img-fluid img-thumbnail mt-4 mb-2"
                                            style={{ width: 150, zIndex: 1 }}
                                        />
                                        <input type="file" name="avatarRepairer" id="avatarRepairer" className="d-none"
                                            onChange={(e) => {
                                                if (e.target.files && e.target.files[0]) {
                                                    setImageShow(URL.createObjectURL(e.target.files[0]))
                                                    setAvatar(e.target.files[0]);
                                                }
                                            }}
                                        />
                                        <label htmlFor="avatarRepairer"
                                            className="btn btn-outline-dark"
                                            data-mdb-ripple-color="dark"
                                            style={{ zIndex: 1 }}
                                        >
                                            <FontAwesomeIcon icon={faCloudArrowUp} /> Upload
                                        </label>
                                    </div>
                                    <div className="ms-3" style={{ marginTop: 150 }}>
                                        <h5>{username || ''}</h5 >
                                        <p>{data?.Service.nameService}</p>
                                    </div>
                                </div>
                                <div
                                    className="p-3 text-black"
                                    style={{ backgroundColor: "#f8f9fa" }}
                                >
                                    <div className="d-flex justify-content-end text-center py-1">
                                        <h6 className="mt-1">Thợ sửa chữa</h6>
                                    </div>
                                </div>
                                <div className="card-body text-black">
                                    <h6 className="mb-2">Thông tin cá nhân</h6>
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6 col-sm-12">
                                            <div className="form-floating mb-3">
                                                <input
                                                    type="text"
                                                    className={`form-control ${cx("inputForm")}`}
                                                    id="floatingInput"
                                                    placeholder="name@example.com"
                                                    value={username || ''}
                                                    onChange={(e) => setUsername(e.target.value)}
                                                />
                                                <label htmlFor="floatingInput">Họ tên</label>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-12">
                                            <div className="form-floating mb-3">
                                                <input
                                                    type="email"
                                                    className={`form-control ${cx("inputForm")}`}
                                                    id="floatingInput"
                                                    placeholder="name@example.com"

                                                    value={email} onChange={(e) => changeEmail(e)}
                                                />
                                                <label htmlFor="floatingInput">Email</label>
                                                {email !== data?.emailRepairer && warnEmail && <p className={cx("warningText")}>
                                                    <FontAwesomeIcon icon={faTriangleExclamation} style={{ color: "#e6bf33", marginRight: "10px" }} /> {warnEmail}</p>}

                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-6 col-md-6 col-sm12">
                                            <div className="form-floating mb-3">
                                                <input
                                                    type="text"
                                                    className={`form-control ${cx("inputForm")}`}
                                                    id="floatingInput"
                                                    placeholder="name@example.com"
                                                    value={phone || ''}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                />
                                                <label htmlFor="floatingInput">Số điện thoại</label>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm12">
                                            <div className="form-floating mb-3">
                                                <input
                                                    type="text"
                                                    className={`form-control ${cx("inputForm")}`}
                                                    id="floatingInput"
                                                    placeholder="name@example.com"
                                                    value={address || ''}
                                                    onChange={(e) => setAddress(e.target.value)}
                                                />
                                                <label htmlFor="floatingInput">Địa chỉ</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-6 col-md-6 col-sm12">
                                            <div className="form-floating mb-3">
                                                <input
                                                    type="text"
                                                    className={`form-control ${cx("inputForm")}`}
                                                    id="floatingInput"
                                                    placeholder="name@example.com"
                                                    readOnly
                                                    value={data?.Service.nameService || ''}
                                                />
                                                <label htmlFor="floatingInput">Chuyên môn</label>
                                            </div>
                                        </div>

                                    </div>
                                    <button className="btn btn-primary" style={{ width: 150 }} onClick={() => editProfile()}>Cập nhật</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div >
    );
}

export default EditProfileRepairer;