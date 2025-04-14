import React from 'react';
import { pdf } from '@react-pdf/renderer';
import BillLayout from './BillLayout';

const PrintBillLayout = ({ billingData }) => {
    const handlePrint = async () => {
        const blob = await pdf(<BillLayout billingData={billingData} />).toBlob();
        const blobUrl = URL.createObjectURL(blob);

        const printWindow = window.open(blobUrl);
        if (printWindow) {
            printWindow.onload = () => {
                printWindow.focus();
                printWindow.print();

                // Second print after a short delay
                setTimeout(() => {
                    printWindow.print();
                }, 2000);
            };
        } else {
            alert("Please allow popups to print the invoice.");
        }
    };

    return (
        <div className="text-right my-4">
            <button
                onClick={handlePrint}
                className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold"
            >
                Print 2 Copies
            </button>
        </div>
    );
};

export default PrintBillLayout;
