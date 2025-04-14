import { StyleSheet } from "@react-pdf/renderer";


export const styles = StyleSheet.create({
    page: {
      padding: 30,
      fontSize: 12,
      backgroundColor: '#f4f4f5',
    },
    invoiceContainer: {
      padding: 20,
      backgroundColor: '#1f2937', // Tailwind's gray-800
      color: '#ffffff',
      borderRadius: 8,
    },
    header: {
      borderBottomWidth: 1,
      borderBottomColor: '#4b5563',
      paddingBottom: 10,
      alignItems: 'center',
      marginBottom: 10,
    },
    invoiceTitle: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    subText: {
      fontSize: 10,
      color: '#d1d5db',
    },
    infoSection: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 12,
    },
    infoBlock: {
      width: '48%',
    },
    infoTitle: {
      fontSize: 14,
      fontWeight: 'bold',
    },
    lightText: {
      color: '#d1d5db',
      fontSize: 10,
    },
    table: {
      borderWidth: 1,
      borderColor: '#4b5563',
      marginBottom: 12,
    },
    tableRowHeader: {
      flexDirection: 'row',
      backgroundColor: '#0f766e',
      color: '#ffffff',
    },
    tableRow: {
      flexDirection: 'row',
      borderTopWidth: 1,
      borderTopColor: '#4b5563',
    },
    tableCellHeader: {
      flex: 1,
      padding: 6,
      fontWeight: 'bold',
      fontSize: 10,
    },
    tableCell: {
      flex: 1,
      padding: 6,
      fontSize: 10,
    },
    summary: {
      alignItems: 'flex-end',
      marginTop: 10,
      gap: 4,
    },
    totalText: {
      fontWeight: 'bold',
      color: '#facc15', // Tailwind's yellow-400
      fontSize: 14,
      marginTop: 6,
    },
    footer: {
      marginTop: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
    }
  });