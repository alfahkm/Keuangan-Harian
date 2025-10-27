import TransactionForm from '../components/TransactionForm';

const AddTransaction = () => {
  return (
    <div className="min-h-screen py-12 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-custom-blue mb-4 text-shadow">➕ Tambah Transaksi</h1>
          <p className="text-custom-blue/80 text-xl">Catat pemasukan atau pengeluaran Anda</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
          <TransactionForm />
        </div>
      </div>
    </div>
  );
};

export default AddTransaction;
