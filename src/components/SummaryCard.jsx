import { formatCurrency } from '../utils/formatCurrency';

const SummaryCard = ({ title, amount, icon, color = 'blue' }) => {
  const getColorClasses = (color) => {
    switch (color) {
      case 'green':
        return 'bg-gradient-to-br from-green-500 to-green-600';
      case 'red':
        return 'bg-gradient-to-br from-red-500 to-red-600';
      case 'blue':
        return 'bg-gradient-to-br from-blue-500 to-blue-600';
      default:
        return 'bg-gradient-to-br from-gray-500 to-gray-600';
    }
  };

  return (
    <div className={`card p-8 bg-gradient-to-br ${getColorClasses(color)} text-white shadow-xl`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium opacity-90 mb-2">{title}</p>
          <p className="text-3xl font-bold">{formatCurrency(amount)}</p>
        </div>
        <div className="text-5xl opacity-80">{icon}</div>
      </div>
    </div>
  );
};

export default SummaryCard;
