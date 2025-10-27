import { Link } from 'react-router-dom';

const ChartOverview = ({ transactions }) => {
  // Get recent transactions (last 5)
  const recentTransactions = transactions
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div className="grid grid-cols-1 gap-8">
      {/* Recent Transactions */}
      <div className="card bg-white/10 dark:bg-gray-800/50 animate-pulseScale">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-custom-blue">📋 Transaksi Terbaru</h3>
          <Link
            to="/report"
            className="text-custom-blue hover:text-white font-medium text-sm transition-colors"
          >
            Lihat Semua →
          </Link>
        </div>

        {recentTransactions.length > 0 ? (
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 bg-white/5 dark:bg-gray-700/20 rounded-lg hover:bg-white/10 dark:hover:bg-gray-700/30 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    transaction.type === 'income'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {transaction.type === 'income' ? '💰' : '💸'}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{transaction.description}</p>
                    <p className="text-sm text-white/70">{transaction.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold text-lg ${
                    transaction.type === 'income' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}Rp {transaction.amount.toLocaleString()}
                  </p>
                  <p className="text-xs text-white/50">
                    {new Date(transaction.date).toLocaleDateString('id-ID')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📝</div>
            <p className="text-white/70 dark:text-gray-300 text-lg mb-4">Belum ada transaksi</p>
            <Link
              to="/add"
              className="bg-custom-blue text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors inline-block"
            >
              Tambah Transaksi Pertama →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChartOverview;
