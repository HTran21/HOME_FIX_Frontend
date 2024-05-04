import { Document, Page, Text, View, StyleSheet, Image, Font, PDFViewer } from '@react-pdf/renderer';
// Font.register({
//     family: "Roboto",
//     src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
// });
Font.register({
    family: 'Roboto',
    fonts: [
        { src: '/public/font/Roboto-Regular.ttf' },
        { src: '/public/font/Roboto-Medium.ttf', fontWeight: 'bold' },
        { src: '/public/font/Roboto-ThinItalic.ttf', fontWeight: 'thin', fontStyle: 'italic' },

    ]
});
Font.register({
    family: 'ReemKufi',
    fonts: [
        { src: '/public/font/ReemKufi-Bold.ttf' },

    ]
});
import moment from 'moment';

function ComponentPDF({ data }) {

    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    const styles = StyleSheet.create({
        page: {
            padding: '10px 20px',
            fontFamily: "Roboto",
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
            fontFamily: "ReemKufi",
            marginLeft: 5,
        },
        titleOrder: {
            fontFamily: "ReemKufi",
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
            fontSize: 14,

        },
        titleInfor: {
            fontFamily: "ReemKufi",
            fontSize: 14,
        },
        row: {
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'row',

        },
        myText: {
            fontSize: 12,
        },
        titleRepair: {
            fontFamily: "ReemKufi",
            marginTop: 10,
            padding: 7,
            backgroundColor: '#E1ECFF',
            borderRadius: 5,
            fontSize: 14
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
            fontWeight: 'bold'
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
            // flex: 1,
            display: 'flex',
            padding: 5,
            textAlign: 'center',
            borderLeft: '1px soild #E5E1DA',
            width: 'auto'

        },
        headerCellNormal: {
            backgroundColor: '#EEEEEE',
            textAlign: 'center',
            fontWeight: 'bold'
        },
    });

    return (

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
                                Thông tin khách hàng
                            </Text>
                            <Text style={styles.myText}>
                                {data?.Order.fullName}
                            </Text>
                            <Text style={styles.myText}>
                                {data?.Order.email}
                            </Text>
                            <Text style={styles.myText}>
                                {data?.Order.phone}
                            </Text>
                            <Text style={styles.myText}>
                                {data?.Order.address}
                            </Text>

                        </View>
                    </View>
                    <View style={styles.layoutInfor}>
                        <View style={styles.inforRepairer}>
                            <Text style={styles.titleInfor}>
                                Thông tin thợ
                            </Text>
                            <Text style={styles.myText}>
                                {data?.Schedule.Repairer.usernameRepairer}
                            </Text>
                            <Text style={styles.myText}>
                                {data?.Schedule.Repairer.phoneRepairer}
                            </Text>
                            <Text style={styles.myText}>
                                {data?.Schedule.Repairer.emailRepairer}
                            </Text>


                        </View>
                    </View>
                </View>
                <View style={styles.border}></View>
                <View>
                    <View style={styles.titleRepair}>
                        <View style={styles.row}>
                            <Text>Thông tin sửa chữa</Text>
                            <Text style={{ marginLeft: 'auto' }}>Ngày đăng ký: 20/04/2024</Text>
                        </View>
                    </View>
                    <View style={styles.table}>
                        <View style={styles.rowTable}>
                            <Text style={[styles.cell, styles.titleTable]}>ID Đơn</Text>
                            <Text style={[styles.cell, styles.contentTable]}>{data?.Order.id}</Text>
                        </View>
                        <View style={styles.rowTable}>
                            <Text style={[styles.cell, styles.titleTable]}>Dịch vụ</Text>
                            <Text style={[styles.cell, styles.contentTable]}>{data?.Order.Categori.Service.nameService}</Text>
                        </View>
                        <View style={styles.rowTable}>
                            <Text style={[styles.cell, styles.titleTable]}>Hãng</Text>
                            <Text style={[styles.cell, styles.contentTable]}>{data?.Order.Product && data?.Order.Product.Brand.nameBrand}</Text>
                        </View>
                        <View style={styles.rowTable}>
                            <Text style={[styles.cell, styles.titleTable]}>Loại thiết bị</Text>
                            <Text style={[styles.cell, styles.contentTable]}>{data?.Order.Categori.nameCategories}</Text>
                        </View>
                        <View style={styles.rowTable}>
                            <Text style={[styles.cell, styles.titleTable]}>Thiết bị</Text>
                            <Text style={[styles.cell, styles.contentTable]}>{data?.Order.Product && data?.Order.Product.nameProduct}</Text>
                        </View>
                        <View style={styles.rowTable}>
                            <Text style={[styles.cell, styles.titleTable]}>Ngày sửa chữa</Text>
                            <Text style={[styles.cell, styles.contentTable]}>{moment(data?.Schedule.workDay).format("DD/MM/YYYY")}</Text>
                        </View>
                        <View style={styles.rowTable}>
                            <Text style={[styles.cell, styles.titleTable]}>Thời gian</Text>
                            <Text style={[styles.cell, styles.contentTable, { width: 100 }]}>{data?.timeRepair.split("-")[0]}</Text>
                            <Text style={[styles.cell, styles.titleTable]}>Trạng thái</Text>
                            <Text style={[styles.cell, styles.contentTable]}>{`${data?.Order.status == 'A' ? 'Đã duyệt' : (data?.Order.status === 'R' ? 'Đang sửa' : (data?.Order.status === 'S' ? 'Hoàn thành' : 'Hủy bỏ'))}`}</Text>
                        </View>

                    </View>
                </View>
                <View style={styles.border}></View>
                <View>
                    <Text style={styles.titleRepair}>Chi tiết sửa chữa</Text>
                    <View style={styles.tableNormal}>
                        <View style={[styles.row, styles.headerCellNormal]}>
                            <Text style={[styles.cellNormal, { width: "10%" }]}>STT</Text>
                            <Text style={[styles.cellNormal, { width: "20%" }]}>Loại thiết bị</Text>
                            <Text style={[styles.cellNormal, { width: "50%" }]}>Tên thao tác</Text>
                            <Text style={[styles.cellNormal, { width: '20%' }]}>Giá thao tác</Text>
                        </View>
                        {data?.TaskRepairs.map((task, index) => (
                            <View style={styles.rowNormal} key={index}>
                                <Text style={[styles.cellNormal, { width: "10%" }]}>{index}</Text>
                                <Text style={[styles.cellNormal, { width: '20%' }]}>{task.Operation.Categori.nameCategories}</Text>
                                <Text style={[styles.cellNormal, { width: "50%" }]}>{task.Operation.nameOperation}</Text>
                                <Text style={[styles.cellNormal, { width: '20%' }]}>{VND.format(task.Operation.price)}</Text>
                            </View>
                        ))}


                    </View>
                </View>
                <View style={{ fontSize: 12, marginTop: 10, lineHeight: 2 }} >
                    <Text>Tổng thành tiền: {VND.format(data?.totalAmount)}</Text>
                    <Text>Phương thức thanh toán: {data?.paymentMethod === 'vnpay' ? 'VNPay' : 'Tiền mặt'}</Text>
                    <Text>Trạng thái thanh toán: {data?.paymentStatus === 'P' ? 'Đã thanh toán' : 'Chưa thanh toán'}</Text>
                </View>
                <Text style={{ fontFamily: 'Roboto', fontSize: 12, textAlign: 'center', marginTop: 'auto', fontWeight: 100, fontStyle: 'italic' }} >
                    Cảm ơn bạn đã sử dụng dịch vụ sửa chữa của chúng tôi.
                </Text>


            </Page>
        </Document >


    );
}

export default ComponentPDF;