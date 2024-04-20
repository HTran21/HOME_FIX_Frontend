import styles from "./DetailRepair.module.scss";
import classNames from 'classnames/bind';
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faClock, faEllipsisVertical, faPaperPlane, faPenToSquare, faStar, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Flex, Progress, Rate, Modal } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import axios from '../../../service/customize_axios';
import { Dropdown, Space } from 'antd';

const cx = classNames.bind(styles);

function DetailRepair() {

    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user);
    const location = useLocation();
    const url = location.pathname;
    const { id } = useParams();
    const [data, setData] = useState();
    const [listService, setListService] = useState();
    const [idUser, setIdUser] = useState();
    const [content, setContent] = useState("");
    const [rate, setRate] = useState(0);
    const [listComment, setListComment] = useState();
    const [pointEvaluate, setPointEvaluate] = useState();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
        navigate("/login")
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const fetchService = () => {
        axios.get("http://localhost:3000/service/getService")
            .then(res => {
                setListService(res.data.listService);
            })
            .catch(error => {
                console.error("Error fetching service data:", error);
            });
    };
    const fetchData = () => {
        axios.get("http://localhost:3000/service/detail/" + id)
            .then(res => {
                if (res.data.success) {
                    setData(res.data.detailService)
                } else {
                    toast.error(res.data.message)
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const fetchComment = () => {
        axios.get("http://localhost:3000/comment", {
            params: {
                ID_Service: id
            }
        })
            .then(res => {
                if (res.data.success) {
                    setListComment(res.data.listComment)
                    setPointEvaluate(res.data.evaluate)
                    // console.log(res.data)
                }
            })
    }

    useEffect(() => {
        fetchService();
        fetchData();
        fetchComment();
        window.scrollTo(0, 0);
    }, [id]);



    const uploadComment = () => {
        if (user && user.id) {
            // setIdUser(user.id)
            let ID_User = user.id
            if (content.trim() === '') {
                toast.warn("Vui lòng nhập bình luận")
            } else {
                axios.post("http://localhost:3000/comment/", { id, ID_User, content, rate })
                    .then(res => {
                        if (res.data.success) {
                            fetchComment();
                            setContent("")
                            setRate(0)
                        } else {
                            toast.error(res.data.message)
                        }
                    })
            }
        }
        else {
            setIsModalOpen(true)
        }
    }
    const handleKeyDown = (e) => {
        if (e.key == "Enter") {
            uploadComment()
        }
    }

    const [contentEdit, setContentEdit] = useState('');
    const [rateEdit, setRateEdit] = useState();
    const [record, setRecord] = useState();

    const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
    const showModalEdit = (comment) => {
        setIsModalOpenEdit(true);
        setContentEdit(comment.content)
        setRateEdit(comment.rate)
        setRecord(comment)
    };
    const handleCancelEdit = () => {
        setIsModalOpenEdit(false);
        setContentEdit("")
        setRateEdit(0)

    };
    const handleOkEdit = (id) => {
        setIsModalOpenEdit(false);
        axios.put("http://localhost:3000/comment", { id, contentEdit, rateEdit })
            .then(res => {
                if (res.data.success) {
                    handleCancelEdit()
                    fetchComment();
                } else {
                    toast.error(res.data.message)
                }
            })
    };

    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const showModalDelete = (comment) => {
        setIsModalOpenDelete(true);
        setRecord(comment)
    };
    const handleCancelDelete = () => {
        setIsModalOpenDelete(false);
        setRecord("")
    };
    const handleOkDelete = (id) => {
        setIsModalOpenDelete(false);
        axios.delete("http://localhost:3000/comment", {
            params: {
                ID_Comment: id
            }
        })
            .then(res => {
                if (res.data.success) {
                    handleCancelDelete()
                    fetchComment();
                } else {
                    toast.error(res.data.message)
                }
            })
    };

    return (
        <>
            <div className="container mt-4">
                <div className={cx("titleDetail")} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h1 className={`d-inline ${cx("title")}`}>{data?.nameService}</h1>
                    <span className="h1 fw-bold" style={{ display: 'flex', alignItems: 'center' }}>
                        <img className={cx("imgLogo")} src="../image/logo/logo8.png" alt="" />
                        <p className={cx("textLogo")}>HOME FIX</p>
                    </span>
                </div>
                <div className="containerDetail">
                    <div className="row mb-3">
                        <div className="col-md-8">
                            <div className={cx("leftContent")} dangerouslySetInnerHTML={{ __html: data?.contentHTML }}>
                            </div>
                            <div className={cx("layoutComment")}>
                                <h5>Đánh giá và nhận xét của {data?.nameService}</h5>
                                <div className={cx("ratingService")}>
                                    <div className={cx("startRating")}>
                                        <div className={cx("pointRating")}>
                                            {pointEvaluate?.pointEvaluate.toFixed(1)}
                                        </div>
                                        <Rate disabled className={cx("start")} allowHalf value={pointEvaluate?.pointEvaluate} />
                                    </div>
                                    <div className={cx("overviewRating")}>
                                        <Flex gap="small" vertical >
                                            <div className={cx("progessRating")}>
                                                <p>5 <FontAwesomeIcon icon={faStar} /></p><Progress strokeColor={"orange"} percent={((pointEvaluate?.fiveStart / pointEvaluate?.totalComments) * 100).toFixed(1)} size="small" status="normal" />
                                            </div>
                                            <div className={cx("progessRating")}>
                                                <p>4 <FontAwesomeIcon icon={faStar} /></p><Progress strokeColor={"orange"} percent={((pointEvaluate?.fourStart / pointEvaluate?.totalComments) * 100).toFixed(1)} size="small" status="normal" />
                                            </div>
                                            <div className={cx("progessRating")}>
                                                <p>3 <FontAwesomeIcon icon={faStar} /></p><Progress strokeColor={"orange"} percent={((pointEvaluate?.threeStart / pointEvaluate?.totalComments) * 100).toFixed(1)} size="small" status="normal" />
                                            </div>
                                            <div className={cx("progessRating")}>
                                                <p>2 <FontAwesomeIcon icon={faStar} /></p><Progress strokeColor={"orange"} percent={((pointEvaluate?.twoStart / pointEvaluate?.totalComments) * 100).toFixed(1)} size="small" status="normal" />
                                            </div>
                                            <div className={cx("progessRating")}>
                                                <p>1 <FontAwesomeIcon icon={faStar} /></p><Progress strokeColor={"orange"} percent={((pointEvaluate?.oneStart / pointEvaluate?.totalComments) * 100).toFixed(1)} size="small" status="normal" />
                                            </div>

                                        </Flex>
                                    </div>
                                </div>
                                <div className={cx("listComment")}>
                                    {listComment?.map((comment, index) => (
                                        <div key={index} className={cx("layoutDetailComment")}>
                                            <div className={cx("nameUserComment")}>
                                                {comment.User.username}
                                                <Dropdown
                                                    menu={
                                                        {
                                                            items: [{
                                                                key: '0',
                                                                label: (
                                                                    <div onClick={() => showModalEdit(comment)}><FontAwesomeIcon icon={faPenToSquare} style={{ color: "#006bbd", }} /> Sửa</div>
                                                                ),
                                                            },
                                                            {
                                                                key: '1',
                                                                label: (
                                                                    <div onClick={() => showModalDelete(comment)}><FontAwesomeIcon icon={faTrash} style={{ color: "#d10000", }} /> Xóa</div>
                                                                ),
                                                            },]
                                                        }
                                                    }
                                                    trigger={['click']}
                                                >
                                                    <div onClick={(e) => e.preventDefault()} className={`${cx("iconMore")} ${comment.ID_User === user?.id ? '' : 'd-none'}`}>
                                                        <FontAwesomeIcon icon={faEllipsisVertical} />
                                                    </div>


                                                </Dropdown>

                                            </div>
                                            <div className="pointUserRating mt-2 mb-2">
                                                <Rate style={{ color: 'orange', fontSize: "15px" }} disabled value={comment.rate} />
                                            </div>
                                            <div className={cx("comment")}>
                                                {comment.content}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className={cx("uploadTextContact")}>
                                    <div className={cx("groupInput")}>
                                        <input type="text" name="" id="" value={content} onChange={(e) => setContent(e.target.value)}
                                            onKeyDown={(e) => handleKeyDown(e)} placeholder="Nhập bình luận" />
                                        <div className={cx("iconSend")} onClick={() => uploadComment()}>
                                            <FontAwesomeIcon icon={faPaperPlane} />
                                        </div>
                                    </div>
                                    <Rate value={rate} onChange={(value) => setRate(value)} style={{ color: "orange", marginTop: "5px", fontSize: "15px" }} />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className={cx("rightContent")}>
                                <div className={cx("listService")}>
                                    <div className={cx("titleList")}>Dịch vụ của HOME FIX</div>
                                    <ul className={cx("listNameService")}>
                                        {listService?.map((service, i) => (
                                            <Link className={`text-decoration-none`} to={`/service/detail/${service.id}`} key={i}>
                                                <li className={cx("nameService", { active: service.id == id })}>{service.nameService} <FontAwesomeIcon className={cx("iconNameService")} icon={faArrowRight} /></li>
                                            </Link>


                                        ))}

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <Modal title="Vui lòng đăng nhập" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText="Đăng nhập" cancelText="Đóng">
                <p>Vui lòng đăng nhập để đánh giá.</p>
            </Modal>
            <Modal title="Chỉnh sửa bình luận" open={isModalOpenEdit} onOk={() => handleOkEdit(record?.id)} onCancel={handleCancelEdit}>
                <div className="form-floating mb-3">
                    <input
                        type="email"
                        className="form-control"
                        id="floatingInput"
                        placeholder="name@example.com"
                        value={contentEdit} onChange={(e) => setContentEdit(e.target.value)} autoComplete="off"
                    />
                    <label htmlFor="floatingInput">Bình luận</label>
                </div>

                <div>
                    <Rate value={rateEdit} onChange={(value) => setRateEdit(value)} style={{ color: "orange", marginTop: "5px", fontSize: "15px" }} />
                </div>
            </Modal>
            <Modal title="Xóa bình luận" open={isModalOpenDelete} onOk={() => handleOkDelete(record?.id)} onCancel={handleCancelDelete} okText="Xoá" okButtonProps={{ style: { backgroundColor: "red" } }} cancelText="Đóng">
                <p>Bạn chắc chắn muốn xóa bình luận.</p>
            </Modal>
        </>
    );
}

export default DetailRepair;