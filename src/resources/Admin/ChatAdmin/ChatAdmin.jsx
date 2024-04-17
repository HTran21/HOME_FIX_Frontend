import axios from "../../../service/customize_axios";
import { useEffect, useState, useRef } from "react";
import className from "classnames/bind";
import styles from "./ChatAdmin.module.scss";
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


function ChatAdmin() {

    const messagesEndRef = useRef(null);

    const user = useSelector((state) => state.user.user);
    const [senderId, setSenderId] = useState();
    const [senderType, setSenderType] = useState();
    const [text, setText] = useState('');
    const [listMessage, setListMessage] = useState([])
    const [lisetUserChat, setListUserChat] = useState([])
    const [checkRoom, setCheckRoom] = useState();
    const [nameUserChat, setNameUserChat] = useState();
    const [avatarUserChat, setAvatarUserChat] = useState();
    const [newMessage, setNewMessage] = useState(false);

    const getListRoomOfAdmin = async () => {
        const res = await axios.get("http://localhost:3000/message/listRoomOfAdmin")
        if (res.data) {
            setListUserChat(res.data.room)
            // console.log("Data", res.data)
        }
    }
    useEffect(() => {
        setSenderId(user?.id)
        setSenderType(user?.role)
        getListRoomOfAdmin()
    }, [user])

    const handleRoomMessageUser = async (data) => {
        let room = data.id;
        setCheckRoom(data.id);
        setNameUserChat(data.User.username)
        setAvatarUserChat(data.User.avatar)
        socket.emit("join_room_admin", { room })
        axios.get("http://localhost:3000/message/listMessage", {
            params: {
                ID_Room: room
            }
        })
            .then(res => {
                // console.log(res.data.listMessage)
                setListMessage(res.data.listMessage)
            })
    }

    // const joinRoom = () => {
    //     if (senderId !== '') {
    //         socket.emit("join_room", { senderId })
    //     }
    // }



    const sendMessage = () => {
        // const room = localStorage.getItem("room");
        // const room = listMessage[0].id
        // console.log("Admin room", room)
        let room = checkRoom;
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
            axios.post("http://localhost:3000/message/create", { room, senderId, senderType, text })
                .then(res => {
                    if (res.data.success) {
                        // console.log("tao tin nhan admin", res.data)
                        axios.get("http://localhost:3000/message/listMessage", {
                            params: {
                                ID_Room: room
                            }
                        })
                            .then(res => {
                                // console.log(res.data.listMessage)
                                setListMessage(res.data.listMessage)
                                socket.emit("send_message", { text, room: +checkRoom, senderId: user?.id })
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

        socket.on("update_admin_room_list", () => {
            getListRoomOfAdmin();
        });

        // socket.on("room_created", (room) => {
        //     console.log(room)
        // })

        socket.on("receive_message", async (data) => {
            // console.log("Khi nguoi dung nhan toi admin", data)
            if (data) {
                axios.get("http://localhost:3000/message/listMessage", {
                    params: {
                        ID_Room: data?.room
                    }
                })
                    .then(res => {
                        // console.log("Danh sach tin nhan khi nhan Admin", res.data.listMessage)
                        setListMessage(res.data.listMessage)
                    })
            }
        })

    }, [socket])

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [listMessage]);

    return (
        <div className={cx("containerPage")} style={{ backgroundColor: "#F5F5F5" }}>
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
                            {
                                lisetUserChat?.map((item, index) => (
                                    <div key={index}>
                                        <div className={cx("userContact", { active: item.id === checkRoom })} onClick={() => handleRoomMessageUser(item)}>
                                            <img src={`http://localhost:3000/${item.User.avatar}`} alt="" />
                                            <p className="fw-bold">{item.User.username}</p>
                                            <div className={`${cx("notificationMess")} ${newMessage ? '' : 'd-none'}`}>

                                            </div>
                                        </div>
                                        <hr className="m-0" />
                                    </div>
                                ))
                            }


                        </div>
                    </div>
                </div>
                <div className="col-lg-9 col-md-8 col-sm-12">
                    {checkRoom ? (
                        <div className={cx("messageContact")}>
                            <div className={cx("titleContentContact")}>
                                <div className={cx("userContact")}>
                                    {avatarUserChat &&
                                        <img src={`http://localhost:3000/${avatarUserChat}`} alt="" />}
                                    {nameUserChat && <p>{nameUserChat}</p>}
                                </div>
                                <FontAwesomeIcon className={cx("iconMore")} icon={faEllipsisVertical} />
                            </div>
                            {/* <hr className="m-0" /> */}
                            <div className={cx("contentContact")}>
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
                                                                <img src={"../public/User/profileSupport.png"} alt="" />
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <div className={cx("messageImage")}>
                                                                <img src={`http://localhost:3000/${avatarUserChat}`} alt="" />
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
                                    <input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => handleKeyDown(e)} type="text" name="" id="" placeholder="Viết tin nhắn..." />
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

export default ChatAdmin;