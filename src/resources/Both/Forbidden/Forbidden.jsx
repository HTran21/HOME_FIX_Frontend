import classNames from "classnames/bind";
import styles from "./Forbidden.module.scss";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function Forbidden() {
    return (
        <>
            <div className={`container ${cx("pageNotFound")}`}>
                <div className={cx("titlePage")}>403</div>
                <div className={cx("desPage")}>Bạn không có quyền truy cập vào trang web này</div>
                <button className={cx("btnBackHome")}>
                    <Link className="text-decoration-none text-light" to="/">Về trang chủ</Link>
                </button>

            </div>
        </>
    );
}

export default Forbidden;