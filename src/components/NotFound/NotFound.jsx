import classNames from "classnames/bind";
import styles from './NotFound.module.scss';

const cx = classNames.bind(styles)

import {
    SearchOutlined,
} from '@ant-design/icons';

function NotFound() {
    return (
        <>
            <div className={cx("notFound")}>
                <div className={cx("iconFound")}>
                    <SearchOutlined />
                </div>
                <p className={cx("textNotFound")}>Không tìm thấy kết quả</p>
            </div>
        </>
    );
}

export default NotFound;