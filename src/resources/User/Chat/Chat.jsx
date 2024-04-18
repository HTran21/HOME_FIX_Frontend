import axios from "../../../service/customize_axios";
import { useEffect, useState, useRef } from "react";
import className from "classnames/bind";
import styles from "./Chat.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Tabs, Space, Table, Tag, Drawer, Modal } from 'antd';
import { faChevronRight, faCircleCheck, faCircleUser, faClockRotateLeft, faDesktop, faEllipsisVertical, faPaperPlane, faPenToSquare, faScrewdriverWrench, faTrash, faTrashCan, faWallet } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from 'moment';
import { toast } from "react-toastify";
const cx = className.bind(styles);

import { io } from "socket.io-client";

const socket = io.connect("http://localhost:3000", {
    transports: ["websocket"],
});


function Chat() {

    const messagesEndRef = useRef(null);

    const user = useSelector((state) => state.user.user);
    const [senderId, setSenderId] = useState();
    const [senderType, setSenderType] = useState();
    const [text, setText] = useState('');
    const [listMessage, setListMessage] = useState([])
    const [checkRoom, setCheckRoom] = useState();
    const [newMessageRoom, setNewMessageRoom] = useState();
    const [newMessage, setNewMessage] = useState(false);

    // const getListRoomOfUser = async () => {
    //     const res = await axios.get("http://localhost:3000/message/listRoomOfUser", {
    //         params: {
    //             userOne: user.id
    //         }
    //     })
    //     if (res.data) {
    //         setListMessage(res.data.room)
    //         console.log("Data", res.data.room)
    //     }
    // }
    useEffect(() => {
        setSenderId(user?.id)
        setSenderType(user?.role)
        // getListRoomOfUser()
    }, [user])



    const joinRoom = () => {
        if (senderId !== '') {
            socket.emit("join_room", { senderId })
        }
    }





    const sendMessage = () => {
        const room = localStorage.getItem("room");
        if (!room) {
            toast.warn("Vui lòng chọn đoạn chat");
        }
        else if (!senderId) {
            toast.warn("Người dùng chưa đăng nhập")
        }
        else if (text.trim() === '') {
            toast.warn("Vui lòng nhập tin nhắn")
        }
        else {

            // console.log("room", room)
            // console.log("ID_User", senderId)
            // console.log("senderType", user.role)
            // console.log("text", text)
            axios.post("http://localhost:3000/message/create", { room, senderId, senderType, text })
                .then(res => {
                    if (res.data.success) {
                        // console.log("tao tin nhan", res.data)
                        axios.get("http://localhost:3000/message/listMessage", {
                            params: {
                                ID_Room: room
                            }
                        })
                            .then(res => {
                                // console.log(res.data.listMessage)
                                setListMessage(res.data.listMessage)
                                socket.emit("send_message", { text, room: +room, senderId: user?.id })
                                setText("")
                            })
                    }
                })


        }


    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            setText(e.target.value)
            sendMessage();
        }
    };
    useEffect(() => {
        socket.on("room_created", (room) => {
            setCheckRoom(room)
            localStorage.setItem("room", room)
            console.log("Set id Room", room)
            axios.get("http://localhost:3000/message/listMessage", {
                params: {
                    ID_Room: room
                }
            })
                .then(res => {
                    // console.log(res.data.listMessage)
                    setListMessage(res.data.listMessage)
                })
        })

        socket.on("receive_message", async (data) => {
            // console.log(data)
            if (data) {
                axios.get("http://localhost:3000/message/listMessage", {
                    params: {
                        ID_Room: data?.room
                    }
                })
                    .then(res => {
                        // console.log("Danh sach tin nhan khi nhan", res.data.listMessage)
                        setListMessage(res.data.listMessage)
                    })
            }
            setNewMessage(true)
        })

    }, [socket])

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [listMessage]);

    const handleInputFocus = () => {
        setNewMessage(false);
    }


    return (
        <div className={cx("containerPage")}>
            <div className="contentPage row">
                <div className="col-lg-3 col-md-4 col-sm-12">
                    <div className={cx("peopleContact")}>
                        <div className="p-3">
                            {/* <input
                                type="email"
                                className="form-control"
                                id="exampleFormControlInput1"
                                placeholder="Search..."
                            /> */}
                            <h4>Đoạn chat</h4>

                        </div>

                        <div className={cx("listContact")}>
                            <div className={cx("userContact", { active: checkRoom })}
                                onClick={() => joinRoom()}>
                                <img src="../public/User/profileSupport.png" alt="" />
                                <p className="fw-bold">Home Fix</p>
                                <div className={`${cx("notificationMess")} ${newMessage ? '' : 'd-none'}`}></div>
                            </div>
                            <hr className="m-0" />


                        </div>
                    </div>
                </div>
                <div className="col-lg-9 col-md-8 col-sm-12">
                    {checkRoom ? (
                        <div className={`${cx("messageContact")}`}>
                            <div className={cx("titleContentContact")}>
                                <div className={cx("userContact")}>
                                    <img src="../public/User/profileSupport.png" alt="" />
                                    <p>Home Fix  <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#0091ff", }} /></p>

                                </div>
                                <FontAwesomeIcon className={cx("iconMore")} icon={faEllipsisVertical} />
                            </div>
                            {/* <hr className="m-0" /> */}
                            <div className={`${cx("contentContact")}`}>
                                <div className={cx("listText")}>
                                    {
                                        listMessage?.map((message, index) =>

                                            <div key={index} className={cx(`${(message?.senderID == user?.id && message?.senderType == user?.role) ? 'messageTextOwner' : 'messageText'}`)}>
                                                <div className={cx("layoutMessage")}>

                                                    {(message?.senderID == user?.id && message?.senderType == user?.role) ? (
                                                        <>
                                                            <div className={cx("timeMessage")}>{moment(message.createdAt).format('HH:mm')}</div>
                                                            <p className={cx("text")}>{message.text}</p>
                                                            <div className={cx("messageImage")}>
                                                                <img src={`http://localhost:3000/${user.avatar}`} alt="" />
                                                            </div>


                                                        </>
                                                    ) : (
                                                        <>
                                                            <div className={cx("messageImage")}>
                                                                <img src={"../public/User/profileSupport.png"} alt="" />
                                                            </div>
                                                            <p className={cx("text")}>{message.text}</p>
                                                            <div className={cx("timeMessage")}>{moment(message.createdAt).format('HH:mm')}</div>
                                                        </>
                                                    )}

                                                </div>


                                            </div>

                                        )
                                    }
                                    <div ref={messagesEndRef} />

                                </div>
                            </div>
                            {/* <hr className="m-0" /> */}
                            <div className={cx("uploadTextContact")}>
                                <div className={cx("groupInput")}>
                                    <input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => handleKeyDown(e)}
                                        onFocus={handleInputFocus} type="text" name="" id="" placeholder="Viết tin nhắn..." />
                                    <div className={cx("iconSend")} onClick={() => sendMessage()}>
                                        <FontAwesomeIcon icon={faPaperPlane} />
                                    </div>
                                </div>
                            </div>
                        </div>

                    ) : (
                        <div className={cx("chooseContact")}>
                            <img className={cx("imgaeContact")} src="../illustration/chat.png" alt="" />
                            <p>Vui lòng chọn phòng chat để được hỗ trợ</p>
                        </div>
                    )}


                </div>
            </div>
        </div >
    );
}

export default Chat;