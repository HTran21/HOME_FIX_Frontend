import { useSelector } from "react-redux";
import styles from "./ProfileRepairer.module.scss";
import classNames from 'classnames/bind';
import axios from '../../../service/customize_axios';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);


function ProfileRepairer() {

    const user = useSelector((state) => state.user.user);
    const id = user?.id;

    const [data, setData] = useState();


    const fetchData = () => {
        axios.get("http://localhost:3000/repair/profile/" + id)
            .then(res => {
                setData(res.data.data.user)
                // console.log("Data", res.data.data.user)
            })
            .catch((error) => console.log(error));

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
                                    style={{ backgroundImage: "url(../imageRepair/backgroundProfileRepair.jpg)", height: 200 }}

                                >
                                    <div
                                        className="ms-4 d-flex flex-column"
                                        style={{ width: 130, marginTop: "70px" }}
                                    >
                                        <img
                                            src={`http://localhost:3000/${user?.avatar}`}
                                            alt="Generic placeholder image"
                                            className="img-fluid img-thumbnail mt-4 mb-2"
                                            style={{ width: 150, zIndex: 1, height: "130px", objectFit: "cover" }}
                                        />
                                        <Link to={"/repairer/profile/edit"} className="btn btn-outline-dark text-decoration-none" data-mdb-ripple-color="dark"
                                            style={{ zIndex: 1 }}>
                                            Edit profile
                                        </Link>

                                    </div>
                                    <div className="ms-3" style={{ marginTop: 150 }}>
                                        <h5>{data?.usernameRepairer}</h5>
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
                                                    type="email"
                                                    className={`form-control ${cx("inputForm")}`}
                                                    id="floatingInput"
                                                    placeholder="name@example.com" readOnly
                                                    value={data?.usernameRepairer || ''}
                                                    onChange={() => { }}
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
                                                    readOnly
                                                    value={data?.emailRepairer || ''} onChange={() => { }}
                                                />
                                                <label htmlFor="floatingInput">Email</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-6 col-md-6 col-sm12">
                                            <div className="form-floating mb-3">
                                                <input
                                                    type="email"
                                                    className={`form-control ${cx("inputForm")}`}
                                                    id="floatingInput"
                                                    placeholder="name@example.com"
                                                    readOnly
                                                    value={data?.phoneRepairer || ''}
                                                />
                                                <label htmlFor="floatingInput">Số điện thoại</label>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm12">
                                            <div className="form-floating mb-3">
                                                <input
                                                    type="email"
                                                    className={`form-control ${cx("inputForm")}`}
                                                    id="floatingInput"
                                                    placeholder="name@example.com"
                                                    readOnly
                                                    value={data?.addressRepairer || ''}
                                                />
                                                <label htmlFor="floatingInput">Địa chỉ</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-6 col-md-6 col-sm12">
                                            <div className="form-floating mb-3">
                                                <input
                                                    type="email"
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



                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div >
    );
}

export default ProfileRepairer;