import { useState } from "react";

const ModalExportMonthAbsensi = ({ isOpen, onClose }) => {
  const [selectedMonthYear, setSelectedMonthYear] = useState("");
  const [loading, setLoading] = useState(false);

  const handleExportByMonth = async () => {
    if (!selectedMonthYear) return;

    setLoading(true);
    try {
      const token = localStorage.getItem("token"); // ambil token
      const [year, month] = selectedMonthYear.split("-");
      console.log(`Selected Month Year : ${selectedMonthYear.split("-")} `);

      const res = await fetch(
        `http://localhost:5001/api/absensi-access/export-absensi-month?year=${year}&month=${month}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Gagal export");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      // Auto download file
      const link = document.createElement("a");
      link.href = url;
      link.download = `absensi_${year}_${month}.xlsx`;
      document.body.appendChild(link);
      link.click();
      link.remove();

      onClose();
    } catch (err) {
      console.error(err);
      alert("Gagal export absensi bulanan");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null; // modal hidden

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm backdrop-brightness-90">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-lg font-bold mb-4">Export Absensi Bulanan</h2>
        <input
          type="month"
          value={selectedMonthYear}
          onChange={(e) => setSelectedMonthYear(e.target.value)}
          className="border px-2 py-1 rounded w-full mb-4"
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Batal
          </button>
          <button
            onClick={handleExportByMonth}
            disabled={!selectedMonthYear || loading}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
          >
            {loading ? "Proses..." : "Export"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalExportMonthAbsensi;
