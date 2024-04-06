import { useSelector } from "react-redux";
import styles from "./EditProfileRepairer.module.scss";
import classNames from 'classnames/bind';
import axios from '../../../service/customize_axios';
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);


function EditProfileRepairer() {

    const user = useSelector((state) => state.user.user);
    const id = user?.id;

    const [data, setData] = useState();
    const [imageShow, setImageShow] = useState(`http://localhost:3000/${user?.avatar}`);
    const fetchData = () => {
        axios.get("http://localhost:3000/repair/profile/" + id)
            .then(res => {
                setData(res.data.data.user)
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
                                    style={{ backgroundImage: "url(https://img.freepik.com/free-vector/abstract-technology-particle-background_23-2148426649.jpg?w=900&t=st=1711892962~exp=1711893562~hmac=8d7d2ad0aa9d5071e176aaea5f94045dc5fd7410917053a8b9b7af4ca468e80c)", height: 200 }}

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
                                        <input type="text" name="avatarRepairer" id="avatarRepairer" className="d-none" />
                                        <label htmlFor="avatarRepairer"
                                            className="btn btn-outline-dark"
                                            data-mdb-ripple-color="dark"
                                            style={{ zIndex: 1 }}
                                        >
                                            <FontAwesomeIcon icon={faCloudArrowUp} /> Upload
                                        </label>
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
                                                    placeholder="name@example.com"
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
                                                    value={data?.phoneRepairer || ''}
                                                    onChange={() => { }}
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
                                                    value={data?.addressRepairer || ''}
                                                    onChange={() => { }}
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

export default EditProfileRepairer;