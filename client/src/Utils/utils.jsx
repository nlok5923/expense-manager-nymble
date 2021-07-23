const filterExpenses = (expenses) => {
  return expenses.length > 5 ? expenses.slice(0, 5) : expenses;
};

const totalExpenseAmount = (expenses) => {
  let sum = 0;
  expenses.map((expense) => (sum += +expense.data.inrAmount));
  return sum;
};

const limitDescription = (description) => {
  return description.slice(0,95) + "...";
}

module.exports = { filterExpenses, totalExpenseAmount, limitDescription };
