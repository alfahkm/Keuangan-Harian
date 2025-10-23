import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { calculateCategoryExpenses, calculateWeeklyExpenses } from '../utils/summaryCalculator';
import { formatCurrency } from '../utils/formatCurrency';

const ChartOverview = ({ transactions }) => {
  const categoryData = Object.entries(calculateCategoryExpenses(transactions)).map(([category, amount]) => ({
    name: category,
    value: amount,
  }));

  const weeklyData = Object.entries(calculateWeeklyExpenses(transactions)).map(([week, amount]) => ({
    week: `Minggu ${week}`,
    amount,
  }));

  const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Pie Chart - Category Expenses */}
      <div className="card bg-white/10 dark:bg-gray-800/50">
        <h3 className="text-2xl font-bold mb-6 text-white text-center">🥧 Pengeluaran per Kategori</h3>
        {categoryData.length > 0 ? (
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => percent > 5 ? `${name}\n${(percent * 100).toFixed(0)}%` : ''}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                stroke="#0000CC"
                strokeWidth={2}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [formatCurrency(value), 'Total']}
                contentStyle={{
                  backgroundColor: '#0000CC',
                  border: '1px solid #ffffff',
                  borderRadius: '8px',
                  color: 'white'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-center py-16">
            <p className="text-white/70 dark:text-gray-300 text-lg">Belum ada data pengeluaran</p>
          </div>
        )}
      </div>

      {/* Bar Chart - Weekly Expenses */}
      <div className="card bg-white/10 dark:bg-gray-800/50">
        <h3 className="text-2xl font-bold mb-6 text-white text-center">📊 Pengeluaran Mingguan</h3>
        {weeklyData.length > 0 ? (
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={weeklyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff30" />
              <XAxis
                dataKey="week"
                stroke="#ffffff"
                fontSize={12}
                tick={{ fill: '#ffffff' }}
              />
              <YAxis
                tickFormatter={(value) => formatCurrency(value)}
                stroke="#ffffff"
                fontSize={12}
                tick={{ fill: '#ffffff' }}
              />
              <Tooltip
                formatter={(value) => [formatCurrency(value), 'Pengeluaran']}
                contentStyle={{
                  backgroundColor: '#0000CC',
                  border: '1px solid #ffffff',
                  borderRadius: '8px',
                  color: 'white'
                }}
              />
              <Bar
                dataKey="amount"
                fill="#0000CC"
                stroke="#ffffff"
                strokeWidth={1}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-center py-16">
            <p className="text-white/70 dark:text-gray-300 text-lg">Belum ada data pengeluaran mingguan</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChartOverview;
