import axios from "../../../service/customize_axios";
import { useEffect, useState } from "react";
import className from "classnames/bind";
import styles from "./EditProfile.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Tabs, Space, Table, Tag } from 'antd';
import { faChevronRight, faCloudArrowUp, faPenToSquare, faTrash, faTriangleExclamation, faUpload } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
const cx = className.bind(styles);

function EditProfile() {

    const [data, setData] = useState();
    const [imageShow, setImageShow] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [warnEmail, setWarnEmail] = useState("");
    const [initialEmail, setInitialEmail] = useState("");

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

    useEffect(() => {
        fetchProfile();
    }, [])
    return (
        <div className="containerPage">
            <div className="contentPage">
                <section style={{ backgroundColor: "#eee" }}>
                    <div className="container mt-2">
                        <div className="row">
                            <div className="col-lg-4">
                                <div className="card mb-4">
                                    <div className="card-body text-center">
                                        <img
                                            src={imageShow}
                                            alt="avatar"
                                            className="rounded-circle img-fluid"
                                            style={{ width: 140, height: 140 }}
                                        />
                                        <h5 className="my-3 mb-1">{username}</h5>
                                        <input type="file" name="imgProfile" id="imgProfile"
                                            onChange={(e) => {
                                                if (e.target.files && e.target.files[0]) {
                                                    setImageShow(URL.createObjectURL(e.target.files[0]))
                                                }
                                            }}
                                            className="d-none" />
                                        <label className={cx("btnUploadImage")} htmlFor="imgProfile" ><FontAwesomeIcon icon={faCloudArrowUp} /> Chọn ảnh</label>

                                    </div>
                                </div>

                            </div>
                            <div className="col-lg-8">
                                <div className="card mb-4">
                                    <div className="card-body pb-4">
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className={cx("textProfile")}>Họ tên</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <input type="text" className={cx("inputForm")} value={username || ""} onChange={(e) => setUsername(e.target.value)} name="" id="" />
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className={cx("textProfile")}>Email</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <input type="text" className={cx("inputForm")} value={email || ""}
                                                    onChange={(e) => changeEmail(e)} name="" id="" spellCheck="false" />
                                                {email !== data?.email && warnEmail && <p className={cx("warningText")}>
                                                    <FontAwesomeIcon icon={faTriangleExclamation} style={{ color: "#e6bf33", marginRight: "10px" }} /> {warnEmail}</p>}

                                            </div>

                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className={cx("textProfile")}>Số điện thoại</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <input type="text" className={cx("inputForm")} value={phone || ""} onChange={(e) => setPhone(e.target.value)} name="" id="" />
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className={cx("textProfile")}>Địa chỉ</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <input type="text" className={cx("inputForm")} value={address || ""} onChange={(e) => setAddress(e.target.value)} name="" id="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <button className={cx("btnSave")}>Cập nhật</button>
                    </div>
                </section>


            </div >
        </div >
    );
}

export default EditProfile;