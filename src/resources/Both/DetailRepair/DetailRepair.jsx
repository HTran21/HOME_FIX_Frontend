import styles from "./DetailRepair.module.scss";
import classNames from 'classnames/bind';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);



function DetailRepair() {

    const location = useLocation();
    const url = location.pathname;

    return (
        <div className="container mt-5">
            <div className={cx("titleDetail")} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h1 className={`d-inline ${cx("title")}`}>DỊCH VỤ ĐIỆN</h1>
                <span className="h1 fw-bold" style={{ display: 'flex', alignItems: 'center' }}>
                    <img className={cx("imgLogo")} src="../image/logo/logo8.png" alt="" />
                    <p className={cx("textLogo")}>HOME FIX</p>
                </span>
            </div>
            <div className="containerDetail">
                <div className="row mb-3">
                    <div className="col-md-8">
                        <div className={cx("leftContent")}>
                            <img className={cx("imgDetailRepair")} src="../../../../public/DetailRepair/electronic_service.jpeg" alt="" />
                            <h2 className="mb-3">Detail Service</h2>
                            <p>Podcasting operational change management inside of workflows to establish a framework. Taking seamless key performance indicators offline to maximise the long tail. Keeping your eye on the ball while performing a deep dive on the start-up mentality to derive convergence on cross-platform integration. Collaboratively installed base benefits. Dramatically visualize customer-directed convergence without revolutionary ROI.</p>
                            <p> Podcasting operational change management inside of workflows to establish a framework. Taking seamless key performance indicators offline to maximize the long tail.</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className={cx("rightContent")}>
                            <div className={cx("listService")}>
                                <div className={cx("titleList")}>Dịch vụ của HOME FIX</div>
                                <ul className={cx("listNameService")}>
                                    <li className={cx("nameService", { active: url.includes("/detail") })}>Dịch vụ điện <FontAwesomeIcon className={cx("iconNameService")} icon={faArrowRight} /></li>
                                    <li className={cx("nameService")}>Dịch vụ nước <FontAwesomeIcon className={cx("iconNameService")} icon={faArrowRight} /></li>
                                    <li className={cx("nameService")}>Dịch vụ sửa chữa <FontAwesomeIcon className={cx("iconNameService")} icon={faArrowRight} /></li>
                                    <li className={cx("nameService")}>Dịch vụ thay mới <FontAwesomeIcon className={cx("iconNameService")} icon={faArrowRight} /></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailRepair;