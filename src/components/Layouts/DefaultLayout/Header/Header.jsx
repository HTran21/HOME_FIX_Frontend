import styles from "./Header.module.scss";
import classNames from 'classnames/bind';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useLocation, useNavigate } from "react-router-dom";


const cx = classNames.bind(styles);

function Header() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/">
                    <img className={cx("imgLogo")} src="../image/logo/logo8.png" alt="" />
                    <p className={cx("textLogo")}>HOME FIX</p></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-5" style={{ flexWrap: "wrap" }}>
                        <Nav.Link className={cx("navLink")} href="/">Home</Nav.Link>
                        <Nav.Link className={cx("navLink")} href="/service">Service</Nav.Link>
                        <Nav.Link className={cx("navLink")} href="/about">About</Nav.Link>
                        <Nav.Link className={cx("navLink")} href="">Blog</Nav.Link>
                        <Nav.Link className={cx("navLink")} href="">Shop</Nav.Link>
                        <Nav.Link className={cx("navLink")} href="/contact">Contact</Nav.Link>

                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    <Nav.Link className={"text-decoration-none"} href="/login"><button className={cx("btnLogin")}>Login</button></Nav.Link>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;