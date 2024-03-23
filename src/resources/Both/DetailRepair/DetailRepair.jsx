import styles from "./DetailRepair.module.scss";
import classNames from 'classnames/bind';
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";

const cx = classNames.bind(styles);



function DetailRepair() {

    const location = useLocation();
    const url = location.pathname;
    const { id } = useParams();
    const [data, setData] = useState();
    const [listService, setListService] = useState();

    useEffect(() => {
        fetchService();
        fetchData();
        window.scrollTo(0, 0);
    }, [id]);

    const fetchService = () => {
        axios.get("http://localhost:3000/service/getService")
            .then(res => {
                setListService(res.data.listService);
            })
            .catch(error => {
                console.error("Error fetching service data:", error);
            });
    };
    const fetchData = () => {
        axios.get("http://localhost:3000/service/detail/" + id)
            .then(res => {
                setData(res.data.detailService)
            })
            .catch((error) => {
                console.log(error)
            })
    }



    return (
        <div className="container mt-4">
            <div className={cx("titleDetail")} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h1 className={`d-inline ${cx("title")}`}>{data?.nameService}</h1>
                <span className="h1 fw-bold" style={{ display: 'flex', alignItems: 'center' }}>
                    <img className={cx("imgLogo")} src="../image/logo/logo8.png" alt="" />
                    <p className={cx("textLogo")}>HOME FIX</p>
                </span>
            </div>
            <div className="containerDetail">
                <div className="row mb-3">
                    <div className="col-md-8">
                        <div className={cx("leftContent")} dangerouslySetInnerHTML={{ __html: data?.contentHTML }}>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className={cx("rightContent")}>
                            <div className={cx("listService")}>
                                <div className={cx("titleList")}>Dịch vụ của HOME FIX</div>
                                <ul className={cx("listNameService")}>
                                    {listService?.map((service, i) => (
                                        <Link className={`text-decoration-none`} to={`/detail/${service.id}`} key={i}>
                                            <li className={cx("nameService", { active: service.id == id })}>{service.nameService} <FontAwesomeIcon className={cx("iconNameService")} icon={faArrowRight} /></li>
                                        </Link>


                                    ))}

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default DetailRepair;