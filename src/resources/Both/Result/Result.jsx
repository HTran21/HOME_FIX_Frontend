import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Result.module.scss";
import classNames from 'classnames/bind';
import { faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useSearchParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import qs from 'qs';
import { toast } from "react-toastify";
import { Button } from "antd";
const cx = classNames.bind(styles);

function Result() {

    const [searchParams] = useSearchParams();
    const [data, setData] = useState();

    const vnp_TmnCode = searchParams.get("vnp_TmnCode");
    const vnp_Amount = searchParams.get("vnp_Amount");
    const vnp_BankCode = searchParams.get("vnp_BankCode");
    const vnp_BankTranNo = searchParams.get("vnp_BankTranNo");
    const vnp_CardType = searchParams.get("vnp_CardType");
    const vnp_OrderInfo = searchParams.get("vnp_OrderInfo");
    const vnp_PayDate = searchParams.get("vnp_PayDate");
    const vnp_ResponseCode = searchParams.get("vnp_ResponseCode");
    const vnp_TransactionNo = searchParams.get("vnp_TransactionNo");
    const vnp_TransactionStatus = searchParams.get("vnp_TransactionStatus");
    const vnp_TxnRef = searchParams.get("vnp_TxnRef");
    const vnp_SecureHash = searchParams.get("vnp_SecureHash");

    var signData = qs.stringify(
        {
            vnp_TmnCode,
            vnp_Amount,
            vnp_BankCode,
            vnp_BankTranNo,
            vnp_CardType,
            vnp_OrderInfo,
            vnp_PayDate,
            vnp_ResponseCode,
            vnp_TransactionNo,
            vnp_TransactionStatus,
            vnp_TxnRef,
            vnp_SecureHash
        },
        { encode: false }
    )



    useEffect(() => {
        axios.get(`http://localhost:3000/payment/vnpay/vnpay_return?${signData}`)
            .then(res => {
                if (res.data.success && res.data.payment) {
                    toast.success(res.data.message)
                    setData(res.data.data)
                } else {
                    toast.error("Thanh toán thất bại")
                }
            })
    }, [])


    return (
        <>
            <div className="container">
                {data ? (
                    <div>
                        <div className={cx("iconSuccess")}>
                            <FontAwesomeIcon className={cx("iconS")} icon={faCircleCheck} />
                        </div>
                        <div className={cx("contentPage")}>
                            <h3 >BẠN ĐÃ THANH TOÁN THÀNH CÔNG</h3>
                            <h4>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi</h4>
                            <p style={{ fontSize: "16px" }}> Mã chi tiết sửa chữa: {data?.id} | Số tiền: {data?.totalAmount} đ | Ngày sửa: {data?.createdAt} | Thời gian sửa chữa: {data?.timeRepair}</p>
                            <Link ><Button type="primary" className="me-3 mt-3">Xem chi tiết đơn</Button></Link>
                            <Link to={"/"}> <Button type="primary">Về trang chủ</Button></Link>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className={cx("iconError")}>
                            <FontAwesomeIcon className={cx("iconE")} icon={faCircleXmark} />
                        </div>
                        <div className={cx("contentPage")}>
                            <h3 >THANH TOÁN KHÔNG THÀNH CÔNG</h3>
                            <h4>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi</h4>
                            <Link ><Button type="primary" className="me-3 mt-3">Xem chi tiết đơn</Button></Link>
                            <Link to={"/"}> <Button type="primary">Về trang chủ</Button></Link>
                        </div>
                    </div>
                )}

            </div>
        </>
    );
}

export default Result;