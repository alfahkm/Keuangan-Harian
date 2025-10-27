import { useState } from 'react';
import { useTransactions } from '../context/TransactionContext';

const TransactionForm = () => {
  const { addTransaction } = useTransactions();
  const [formData, setFormData] = useState({
    type: 'expense',
    amount: '',
    description: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.amount || !formData.description || !formData.category) return;

    setIsSubmitting(true);
    try {
      await addTransaction({
        ...formData,
        amount: parseFloat(formData.amount),
        created_at: new Date().toISOString(),
      });

      // Reset form
      setFormData({
        type: 'expense',
        amount: '',
        description: '',
        category: '',
        date: new Date().toISOString().split('T')[0],
      });
    } catch (error) {
      console.error('Error adding transaction:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card bg-white/10 dark:bg-gray-800/50 mb-8">
      <h2 className="text-2xl font-bold mb-6 text-custom-blue">➕ Tambah Transaksi</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-custom-blue">Jenis Transaksi</label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="type"
                  value="income"
                  checked={formData.type === 'income'}
                  onChange={handleChange}
                  className="mr-2"
                  required
                />
                <span className="text-custom-blue">💰 Pemasukan</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="type"
                  value="expense"
                  checked={formData.type === 'expense'}
                  onChange={handleChange}
                  className="mr-2"
                  required
                />
                <span className="text-custom-blue">💸 Pengeluaran</span>
              </label>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-custom-blue">Nominal</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="input-field"
              placeholder="0.00"
              step="0.01"
              min="0"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-custom-blue">Deskripsi</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="input-field"
              placeholder="Contoh: Makan siang, Gaji bulanan"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-custom-blue">Kategori</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="input-field"
              placeholder="Contoh: Makanan, Transportasi, Gaji"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2 text-custom-blue">Tanggal</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? '⏳ Menyimpan...' : '💾 Simpan Transaksi'}
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
