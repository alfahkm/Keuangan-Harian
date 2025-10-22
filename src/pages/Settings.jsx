import { useState } from 'react';
import { useTransactions } from '../context/TransactionContext';

const Settings = () => {
  const { transactions, deleteTransaction } = useTransactions();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleResetData = () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus semua data? Tindakan ini tidak dapat dibatalkan.')) {
      transactions.forEach(transaction => {
        deleteTransaction(transaction.id);
      });
    }
  };

  const handleExportData = () => {
    const dataStr = JSON.stringify(transactions, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

    const exportFileDefaultName = 'backup-keuangan.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 text-shadow">⚙️ Pengaturan</h1>
          <p className="text-white/80 text-xl">Kelola aplikasi dan data Anda</p>
        </div>

        <div className="space-y-6">
          {/* Dark Mode Toggle */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4 text-white">🎨 Tampilan</h2>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-white">Mode Gelap</h3>
                <p className="text-sm text-white/80">Aktifkan tema gelap untuk aplikasi</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={isDarkMode}
                  onChange={() => setIsDarkMode(!isDarkMode)}
                />
                <div className="w-11 h-6 bg-white/20 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-400"></div>
              </label>
            </div>
          </div>

          {/* Data Management */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4 text-white">💾 Manajemen Data</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2 text-white">Export Data</h3>
                <p className="text-sm text-white/80 mb-3">Unduh semua data transaksi dalam format JSON</p>
                <button
                  onClick={handleExportData}
                  className="btn-primary"
                >
                  📥 Export Data
                </button>
              </div>

              <div className="border-t border-white/20 pt-4">
                <h3 className="font-medium mb-2 text-red-300">Reset Data</h3>
                <p className="text-sm text-white/80 mb-3">Hapus semua data transaksi secara permanen</p>
                <button
                  onClick={handleResetData}
                  className="btn-danger"
                >
                  🗑️ Reset Semua Data
                </button>
              </div>
            </div>
          </div>

          {/* App Info */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4 text-white">ℹ️ Tentang Aplikasi</h2>
            <div className="space-y-2 text-sm text-white/80">
              <p><strong>Versi:</strong> 1.0.0</p>
              <p><strong>Teknologi:</strong> React + Supabase + Tailwind CSS</p>
              <p><strong>Tujuan:</strong> Membantu Anda mengelola keuangan harian dengan mudah</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
