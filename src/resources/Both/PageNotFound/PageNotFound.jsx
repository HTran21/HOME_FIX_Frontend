import styles from "./PageNotFound.module.scss";
import classNames from 'classnames/bind';
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function PageNotFound() {
    return (
        <>
            <div className={`container ${cx("pageNotFound")}`}>
                <div className={cx("titlePage")}>404</div>
                <div className={cx("desPage")}>Rất tiếc! Trang bạn yêu cầu không tìm thấy</div>
                <button className={cx("btnBackHome")}>
                    <Link className="text-decoration-none text-light" to="/">Về trang chủ</Link>
                </button>

            </div>
        </>
    );
}

export default PageNotFound;