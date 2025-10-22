import TransactionForm from '../components/TransactionForm';

const AddTransaction = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 text-shadow">💰 Tambah Transaksi</h1>
          <p className="text-white/80 text-xl">Catat pemasukan atau pengeluaran Anda dengan mudah</p>
        </div>

        <TransactionForm />
      </div>
    </div>
  );
};

export default AddTransaction;
