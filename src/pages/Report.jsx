import { useState } from 'react';
import { useTransactions } from '../context/TransactionContext';
import { formatCurrency } from '../utils/formatCurrency';
import { formatDate, getCurrentMonth, filterTransactionsByMonth } from '../utils/dateHelper';
import Loader from '../components/Loader';

const Report = () => {
  const { transactions, loading, deleteTransaction } = useTransactions();
  const [filterMonth, setFilterMonth] = useState(getCurrentMonth());
  const [filterType, setFilterType] = useState('all');

  if (loading) {
    return <Loader />;
  }

  const filteredTransactions = filterTransactionsByMonth(transactions, filterMonth).filter(t => {
    if (filterType === 'all') return true;
    return t.type === filterType;
  });

  const exportToCSV = () => {
    const csvContent = [
      ['Tanggal', 'Jenis', 'Deskripsi', 'Kategori', 'Nominal'],
      ...filteredTransactions.map(t => [
        t.date,
        t.type === 'income' ? 'Pemasukan' : 'Pengeluaran',
        t.description,
        t.category,
        t.amount
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `laporan-keuangan-${filterMonth}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen py-12 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-custom-blue mb-4 text-shadow">📊 Laporan Keuangan</h1>
          <p className="text-custom-blue/80 text-xl">Lihat detail transaksi dan export data</p>
        </div>

        {/* Filters */}
        <div className="card bg-white/10 dark:bg-gray-800/50 mb-8">
          <div className="flex flex-wrap gap-6 items-end">
            <div>
              <label className="block text-sm font-medium mb-2 text-custom-blue">Bulan</label>
              <input
                type="month"
                value={filterMonth}
                onChange={(e) => setFilterMonth(e.target.value)}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-custom-blue">Jenis</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="input-field"
              >
                <option value="all">Semua</option>
                <option value="income">Pemasukan</option>
                <option value="expense">Pengeluaran</option>
              </select>
            </div>
            <button
              onClick={exportToCSV}
              className="btn-primary"
            >
              📥 Export CSV
            </button>
          </div>
        </div>

        {/* Transaction Table */}
        <div className="card bg-white border-2 border-custom-blue/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-full table-auto border-collapse">
              <thead className="bg-custom-blue text-white">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider border border-custom-blue/30">Tanggal</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider border border-custom-blue/30">Jenis</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider border border-custom-blue/30">Deskripsi</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider border border-custom-blue/30">Kategori</th>
                  <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider border border-custom-blue/30">Nominal</th>
                  <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider border border-custom-blue/30">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction, index) => (
                  <tr key={transaction.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-custom-blue/5'} hover:bg-custom-blue/10 transition-colors duration-200 border border-custom-blue/20`}>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-custom-blue border border-custom-blue/20">
                      {formatDate(transaction.date)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap border border-custom-blue/20">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded ${
                        transaction.type === 'income'
                          ? 'bg-green-500 text-white'
                          : 'bg-red-500 text-white'
                      }`}>
                        {transaction.type === 'income' ? 'Pemasukan' : 'Pengeluaran'}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-custom-blue border border-custom-blue/20">
                      {transaction.description}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-custom-blue border border-custom-blue/20">
                      {transaction.category}
                    </td>
                    <td className={`px-4 py-3 whitespace-nowrap text-sm text-right font-medium text-custom-blue border border-custom-blue/20`}>
                      {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-center border border-custom-blue/20">
                      <button
                        onClick={() => deleteTransaction(transaction.id)}
                        className="text-red-500 hover:text-red-700 font-medium hover:bg-red-50 px-2 py-1 rounded transition-colors duration-200"
                      >
                        🗑️ Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredTransactions.length === 0 && (
            <div className="text-center py-12">
              <p className="text-custom-blue/70 dark:text-gray-300 text-lg">Tidak ada transaksi untuk periode ini</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Report;
