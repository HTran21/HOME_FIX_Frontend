import styles from "./Login.module.scss";
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEye, faLock, faEyeSlash, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from '../../../service/customize_axios';
import { doLoginAction } from "../../../redux/reducer/userSlice";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});

    const [email, setEmail] = useState('');

    const onChangeIcon = () => {
        setShowPassword(!showPassword);
    }

    const login = () => {
        const newErrors = {};
        if (email.trim() === '') {
            newErrors.email = 'Vui lòng nhập email';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email không hợp lệ';
        }
        if (password.trim() === '') {
            newErrors.password = 'Vui lòng nhập mật khẩu'
        }
        if (Object.keys(newErrors).length === 0) {
            axios.post('http://localhost:3000/login', { email, password })
                .then(res => {
                    if (res.data.error) {
                        toast.error(res.data.error.message)
                    }
                    else {
                        toast.success("Đăng nhập thành công")
                        // console.log("Role", res.data.data.role)
                        if (res.data.data.role === 'AD') {
                            dispatch(doLoginAction(res.data.data.infoStaff))
                            console.log("Dang nhap voi tu cach admin")
                            navigate("/admin");

                        }
                        else if (res.data.data.role === 'RP') {
                            dispatch(doLoginAction(res.data.data.infoRepairer))
                            console.log("Dang nhap voi tu cach tho")
                            navigate("/repairer");

                        }
                        else {

                            dispatch(doLoginAction(res.data.data.infoUser))
                            console.log("Dang nhap voi tu cach KH")

                            navigate("/");


                        }
                    }
                })
        } else {
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
                                    <div className={`col-md-7 col-lg-7 d-none d-md-block ${cx("leftCardLogin")}`} >
                                        <span className="h1 fw-bold mb-0"><img className={cx("imgLogo")} src="../image/logo/logo8.png" alt="" />
                                            <p className={cx("textLogo")}>HOME FIX</p></span>
                                        <h2>CHÀO MỪNG BẠN ĐẾN VỚI HOMEFIX</h2>
                                        <p className="mt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo earum eligendi error accusantium quos praesentium numquam nesciunt voluptatem iusto enim eius molestias soluta laborum dolor.</p>
                                    </div>
                                    <div className="col-md-5 col-lg-5 d-flex align-items-center">
                                        <div className="card-body p-4 p-lg-5 text-black">
                                            <form>
                                                <div className="d-flex align-items-center mb-3 pb-1">

                                                    <span className={cx("titleLogin")}>LOGIN</span>
                                                </div>
                                                <h5
                                                    className=" mb-3 pb-3"
                                                >
                                                    Sign into your account
                                                </h5>
                                                <div className={`${errors && errors.email ? '' : 'mb-4'}`}>
                                                    <div className={`${cx("groupForm")} ${errors && errors.email ? 'border-danger' : ''}`}>
                                                        <label htmlFor="email" className={cx("iconInputForm")}>
                                                            <FontAwesomeIcon icon={faEnvelope} />
                                                        </label>
                                                        <input type="text" className={cx("inputForm")} name="email" id="email" value={email} onChange={e => setEmail(e.target.value)} autoComplete="off" placeholder="Email" />

                                                    </div>
                                                    {errors && <p className={cx("error")}>{errors.email}</p>}
                                                </div>
                                                <div>

                                                    <div className={`${cx("groupForm2")} ${errors && errors.password ? 'border-danger' : ''}`}>
                                                        <label htmlFor="password" className={cx("iconInputForm2")}>
                                                            <FontAwesomeIcon icon={faLock} />
                                                        </label>
                                                        <input type={showPassword ? 'text' : 'password'} className={cx("inputForm2")} value={password}
                                                            name="password" id="password" onChange={(e) => setPassword(e.target.value)} placeholder="Mật khẩu" />
                                                        <div className={cx("iconEye")} onClick={onChangeIcon}> {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />} </div>

                                                    </div>
                                                    {errors && <p className={cx("error")}>{errors.password}</p>}
                                                </div>

                                                <div className="pt-1 mb-4">
                                                    <button onClick={login}
                                                        className={cx("btnLogin")}
                                                        type="button"
                                                    >
                                                        Login
                                                    </button>
                                                </div>
                                                <a className="small text-muted" href="#!">
                                                    Forgot password?
                                                </a>
                                                <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                                                    Don't have an account?{" "}
                                                    <Link className="text-decoration-none" to="/register">Register here</Link>
                                                </p>
                                                <a href="#!" className="small text-muted">
                                                    Terms of use.
                                                </a>
                                                <a href="#!" className="small text-muted">
                                                    Privacy policy
                                                </a>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >

        </div >
    );
}

export default Login;