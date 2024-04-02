import classNames from "classnames/bind";
import styles from "./Forbidden.module.scss";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function Forbidden() {
    console.log("Da di qua Forbidden")
    return (
        <>
            <div className={`container ${cx("pageNotFound")}`}>
                <div className={cx("titlePage")}>403</div>
                <div className={cx("desPage")}>Bạn không có quyền truy cập vào trang web này</div>
                <button className={cx("btnBackHome")}>
                    {/* <Link className="text-decoration-none text-light" to="/">Về trang chủ</Link> */}
                    <a href="/" className="text-decoration-none text-light">Về trang chủ</a>
                </button>
                {/* <Link className={cx("btnBackHome")} to="/">Về trang chủ</Link> */}


            </div>
        </>
    );
}

export default Forbidden;