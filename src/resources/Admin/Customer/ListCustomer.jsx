import className from "classnames/bind";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faEye, faEyeSlash, faImage, faLock, faMagnifyingGlass, faPenToSquare, faPhone, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";

import styles from "./ListCustomer.module.scss";
import { Link } from "react-router-dom";
import axios from '../../../service/customize_axios';
import { toast } from "react-toastify";

import {
    FilterOutlined,
    SearchOutlined,
    MoreOutlined,
    EditOutlined,
    DeleteOutlined
} from '@ant-design/icons';

import { Modal, Table, Space, Tag } from 'antd';

const cx = className.bind(styles);


function ListCustomer() {

    const [data, setData] = useState();


    const fetchData = () => {
        axios.get("http://localhost:3000/admin/getCustomer")
            .then(res => {
                setData(res.data.listCustomer)
                console.log(res.data)
            })
            .catch((error) => console.log(error));
    }

    useEffect(() => {
        fetchData();
    }, [])

    const columns = [
        {
            title: 'STT',
            dataIndex: 'id',
            key: 'id',
            render: (text, object, index) => { return index + 1 },
            align: 'center',
        },
        {
            title: 'Họ tên',
            dataIndex: 'username',
            key: 'username',
            align: 'center',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            align: 'center',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
            align: 'center',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            render: (_, { role, index }) => {
                let color = role === '=AD' ? 'blue' : (role === 'RP' ? 'orange' : 'green');


                return (
                    <Tag key={index + 1} style={{ width: "70px", textAlign: "center" }} color={color} >
                        {role}
                    </Tag>

                );
            },
            align: 'center',
            filters: [
                {
                    text: 'Admin',
                    value: 'AD',
                },
                {
                    text: 'Thợ',
                    value: 'RP',
                },
                {
                    text: 'Khách hàng',
                    value: 'KH',
                },
            ],
            onFilter: (value, record) => record.role.indexOf(value) === 0,

        },
        // {
        //     title: 'Action',
        //     key: 'action',
        //     render: (_, record) => (
        //         <div key={record.id}>
        //             <FontAwesomeIcon onClick={() => showModalEdit(record)} icon={faPenToSquare} size="lg" style={{ color: "#106cb2", padding: "3px" }} />
        //             <FontAwesomeIcon onClick={() => showModalDelete(record)} icon={faTrash} style={{ color: "#d12323", padding: "3px" }} />
        //             </div>
        //     ),
        //     align: 'center',
        // },
    ];

    const handleSearch = async (searchTerm) => {
        try {
            if (searchTerm.trim() === '') {
                const res = await axios.get(`http://localhost:3000/admin/getCustomer`)
                setData(res.data.listCustomer)

            }
            else {
                const res = await axios.get(`http://localhost:3000/admin/getCustomer?search=${searchTerm}`)
                setData(res.data.listCustomer);
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch(e.target.value)
        }
    };


    return (
        <>
            <div className={cx("containerPage")}>
                <div className="titlePage">
                    <h4 className="d-inline-block">Danh sách nhân viên</h4>

                </div>
                <div className={cx("contentPage")}>
                    <div className={cx("headerListProducts")}>
                        <div className={cx("searchGroup")}>
                            <div className={cx("searchBorder")}>
                                <input type="text" className={cx("inputSearch")} onKeyDown={handleKeyDown} name="" id="search" placeholder="Tìm kiếm..." autoComplete="off" />
                                <label htmlFor="search" className={cx("iconSearch")}><SearchOutlined /></label>
                            </div>

                        </div>

                    </div>

                    <Table className="mt-4" columns={columns} rowKey="email" dataSource={data} />


                </div>
            </div>

        </>
    );
}

export default ListCustomer;