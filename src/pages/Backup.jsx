import React, { useState, useEffect } from "react";

const Backup = () => {
  const [records, setRecords] = useState([]);
  const [backupPath, setBackupPath] = useState("/usr/local/callbackbackup/");
  const [storageDuration, setStorageDuration] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5; 

  useEffect(() => {
    const fetchBillingRecords = async () => {
      try {
        const response = await fetch("/api/billing-records"); 
        if (response.ok) {
          const data = await response.json();
          setRecords(data);
        } else {
          console.error("Failed to fetch records");
        }
      } catch (error) {
        console.error("Error fetching records:", error);
      }
    };

    fetchBillingRecords();
  }, []);

  const handleBackup = () => {
    alert(`Manual backup started to: ${backupPath}`);
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">Billing Management</h1>

      
      <div className="bg-gray-800 p-4 rounded-lg mb-6">
        <h2 className="text-lg font-semibold mb-2">Backup Settings</h2>
        <label className="block">
          Backup Path:
          <input
            type="text"
            value={backupPath}
            onChange={(e) => setBackupPath(e.target.value)}
            className="w-full p-2 mt-1 bg-gray-700 border border-gray-600 rounded"
          />
        </label>
        <label className="block mt-2">
          Storage Duration (Months):
          <input
            type="number"
            value={storageDuration}
            onChange={(e) => setStorageDuration(e.target.value)}
            className="w-full p-2 mt-1 bg-gray-700 border border-gray-600 rounded"
          />
        </label>
        <button
          onClick={handleBackup}
          className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded"
        >
          Manual Backup
        </button>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Billing Records</h2>
        <table className="w-full text-left border border-gray-700">
          <thead>
            <tr className="bg-gray-700">
              <th className="p-2">File Name</th>
              <th className="p-2">File Location</th>
              <th className="p-2">Creation Time</th>
              <th className="p-2">Download</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((record, index) => (
              <tr key={index} className="border-t border-gray-700">
                <td className="p-2">{record.fileName}</td>
                <td className="p-2">{record.filePath}</td>
                <td className="p-2">{record.creationTime}</td>
                <td className="p-2">
                  <a
                    href={record.downloadLink}
                    className="text-blue-400 hover:underline"
                    download
                  >
                    Download
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between mt-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className={`px-4 py-2 rounded ${currentPage === 1 ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-500"}`}
          >
            Previous
          </button>
          <span>Page {currentPage}</span>
          <button
            disabled={indexOfLastRecord >= records.length}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className={`px-4 py-2 rounded ${indexOfLastRecord >= records.length ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-500"}`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Backup;