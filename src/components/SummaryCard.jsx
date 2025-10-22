import { formatCurrency } from '../utils/formatCurrency';

const SummaryCard = ({ title, amount, icon, color = 'blue' }) => {
  const getColorClasses = (color) => {
    switch (color) {
      case 'green':
        return 'bg-green-500';
      case 'red':
        return 'bg-red-500';
      case 'blue':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className={`card p-8 bg-gradient-to-br ${getColorClasses(color)} text-white`}>
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
