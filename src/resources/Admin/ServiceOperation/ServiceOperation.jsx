import className from "classnames/bind";
import styles from "./ServiceOperation.module.scss";

const cx = className.bind(styles);

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useEffect, useState } from "react";
import Accordion from 'react-bootstrap/Accordion';

function ServiceOperation() {

    const [data, setData] = useState();
    const fecthData = () => {
        axios.get("http://localhost:3000/service/getAllOperation")
            .then(res => {
                setData(res.data)
            })
            .catch((error) => console.log(error))
    }

    useEffect(() => {
        fecthData();
    }, [])

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

                        {data?.map((item, i) => (
                            <div key={i}>
                                <Accordion>
                                    <Accordion.Item eventKey={i}>
                                        <Accordion.Header style={{ border: '1px solid #CCD3CA', padding: 0 }}>{item.service.nameService}</Accordion.Header>
                                        <Accordion.Body>
                                            <table className="table table-secondary">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">STT</th>
                                                        <th scope="col" style={{ maxWidth: "100px" }}>Tên thao tác</th>
                                                        <th scope="col">Giá thao tác</th>
                                                        <th scope="col">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {(item.operations)?.map((operation, index) => (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td style={{ maxWidth: "100px" }}>{operation.nameOperation}</td>
                                                            <td>{operation.price}</td>
                                                            <td>
                                                                <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#5680c8", marginRight: "10px" }} size="lg" />
                                                                <FontAwesomeIcon icon={faTrash} size="lg" style={{ color: "#d72828", }} />
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>

                            </div>

                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ServiceOperation;