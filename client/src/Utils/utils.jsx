const filterExpenses = (expenses) => {
  return expenses.length > 5 ? expenses.slice(0, 5) : expenses;
};

const totalExpenseAmount = (expenses) => {
  let sum = 0;
  expenses.map((expense) => (sum += +expense.data.amount));
  return sum;
};

module.exports = { filterExpenses, totalExpenseAmount };
