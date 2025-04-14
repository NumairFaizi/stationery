import React from 'react';
import {
    Document,
    Page,
    Text,
    View,
} from '@react-pdf/renderer';

import { styles } from './billingStyle';

const BillLayout = ({ billingData }) => (
    <Document>
        {billingData.billingData.map((data) => (
            <Page key={data._id} size="A4" style={styles.page}>
                <View style={styles.invoiceContainer}>

                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.invoiceTitle}>INVOICE</Text>
                        <Text style={styles.subText}>Invoice No: #{data._id.slice(0, 6).toUpperCase()}</Text>
                        <Text style={styles.subText}>Date: {data.date}</Text>
                    </View>

                    {/* Customer Info */}
                    <View style={styles.infoSection}>
                        <View style={styles.infoBlock}>
                            <Text style={styles.infoTitle}>Bill To:</Text>
                            <Text>{data.customerName}</Text>
                            <Text style={styles.lightText}>{data.email}</Text>
                        </View>
                        <View style={styles.infoBlock}>
                            <Text style={styles.infoTitle}>Ship To:</Text>
                            <Text>{data.customerName}</Text>
                            <Text style={styles.lightText}>{data.email}</Text>
                        </View>
                    </View>

                    {/* Products Table */}
                    <View style={styles.table}>
                        <View style={styles.tableRowHeader}>
                            <Text style={styles.tableCellHeader}>Product</Text>
                            <Text style={styles.tableCellHeader}>Brand</Text>
                            <Text style={styles.tableCellHeader}>Qty</Text>
                            <Text style={styles.tableCellHeader}>Unit Price</Text>
                            <Text style={styles.tableCellHeader}>Total</Text>
                        </View>
                        {data.billingProducts.map((product, key) => (
                            <View key={key} style={styles.tableRow}>
                                <Text style={styles.tableCell}>{product.name}</Text>
                                <Text style={styles.tableCell}>{product.brand}</Text>
                                <Text style={styles.tableCell}>{product.qty}</Text>
                                <Text style={styles.tableCell}>₹{product.price}</Text>
                                <Text style={styles.tableCell}>₹{product.totalPrice}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Summary */}
                    <View style={styles.summary}>
                        <Text>Subtotal: ₹{data.subTotal}</Text>
                        <Text>Discount: ₹{data.discount}</Text>
                        <Text>CGST @ {data.SGSTandCGST}%: ₹{data.CGSTAmount}</Text>
                        <Text style={styles.totalText}>Grand Total: ₹{data.grandTotal}</Text>
                    </View>

                    {/* Footer */}
                    <View style={styles.footer}>
                        <Text>Payment Mode: {data.paymentMethod}</Text>
                       
                    </View>
                </View>
            </Page>
        ))}
    </Document>
)
export default BillLayout
