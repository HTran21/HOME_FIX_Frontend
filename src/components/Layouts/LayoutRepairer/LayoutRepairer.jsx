import { Outlet, useNavigate } from "react-router-dom";
import styles from "./LayoutRepairer.module.scss";
import classNames from 'classnames/bind';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button, Drawer, Modal } from 'antd';
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faHouse, faRightFromBracket, faScrewdriverWrench, faToolbox, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AuthenService from "../../../service/AuthService";
import { doLogoutAction } from "../../../redux/reducer/userSlice";

const cx = classNames.bind(styles);
function LayoutRepairer() {

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

    const handleLogout = async () => {
        const res = await AuthenService.logoutApi();
        if (res.status === 200) {
            dispatch(doLogoutAction());
            // toast.success("Đăng xuất thành công");
            navigate("/login");
            console.log("Logout thanh cong")
        }

    };

    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setOpen(false)
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <div className={cx("buttonDrawer")} onClick={showDrawer}>
                        <FontAwesomeIcon icon={faScrewdriverWrench} />
                    </div>

                    <Navbar.Brand href="/">
                        <img className={cx("imgLogo")} src="../../../image/logo/logo8.png" alt="" />
                        <p className={cx("textLogo")}>HOME FIX</p>
                    </Navbar.Brand>

                </Container>
            </Navbar>
            <div>
                <Outlet />
            </div>
            {/* <Drawer title={<span className={cx("titleDrawer")}>MENU</span>}
                closeIcon={null} onClose={onClose} open={open}
                placement="left" width={300}
            >
                <div className={cx("listMenu")}>
                    <div className={cx("item")}><FontAwesomeIcon className={cx("iconItem")} icon={faHouse} /><p className={cx("contentItem")}>Trang chủ</p></div>
                    <div className={cx("item")}><FontAwesomeIcon className={cx("iconItem")} icon={faToolbox} /><p className={cx("contentItem")}>Công việc</p></div>
                    <div className={cx("item")}><FontAwesomeIcon className={cx("iconItem")} icon={faCalendarDays} /><p className={cx("contentItem")}>Lịch làm việc</p></div>
                    <div className={cx("item")}><FontAwesomeIcon className={cx("iconItem")} icon={faUser} /><p className={cx("contentItem")}>Thông tin</p></div>

                    <div className={`${cx("item")} mt-5`}><FontAwesomeIcon className={cx("iconItem")} icon={faRightFromBracket} /><p className={cx("contentItem")}>Đăng xuất</p></div>
                </div>

            </Drawer> */}
            <Drawer title={
                <div className={cx("infoRepairer")}>
                    <img className={cx("avatarProfile")} src={`http://localhost:3000/${user.avatar}`} alt="" />
                    <div className={cx("contentProfile")}>
                        <p className="mt-1">{user.username}</p>
                        <p>{user.position}</p>
                    </div>
                </div>
            }
                closeIcon={null} onClose={onClose} open={open}
                placement="left" width={300}
            >
                <div className={cx("listMenu")}>
                    <Link to={"/repairer"} className="text-decoration-none"><div className={cx("item")} onClick={() => setOpen(false)}>
                        <FontAwesomeIcon className={cx("iconItem")} icon={faHouse} /><p className={cx("contentItem")}>Trang chủ</p></div>
                    </Link>
                    <Link to={"/repairer/work"} className="text-decoration-none" onClick={() => setOpen(false)}>
                        <div className={cx("item")}><FontAwesomeIcon className={cx("iconItem")} icon={faToolbox} /><p className={cx("contentItem")}>Công việc</p></div>
                    </Link>
                    <Link to={"/repairer/calendar"} className="text-decoration-none" onClick={() => setOpen(false)}>
                        <div className={cx("item")}><FontAwesomeIcon className={cx("iconItem")} icon={faCalendarDays} /><p className={cx("contentItem")}>Lịch làm việc</p></div>
                    </Link>
                    <Link to={"/repairer/profile"} className="text-decoration-none" onClick={() => setOpen(false)}>
                        <div className={cx("item")}><FontAwesomeIcon className={cx("iconItem")} icon={faUser} /><p className={cx("contentItem")}>Thông tin</p></div>
                    </Link>

                    <div onClick={() => showModal()} className={`${cx("item")} mt-5`}><FontAwesomeIcon className={cx("iconItem")} icon={faRightFromBracket} /><p className={cx("contentItem")}>Đăng xuất</p></div>



                </div>

            </Drawer>
            <Modal title="Đăng xuất" open={isModalOpen} centered
                onOk={handleLogout} onCancel={handleCancel}
                okButtonProps={{ style: { backgroundColor: "red" } }}
                okText="Đăng xuất"
                cancelText="Đóng"
            >
                Bạn có chắc chắn muốn đăng xuất
            </Modal>
        </>
    );
}

export default LayoutRepairer;