import { useState, useEffect } from 'react';
import { useTransactions } from '../context/TransactionContext';
import { useAuth } from '../context/AuthContext';

const Settings = () => {
  const { transactions, deleteTransaction } = useTransactions();
  const { user, logout } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Load dark mode preference from localStorage
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedDarkMode);
    applyDarkMode(savedDarkMode);
  }, []);

  const applyDarkMode = (dark) => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleDarkModeToggle = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    applyDarkMode(newDarkMode);
  };

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

    const exportFileDefaultName = `backup-keuangan-${user.username}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleLogout = () => {
    if (window.confirm('Apakah Anda yakin ingin logout?')) {
      logout();
    }
  };

  return (
    <div className="min-h-screen py-12 bg-white">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-custom-blue mb-4 text-shadow">⚙️ Pengaturan</h1>
          <p className="text-custom-blue/80 text-xl">Kelola aplikasi dan data Anda</p>
        </div>

        <div className="space-y-6">
          {/* User Info */}
          <div className="card bg-white/10 dark:bg-gray-800/50">
            <h2 className="text-xl font-semibold mb-4 text-custom-blue">👤 Informasi Akun</h2>
            <div className="space-y-2 text-sm text-custom-blue/80">
              <p><strong>Username:</strong> {user?.username}</p>
              <p><strong>Total Transaksi:</strong> {transactions.length}</p>
            </div>
            <button
              onClick={handleLogout}
              className="btn-danger mt-4"
            >
              🚪 Logout
            </button>
          </div>

          {/* Data Management */}
          <div className="card bg-white/10 dark:bg-gray-800/50">
            <h2 className="text-xl font-semibold mb-4 text-custom-blue">💾 Manajemen Data</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2 text-custom-blue">Export Data</h3>
                <p className="text-sm text-custom-blue/80 mb-3">Unduh semua data transaksi dalam format JSON</p>
                <button
                  onClick={handleExportData}
                  className="btn-primary"
                >
                  📥 Export Data
                </button>
              </div>

              <div className="border-t border-custom-blue/20 pt-4">
                <h3 className="font-medium mb-2 text-red-300">Reset Data</h3>
                <p className="text-sm text-custom-blue/80 mb-3">Hapus semua data transaksi secara permanen</p>
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
          <div className="card bg-white/10 dark:bg-gray-800/50">
            <h2 className="text-xl font-semibold mb-4 text-custom-blue">ℹ️ Tentang Aplikasi</h2>
            <div className="space-y-2 text-sm text-custom-blue/80">
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
