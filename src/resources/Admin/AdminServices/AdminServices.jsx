import className from "classnames/bind";
import styles from "./AdminServices.module.scss";
import axios from '../../../service/customize_axios';
import { Link } from "react-router-dom";

const cx = className.bind(styles);

import {
    FilterOutlined,
    SearchOutlined,
    MoreOutlined,
    EditOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import { Dropdown } from 'antd';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faMoneyBill1, faStar, faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faCalendarDay, faUsers, faScrewdriverWrench, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Button, Modal } from 'antd';
import { toast } from "react-toastify";

function AdminServices() {


    const [listService, setListService] = useState();

    const fetchData = () => {
        axios.get("http://localhost:3000/service/getService")
            .then(res => {
                // console.log("list service", res.data.listService)
                setListService(res.data.listService)
            })
    }
    useEffect(() => {
        fetchData();
    }, [])

    const [open, setOpen] = useState(false);
    const [recordView, setRecordView] = useState();
    const hanldeView = (service) => () => {
        setOpen(true);
        setRecordView(service);
    };

    // Modal delete
    const [openDelete, setOpenDelete] = useState(false);
    const [deleteItem, setDeleteItem] = useState();
    const hanldeShowDelete = (service) => () => {
        setOpenDelete(true);
        setDeleteItem(service);
    }

    const handleDelete = (id) => {
        axios.delete('http://localhost:3000/service/deletService/' + id)
            .then(res => {
                if (res.data.success === false) {
                    toast.error(res.data.message)
                    setOpenDelete(false);

                }
                else {
                    toast.success(res.data.message)
                    setOpenDelete(false);
                    fetchData();
                }
            })
    }

    return (
        <>
            <div className={cx("containerPage")}>
                <div className={cx("titleProduct")}>
                    <h4 className="d-inline-block">Danh sách dịch vụ</h4>
                    <div className={cx("buttonAdd")}>
                        <Link to={"/admin/addService"} className="text-decoration-none"><button className={cx("btnAddService")}>Thêm dịch vụ</button></Link>
                    </div>
                </div>
                <div className={cx("contentPage")}>
                    <div className="row">

                        {listService?.map((service, i) =>
                            <div className="col-lg-3 col-md-4 col-sm-6" key={i}>
                                <div className={cx("detailService")}>
                                    <div className="iconMoreService">
                                        <Dropdown className={cx("iconMore")}
                                            menu={{
                                                items: [
                                                    {
                                                        label: <Link to={`/admin/editService/${service?.id}`} className="text-decoration-none"><p><EditOutlined className="pe-2" />Sửa</p></Link>,
                                                        key: '0',
                                                    },
                                                    {
                                                        label: <p onClick={hanldeShowDelete(service)}><DeleteOutlined className="pe-2" />Xóa</p>,
                                                        key: '1',
                                                    },
                                                ]
                                            }}
                                            trigger={['click']}
                                            placement="bottomRight"
                                        >
                                            <a onClick={(e) => e.preventDefault()} >
                                                <MoreOutlined />

                                            </a>
                                        </Dropdown>
                                    </div>
                                    <img className={cx("imageService")} src={`http://localhost:3000/${service.logoService}`} alt="" />
                                    <div className={cx("titleDetailService")}>{service.nameService}</div>
                                    <div className={cx("viewDetailService")} onClick={hanldeView(service)}>
                                        XEM CHI TIẾT<FontAwesomeIcon className={cx("iconDetailService")} icon={faArrowRight} />
                                    </div>
                                </div>
                            </div>


                        )}


                        <Modal
                            title={recordView?.nameService}
                            style={{
                                top: 20,
                            }}

                            centered
                            open={open}
                            onCancel={() => setOpen(false)}
                            okButtonProps={{ style: { display: 'none' } }}
                            width={1000}
                        >
                            <div className={cx("modalDetail")} dangerouslySetInnerHTML={{ __html: recordView?.contentHTML }} />

                        </Modal>

                        {/* Modal delete */}
                        <Modal title="Xóa dịch vụ" open={openDelete}
                            onOk={() => handleDelete(deleteItem?.id)}
                            onCancel={() => setOpenDelete(false)}
                            okButtonProps={{ style: { backgroundColor: 'red' } }} >
                            <p>{deleteItem?.nameService}</p>
                        </Modal>
                    </div>

                </div>
            </div>
        </>
    );
}

export default AdminServices;