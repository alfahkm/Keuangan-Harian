export const calculateSummary = (transactions) => {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  return {
    totalIncome,
    totalExpense,
    balance,
  };
};

export const calculateCategoryExpenses = (transactions) => {
  const expenseCategories = {};
  transactions
    .filter(t => t.type === 'expense')
    .forEach(t => {
      expenseCategories[t.category] = (expenseCategories[t.category] || 0) + t.amount;
    });
  return expenseCategories;
};

export const calculateWeeklyExpenses = (transactions) => {
  const weeklyData = {};
  transactions
    .filter(t => t.type === 'expense')
    .forEach(t => {
      const week = getWeekNumber(t.date);
      weeklyData[week] = (weeklyData[week] || 0) + t.amount;
    });
  return weeklyData;
};

const getWeekNumber = (dateString) => {
  const d = new Date(dateString);
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
};
