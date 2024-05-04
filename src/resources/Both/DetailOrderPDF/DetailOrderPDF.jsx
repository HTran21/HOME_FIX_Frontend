import { Document, Page, Text, View, StyleSheet, Image, Font, PDFViewer } from '@react-pdf/renderer';
import { useLocation, useParams } from 'react-router-dom';
import axios from "../../../service/customize_axios";
import { useEffect, useState } from 'react';
Font.register({
    family: 'ReemKufi',
    fonts: [
        { src: '../font/ReemKufi-Bold.ttf' },

    ]
});
Font.register({
    family: 'Roboto',
    fonts: [
        { src: '../font/Roboto-Medium.ttf' },
        { src: '../font/Roboto-ThinItalic.ttf', fontWeight: 'thin', fontStyle: 'italic' },

    ]
});
function DetailOrderPDF() {

    const { id } = useParams();
    const [data, setData] = useState();
    const featchData = () => {
        axios.get("http://localhost:3000/order/confirmOrder/" + id)
            .then(res => {
                if (res.data.success) {
                    setData(res.data.detailOrder)
                    console.log(res.data.detailOrder)
                }
                else {
                    toast.error(res.data.message)
                }
            })
    }

    useEffect(() => {
        featchData()
    }, [])


    const styles = StyleSheet.create({
        page: {
            padding: '10px 20px'
        },
        border: {
            borderBottom: '1 soild #DDDDDD'
        },
        section: {
            padding: 10,
            backgroundColor: '#E1ECFF',
            borderRadius: 5,
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
        },
        image: {
            width: 30,
            height: 30,
        },
        titleLogo: {
            fontFamily: 'ReemKufi',
            fontSize: 18,
            fontWeight: 'bold',
            marginLeft: 5,
        },
        titleOrder: {
            fontFamily: 'ReemKufi',
            fontSize: 18,
            fontWeight: 'bold',
            marginLeft: 'auto',
        },
        layoutInfor: {
            flexDirection: 'row',
            padding: 10,
            flexGrow: 1,
            lineHeight: 2
        },
        inforUser: {

        },
        inforRepairer: {
            marginLeft: 'auto'
        },
        fontFamily: {
            fontFamily: 'ReemKufi',
            fontSize: 14,
            fontWeight: 'bold'
        },
        titleInfor: {
            fontFamily: 'ReemKufi',
            fontSize: 14,
        },
        row: {
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'row',

        },
        myText: {
            fontFamily: 'Roboto',
            fontSize: 12,
        },
        titleRepair: {
            marginTop: 10,
            padding: 7,
            backgroundColor: '#E1ECFF',
            borderRadius: 5
        },
        table: {
            display: 'flex',
            flexDirection: 'column',
            width: 'auto',
            borderStyle: 'solid',
            borderWidth: 1,
            borderColor: '#bfbfbf',
            marginBottom: 10,
            fontFamily: 'Roboto',
            fontSize: 11,
            marginTop: 10,
        },
        rowTable: {
            flexDirection: 'row',
            borderBottom: "1px soild #E5E1DA"
        },
        cell: {
            padding: 5,
        },
        titleTable: {
            backgroundColor: '#EEEEEE',
            width: 120,
        },
        contentTable: {
        },

        tableNormal: {
            display: 'table',
            width: 'auto',
            borderStyle: 'solid',
            borderWidth: 1,
            borderColor: '#bfbfbf',
            marginBottom: 10,
            fontFamily: 'Roboto',
            fontSize: 11,
            marginTop: 10
        },
        rowNormal: {
            flexDirection: 'row',
            borderBottom: "1px soild #E5E1DA"
        },
        cellNormal: {
            flex: 1,
            padding: 5,
            textAlign: 'center',
            borderLeft: '1px soild #E5E1DA'

        },
        headerCellNormal: {
            backgroundColor: '#EEEEEE',
            textAlign: 'center',
        },
    });

    return (
        <PDFViewer style={{ width: "100%", height: "100vh" }}>
            <Document>
                <Page size="A4" style={styles.page}>
                    <View style={styles.section}>
                        <Image style={styles.image} src="../../image/logo/logo8.png" alt="" />
                        <Text style={styles.titleLogo}>HOMEFIX</Text>
                        <Text style={styles.titleOrder}>ĐƠN SỬA CHỮA</Text>
                    </View>
                    <View style={styles.border}></View>
                    <View style={styles.row}>
                        <View style={styles.layoutInfor}>
                            <View style={styles.inforUser}>
                                <Text style={styles.titleInfor}>
                                    Thông tin sửa chữa
                                </Text>
                                <Text style={styles.myText}>
                                    {data?.fullName}
                                    {console.log('data name', data?.fullName)}
                                </Text>
                                <Text style={styles.myText}>
                                    {data?.email}
                                </Text>
                                <Text style={styles.myText}>
                                    0987654321
                                </Text>
                                <Text style={styles.myText}>
                                    Đường số 1, Phường 2, Quận Ninh Kiều, Thành Phố Cần Thơ
                                </Text>

                            </View>
                        </View>
                        <View style={styles.layoutInfor}>
                            <View style={styles.inforRepairer}>
                                <Text style={styles.titleInfor}>
                                    Thông tin thợ
                                </Text>
                                <Text style={styles.myText}>
                                    Trần Trung Trực
                                </Text>
                                <Text style={styles.myText}>
                                    0987654321
                                </Text>
                                <Text style={styles.myText}>
                                    wilsonwialko35603@gmail.com
                                </Text>


                            </View>
                        </View>
                    </View>
                    <View style={styles.border}></View>
                    <View>
                        <View style={styles.titleRepair}>
                            <View style={styles.row}>
                                <Text style={styles.fontFamily}>Thông tin sửa chữa</Text>
                                <Text style={[styles.fontFamily, { marginLeft: 'auto' }]}>Ngày đăng ký: 20/04/2024</Text>
                            </View>
                        </View>
                        <View style={styles.table}>
                            <View style={styles.rowTable}>
                                <Text style={[styles.cell, styles.titleTable]}>ID Đơn</Text>
                                <Text style={[styles.cell, styles.contentTable]}>1</Text>
                            </View>
                            <View style={styles.rowTable}>
                                <Text style={[styles.cell, styles.titleTable]}>Dịch vụ</Text>
                                <Text style={[styles.cell, styles.contentTable]}>Dịch vụ điện</Text>
                            </View>
                            <View style={styles.rowTable}>
                                <Text style={[styles.cell, styles.titleTable]}>Hãng</Text>
                                <Text style={[styles.cell, styles.contentTable]}>SONY</Text>
                            </View>
                            <View style={styles.rowTable}>
                                <Text style={[styles.cell, styles.titleTable]}>Loại thiết bị</Text>
                                <Text style={[styles.cell, styles.contentTable]}>Tủ lạnh</Text>
                            </View>
                            <View style={styles.rowTable}>
                                <Text style={[styles.cell, styles.titleTable]}>Thiết bị</Text>
                                <Text style={[styles.cell, styles.contentTable]}>Tủ lạnh Sony 255 lít rộng rãi</Text>
                            </View>
                            <View style={styles.rowTable}>
                                <Text style={[styles.cell, styles.titleTable]}>Ngày sửa chữa</Text>
                                <Text style={[styles.cell, styles.contentTable]}>23/04/2024</Text>
                            </View>
                            <View style={styles.rowTable}>
                                <Text style={[styles.cell, styles.titleTable]}>Dịch vụ</Text>
                                <Text style={[styles.cell, styles.contentTable]}>Dịch vụ điện</Text>
                            </View>
                            <View style={styles.rowTable}>
                                <Text style={[styles.cell, styles.titleTable]}>Thời gian</Text>
                                <Text style={[styles.cell, styles.contentTable, { width: 100 }]}>7:30</Text>
                                <Text style={[styles.cell, styles.titleTable]}>Trạng thái</Text>
                                <Text style={[styles.cell, styles.contentTable]}>Hoàn thành</Text>
                            </View>

                        </View>
                    </View>
                    <View style={styles.border}></View>
                    <View>
                        <Text style={[styles.titleRepair, styles.fontFamily]}>Chi tiết sửa chữa</Text>
                        <View style={styles.tableNormal}>
                            <View style={[styles.row, styles.headerCellNormal]}>
                                <Text style={[styles.cellNormal, { fontWeight: 'bold', width: '5%' }]}>STT</Text>
                                <Text style={[styles.cellNormal, { fontWeight: 'bold' }]}>Loại thiết bị</Text>
                                <Text style={[styles.cellNormal, { fontWeight: 'bold' }]}>Tên thao tác</Text>
                                <Text style={[styles.cellNormal, { fontWeight: 'bold' }]}>Giá thao tác</Text>
                            </View>
                            <View style={styles.rowNormal}>
                                <Text style={styles.cellNormal}>1</Text>
                                <Text style={styles.cellNormal}>Hệ thống điện</Text>
                                <Text style={styles.cellNormal}>Sửa chữa chập điện</Text>
                                <Text style={styles.cellNormal}>500.000 ₫</Text>
                            </View>
                            <View style={styles.rowNormal}>
                                <Text style={styles.cellNormal}>2</Text>
                                <Text style={styles.cellNormal}>Hệ thống điện</Text>
                                <Text style={styles.cellNormal}>Sửa chữa chập điện</Text>
                                <Text style={styles.cellNormal}>500.000 ₫</Text>
                            </View>
                            <View style={styles.rowNormal}>
                                <Text style={styles.cellNormal}>3</Text>
                                <Text style={styles.cellNormal}>Hệ thống điện</Text>
                                <Text style={styles.cellNormal}>Sửa chữa chập điện</Text>
                                <Text style={styles.cellNormal}>500.000 ₫</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ fontFamily: 'Roboto', fontSize: 13, lineHeight: 2 }}>
                        <Text>Tổng thành tiền: 580.000 ₫</Text>
                        <Text>Phương thức thanh toán: VNPay</Text>
                        <Text>Trạng thái thanh toán: Thành công</Text>
                    </View>
                    <Text style={{ fontFamily: 'Roboto', fontSize: 12, textAlign: 'center', marginTop: 'auto', fontWeight: 100, fontStyle: 'italic' }}>
                        Cảm ơn bạn đã sử dụng dịch vụ sửa chữa của chúng tôi.
                    </Text>


                </Page>
            </Document >
        </PDFViewer>

    );
}

export default DetailOrderPDF;