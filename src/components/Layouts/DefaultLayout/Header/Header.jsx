import styles from "./Header.module.scss";
import classNames from 'classnames/bind';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { doLogoutAction } from "../../../../redux/reducer/userSlice";
import AuthenService from "../../../../service/AuthService";

import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';


const cx = classNames.bind(styles);

function Header() {

    const navigate = useNavigate();

    const location = useLocation();
    const url = location.pathname;

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

    const handleLogout = async () => {
        const res = await AuthenService.logoutApi();
        if (res.status === 200) {
            dispatch(doLogoutAction());
            // toast.success("Đăng xuất thành công");
            navigate("/login");
            // console.log("Logout thanh cong")
            localStorage.removeItem("room")
        }

    };

    const items = [
        {
            label: <Link to={user.role === 'KH' ? '/user' : (user.role === 'RP' ? '/repairer' : '/admin')} className={`${cx("dropdownItem")} text-decoration-none`}>Thông tin cá nhân</Link>,
            key: '0',
        },
        {
            label: <p className={cx("dropdownItem")}>Đăng xuất</p>,
            key: '1',
            onClick: handleLogout,
        }
    ];

    // if (user.role === 'KH') {
    //     items.unshift({
    //         label: <Link to={"/user"} className={`${cx("dropdownItem")} text-decoration-none`}>Thông tin cá nhân</Link>,
    //         key: '0',
    //     });
    // }

    const itemOnly = [
        {
            label: <p className={cx("dropdownItem")}>Đăng xuất</p>,
            key: '0',
            onClick: handleLogout,
        }
    ]

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/">
                    <img className={cx("imgLogo")} src="../image/logo/logo8.png" alt="" />
                    <p className={cx("textLogo")}>HOME FIX</p></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="" style={{ flexWrap: "wrap" }}>
                        <Nav.Link className={`${cx("navLink", { active: url === "/" })}`} href="/">Home</Nav.Link>
                        <Nav.Link className={`${cx("navLink", { active: url.includes("/service") })}`} href="/service">Service</Nav.Link>
                        <Nav.Link className={`${cx("navLink", { active: url.includes("/about") })}`} href="/about">About</Nav.Link>
                        <Nav.Link className={`${cx("navLink", { active: url.includes("/product") })}`} href="/product">Product</Nav.Link>
                        {/* <Nav.Link className={cx("navLink")} href="">Shop</Nav.Link> */}
                        <Nav.Link className={`${cx("navLink", { active: url.includes("/contact") })}`} href="/contact">Contact</Nav.Link>

                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">

                    {isAuthenticated ? (
                        <div className={cx("username")}>Welcome to{" "}
                            <Dropdown
                                menu={
                                    { items, }
                                }
                                trigger={['click']}
                                placement="bottom"
                            >
                                <a onClick={(e) => e.preventDefault()}>
                                    <Space>
                                        {user?.username || ""}
                                        <DownOutlined />
                                    </Space>
                                </a>
                            </Dropdown>
                        </div>
                    ) : (<Nav.Link className={"text-decoration-none"} href="/login"><button className={cx("btnLogin")}>Login</button></Nav.Link>)
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;