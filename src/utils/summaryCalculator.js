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
      const date = new Date(t.date);
      const weekStart = new Date(date);
      weekStart.setDate(date.getDate() - date.getDay()); // Start of week (Sunday)
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6); // End of week (Saturday)

      // Create week key as "DD/MM - DD/MM"
      const startDay = weekStart.getDate().toString().padStart(2, '0');
      const startMonth = (weekStart.getMonth() + 1).toString().padStart(2, '0');
      const endDay = weekEnd.getDate().toString().padStart(2, '0');
      const endMonth = (weekEnd.getMonth() + 1).toString().padStart(2, '0');

      const weekKey = `${startDay}/${startMonth} - ${endDay}/${endMonth}`;
      weeklyData[weekKey] = (weeklyData[weekKey] || 0) + t.amount;
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
