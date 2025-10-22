import { useTransactions } from '../context/TransactionContext';
import SummaryCard from '../components/SummaryCard';
import ChartOverview from '../components/ChartOverview';
import Loader from '../components/Loader';
import { calculateSummary } from '../utils/summaryCalculator';

const Home = () => {
  const { transactions, loading } = useTransactions();
  const { totalIncome, totalExpense, balance } = calculateSummary(transactions);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-white mb-4 text-shadow">💰 Catatan Keuangan Harian</h1>
          <p className="text-white/80 text-xl">Kelola keuangan Anda dengan mudah dan efisien</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <SummaryCard
            title="Total Pemasukan"
            amount={totalIncome}
            icon="💰"
            color="green"
          />
          <SummaryCard
            title="Total Pengeluaran"
            amount={totalExpense}
            icon="💸"
            color="red"
          />
          <SummaryCard
            title="Saldo"
            amount={balance}
            icon="⚖️"
            color={balance >= 0 ? 'blue' : 'red'}
          />
        </div>

        {/* Charts */}
        <ChartOverview transactions={transactions} />
      </div>
    </div>
  );
};

export default Home;
