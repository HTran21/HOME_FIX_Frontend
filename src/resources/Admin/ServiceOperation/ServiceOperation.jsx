import className from "classnames/bind";
import styles from "./ServiceOperation.module.scss";

const cx = className.bind(styles);

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Table } from 'antd';

function ServiceOperation() {

    const columns = [
        {
            title: 'ID',
            dataIndex: 'key',
            key: 'id',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Tên thao tác',
            dataIndex: 'nameOperation',
            key: 'nameOperation',
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <>
                    <FontAwesomeIcon icon={faPenToSquare} size="lg" className="me-2" style={{ color: "#1166a6", }} />
                    <FontAwesomeIcon icon={faTrash} size="lg" style={{ color: "#d30909", }} />
                </>
            ),
        },
    ];

    const data = [
        {
            key: '1',
            nameOperation: 'Đi mới, thay thế nguồn điện',
            price: '150.000đ'
        },
        {
            key: '2',
            nameOperation: 'Lắp quạt treo tường',
            price: '50.000đ'
        },
        {
            key: '3',
            nameOperation: 'Lắp ổ điện',
            price: '150.000đ'
        },
        {
            key: '4',
            nameOperation: 'Sửa điện',
            price: '200.000đ'
        },
        {
            key: '5',
            nameOperation: 'Lắp đặt đèn chùm',
            price: '150.000đ'
        },
    ];

    const data2 = [
        {
            key: '1',
            nameOperation: 'Sửa chữa sự cố ống nước',
            price: '150.000đ'
        },
        {
            key: '2',
            nameOperation: 'Đi đường ông nước',
            price: '50.000đ'
        },
        {
            key: '3',
            nameOperation: 'Chống dột',
            price: '150.000đ'
        },
        {
            key: '4',
            nameOperation: 'Sửa nước',
            price: '200.000đ'
        },
        {
            key: '5',
            nameOperation: 'Thay bộ xả bồn cầu',
            price: '150.000đ'
        },
    ];

    return (
        <>
            <div className={cx("containerPage")}>
                <div className="titleProduct">
                    <h4 className="d-inline-block">Thao tác của dịch vụ</h4>
                </div>
                <div className={cx("contentPage")}>
                    <div className={cx("titleContentService")}>
                        <img src="../public/icon/operation.png" alt="" className={cx("iconTitleContentService")} />
                        <div className={cx("contentTitleContentService")}>
                            <h5>Danh sách các thao tác</h5>
                            <p>Các thao tác của từng dịch vụ.</p>
                        </div>
                    </div>
                    <div className="listOperationService mt-4">
                        <h5 className="mb-2">Dịch vụ điện</h5>
                        <Table columns={columns} dataSource={data} />;

                        <h5 className="mb-2">Dịch vụ nước</h5>
                        <Table columns={columns} dataSource={data2} />;
                    </div>
                </div>
            </div>
        </>
    );
}

export default ServiceOperation;