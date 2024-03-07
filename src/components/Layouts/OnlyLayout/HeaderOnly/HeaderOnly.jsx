import styles from "./HeaderOnly.module.scss";
import classNames from 'classnames/bind';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


const cx = classNames.bind(styles);

function HeaderOnly() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container className="justify-content-center d-flex">
                <Navbar.Brand href="/" >
                    <img className={cx("imgLogo")} src="../image/logo/logo8.png" alt="" />
                    <p className={cx("textLogo")}>HOME FIX</p></Navbar.Brand>
            </Container>
        </Navbar>
    );
}

export default HeaderOnly;