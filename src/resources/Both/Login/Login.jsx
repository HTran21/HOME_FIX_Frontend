import styles from "./Login.module.scss";
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEye, faLock, faEyeSlash, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function Login() {

    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false);

    const onChangeIcon = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div className="container">
            <section >
                <div className="container">
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
                                                <div className={cx("groupForm")}>
                                                    <label htmlFor="username" className={cx("iconInputForm")}>
                                                        <FontAwesomeIcon icon={faEnvelope} />
                                                    </label>
                                                    <input type="text" className={cx("inputForm")} name="username" id="username" autoComplete="off" placeholder="Email" />
                                                </div>
                                                <div className={cx("groupForm2")}>
                                                    <label htmlFor="password" className={cx("iconInputForm2")}>
                                                        <FontAwesomeIcon icon={faLock} />
                                                    </label>
                                                    <input type={showPassword ? 'text' : 'password'} className={cx("inputForm2")} value={password}
                                                        name="password" id="password" onChange={(e) => setPassword(e.target.value)} placeholder="Mật khẩu" />
                                                    <div className={cx("iconEye")} onClick={onChangeIcon}> {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />} </div>
                                                </div>
                                                <div className="pt-1 mb-4">
                                                    <button
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