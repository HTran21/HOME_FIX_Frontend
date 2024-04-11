import axios from "../../../service/customize_axios";
import { useEffect, useState } from "react";
import className from "classnames/bind";
import styles from "./Chat.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Tabs, Space, Table, Tag, Drawer, Modal } from 'antd';
import { faChevronRight, faCircleCheck, faCircleUser, faClockRotateLeft, faDesktop, faEllipsisVertical, faPenToSquare, faScrewdriverWrench, faTrash, faTrashCan, faWallet } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from 'moment';
import { toast } from "react-toastify";
const cx = className.bind(styles);

function Chat() {


    return (
        <div className={cx("containerPage")}>
            <div className="contentPage row">
                <div className="col-lg-3 col-md-4 col-sm-12">
                    <div className={cx("peopleContact")}>
                        <div className="p-3">
                            <input
                                type="email"
                                className="form-control"
                                id="exampleFormControlInput1"
                                placeholder="Search..."
                            />

                        </div>

                        <div className={cx("listContact")}>
                            <div className={cx("userContact")}>
                                <img src="https://i.pinimg.com/564x/4c/d1/4b/4cd14b882bbcf6ea1a2068d8be8baaac.jpg" alt="" />
                                <p>Admin</p>
                            </div>
                            <hr className="m-0" />
                            <div className={cx("userContact")}>
                                <img src="https://i.pinimg.com/564x/4c/d1/4b/4cd14b882bbcf6ea1a2068d8be8baaac.jpg" alt="" />
                                <p>Admin</p>
                            </div>
                            <hr className="m-0" />
                            <div className={cx("userContact")}>
                                <img src="https://i.pinimg.com/564x/4c/d1/4b/4cd14b882bbcf6ea1a2068d8be8baaac.jpg" alt="" />
                                <p>Admin</p>
                            </div>
                            <hr className="m-0" />

                        </div>
                    </div>
                </div>
                <div className="col-lg-9 col-md-8 col-sm-12">
                    <div className={cx("messageContact")}>
                        <div className={cx("titleContentContact")}>
                            <div className={cx("userContact")}>
                                <img src="https://i.pinimg.com/564x/4c/d1/4b/4cd14b882bbcf6ea1a2068d8be8baaac.jpg" alt="" />
                                <p>Admin</p>
                            </div>
                            <FontAwesomeIcon className={cx("iconMore")} icon={faEllipsisVertical} />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Chat;