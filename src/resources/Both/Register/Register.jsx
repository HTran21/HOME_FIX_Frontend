import styles from "./Register.module.scss";
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEye, faLock, faEyeSlash, faEnvelope, faPhone, faImage, faMap, faIdCard } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from '../../../service/customize_axios';
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

function Register() {

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const onChangeIcon = () => {
        setShowPassword(!showPassword);
    }

    const [avatar, setAvatar] = useState();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const [errors, setErrors] = useState({});

    const upload = () => {
        const newErrors = {};

        if (username.trim() === '') {
            newErrors.username = 'Chưa nhập họ tên';
        }


        if (password.trim() === '') {
            newErrors.password = 'Chưa nhập mật khẩu';
        }


        if (email.trim() === '') {
            newErrors.email = 'Chưa nhập email';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email không hợp lệ';
        }

        if (!avatar) {
            newErrors.avatar = 'Chưa chọn hình ảnh';
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
            const formData = new FormData()
            formData.append('avatar', avatar)
            formData.append('username', username)
            formData.append('password', password)
            formData.append('email', email)
            formData.append('phone', phone)
            formData.append('address', address)
            axios.post('http://localhost:3000/register', formData)
                .then(res => {
                    if (res.data.success === false) {
                        toast.error("Tài khoản đã tồn tại")
                    }
                    else {
                        toast.success("Tạo tài khoản thành công")

                        navigate('/login')

                    }

                })
                .catch(err => console.log(err));
        }
        else {

            setErrors(newErrors);
        }
    }



    return (
        <div className="container">
            <section >
                <div className="container mt-4">
                    <div className="row d-flex justify-content-center align-items-center">
                        <div className="col col-xl-10">
                            <div className={`card ${cx("loginForm")}`} >
                                <div className="row g-0">
                                    <div className={`col-md-5 col-lg-5 d-none d-md-block ${cx("leftCardLogin")}`} >
                                        <span className="h1 fw-bold mb-0"><img className={cx("imgLogo")} src="../image/logo/logo8.png" alt="" />
                                            <p className={cx("textLogo")}>HOME FIX</p></span>
                                        <h2>CHÀO MỪNG BẠN ĐẾN VỚI HOMEFIX</h2>
                                        <p className="mt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo earum eligendi error accusantium quos praesentium numquam nesciunt voluptatem iusto enim eius molestias soluta laborum dolor.</p>
                                    </div>
                                    <div className="col-md-7 col-lg-7 d-flex align-items-center">
                                        <div className="card-body p-4 p-lg-4 text-black">
                                            <form action="" encType='multipart/form-data'>
                                                <div className="d-flex align-items-center mb-3 pb-1">

                                                    <span className={cx("titleLogin")}>REGISTER</span>
                                                </div>
                                                <h5
                                                    className=" mb-3 pb-3"
                                                >
                                                    Sign into your account
                                                </h5>
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <div className={cx("groupForm")}>
                                                            <label htmlFor="username" className={cx("iconInputForm")}>
                                                                <FontAwesomeIcon icon={faUser} />
                                                            </label>
                                                            <input type="text" className={cx("inputForm")} name="username" id="username" autoComplete="off" placeholder="Họ tên"
                                                                value={username} onChange={e => setUsername(e.target.value)} />
                                                        </div>
                                                        {errors.username && <p className={cx("errors")}>{errors.username}</p>}

                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className={cx("groupForm2")}>
                                                            <label htmlFor="password" className={cx("iconInputForm2")}>
                                                                <FontAwesomeIcon icon={faLock} />
                                                            </label>
                                                            <input type={showPassword ? 'text' : 'password'} className={cx("inputForm2")} value={password}
                                                                name="password" id="password" onChange={(e) => setPassword(e.target.value)} placeholder="Mật khẩu" />
                                                            <div className={cx("iconEye")} onClick={onChangeIcon}> {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />} </div>
                                                        </div>
                                                        {errors.password && <p className={cx("errors")}>{errors.password}</p>}
                                                    </div>

                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <div className={cx("groupForm")}>
                                                            <label htmlFor="email" className={cx("iconInputForm")}>
                                                                <FontAwesomeIcon icon={faEnvelope} />
                                                            </label>
                                                            <input type="text" className={cx("inputForm")} name="email" id="email" autoComplete="off" placeholder="Email"
                                                                value={email} onChange={(e) => setEmail(e.target.value)} />
                                                        </div>
                                                        {errors.email && <p className={cx("errors")}>{errors.email}</p>}
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className={cx("groupForm")}>
                                                            <label htmlFor="phone" className={cx("iconInputForm")}>
                                                                <FontAwesomeIcon icon={faPhone} />
                                                            </label>
                                                            <input type="text" className={cx("inputForm")} name="phone" id="phone" autoComplete="off" placeholder="Số Điện thoại"
                                                                value={phone} onChange={(e) => setPhone(e.target.value)} />
                                                        </div>
                                                        {errors.phone && <p className={cx("errors")}>{errors.phone}</p>}
                                                    </div>

                                                </div>
                                                <div className={cx("groupForm")}>
                                                    <label htmlFor="image" className={cx("iconInputForm")}>
                                                        <FontAwesomeIcon icon={faImage} />
                                                    </label>
                                                    <input type='file' accept="image/jpeg, image/png, image/jpg" className={`${cx("inputForm2")} pt-1 `} name="avatar"
                                                        onChange={e => setAvatar(e.target.files[0])} placeholder='Avatar' required></input>

                                                </div>
                                                {errors.avatar && <p className={cx("errors")}>{errors.avatar}</p>}

                                                <div className={cx("groupForm3")}>
                                                    <label htmlFor="address" className={cx("iconInputForm3")}>
                                                        <FontAwesomeIcon icon={faMap} />
                                                    </label>
                                                    <textarea className={cx("inputForm3")} name="address" id="address" rows="3" placeholder="Địa chỉ"
                                                        value={address} onChange={(e) => setAddress(e.target.value)}></textarea>
                                                </div>
                                                {errors.address && <p className={cx("errors")}>{errors.address}</p>}




                                                <div className="pt-1 mb-4">
                                                    <button
                                                        className={cx("btnLogin")}
                                                        type="button"
                                                        onClick={upload}
                                                    >
                                                        REGISTER
                                                    </button>
                                                </div>
                                                <p className="m-0" style={{ color: "#393f81" }}>
                                                    Don't have an account?{" "}
                                                    <Link to="/login" className="text-decoration-none">Login here</Link>
                                                </p>
                                            </form>


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                </div >
            </section >

        </div >
    );
}


export default Register;