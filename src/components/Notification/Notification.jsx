import { Dropdown, Space, Button } from 'antd';
import className from "classnames/bind";
import styles from "./Notification.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faClipboardList, faHeadset } from "@fortawesome/free-solid-svg-icons";
const cx = className.bind(styles);
function Notification() {
    return (
        <>
            <Dropdown
                menu={{
                    items: [
                        {
                            label: "Lorem ipsum dolor sit",
                            key: 0
                        },
                        {
                            label: "Lorem ipsum dolor sit amet ",
                            key: 1
                        },
                        {
                            label: "Lorem ipsum dolor sit amet cons",
                            key: 2
                        }
                        ,
                        {
                            label: "Lorem ipsum ",
                            key: 3
                        }
                    ]
                }}
                placement="bottom"
                trigger={['click']}
                className={cx("customDropdown")}
            >
                <div className={cx("iconBell")}>
                    <FontAwesomeIcon icon={faBell} />
                </div>
            </Dropdown>
        </>
    );
}

export default Notification;