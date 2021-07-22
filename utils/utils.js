const getCurrentDate = () => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  today = dd + "/" + mm + "/" + yyyy;
  return today;
};

const getCurrentTime = () => {
  var today = new Date();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  return time;
};

const getWeeksInMonth = (year, month) => {
  const weeks = [],
    firstDate = new Date(year, month, 1),
    lastDate = new Date(year, month + 1, 0),
    numDays = lastDate.getDate();

  let dayOfWeekCounter = firstDate.getDay();

  for (let date = 1; date <= numDays; date++) {
    if (dayOfWeekCounter === 0 || weeks.length === 0) {
      weeks.push([]);
    }
    weeks[weeks.length - 1].push(date);
    dayOfWeekCounter = (dayOfWeekCounter + 1) % 7;
  }

  return weeks
    .filter((w) => !!w.length)
    .map((w) => ({
      start: w[0],
      end: w[w.length - 1],
      dates: w,
    }));
};

const weekWiseExpenditure = (weeksInMonths, transactions) => {
  let perWeekExpenditure = [];
  weeksInMonths.map((week) => {
    let startDate = week.start;
    let endDate = week.end;
    let sum = 0;
    let isTransactionHappen = false;
    transactions.map((transaction) => {
      console.log(transaction.date.slice(0,2));
      console.log("fdfdfdf");
      if (
        transaction.date.slice(0,2) >= startDate &&
        transaction.date.slice(0,2) <= endDate
      ) {
        sum += Number(transaction.amount);
        isTransactionHappen = true;
      }
    });
    if (isTransactionHappen) { 
      perWeekExpenditure.push({ total: sum, start: startDate, end: endDate }); 
    }
    else { perWeekExpenditure.push({ total: -1, start: startDate, end: endDate }); }
  });
  console.log(perWeekExpenditure);
  return perWeekExpenditure;
};

const monthlyTransactions = (expenses) => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  return expenses.filter((expense) => {
    let expenseMonth = expense.date.slice(3, 5);
    let expenseYear = expense.date.slice(-4);
    return expenseYear == currentYear ? currentMonth + 1 == expenseMonth : false;
  });
};

const expenditureCategoryWise = (expenses) => {
  let category = new Map();
  category.set("Food", 0);
  category.set("Shopping", 0);
  category.set("Other", 0);
  category.set("Fuel", 0);
  category.set("Home", 0);
  expenses.map((expense) => {
    category.set(
      expense.category,
      +category.get(expense.category) + +expense.amount
    );
  });
  let categoricalSum = [];
  category.forEach(function (value, key) {
    categoricalSum.push({ name: key, sum: value });
  });

  return categoricalSum;
};

module.exports = {
  getCurrentDate,
  getCurrentTime,
  getWeeksInMonth,
  weekWiseExpenditure,
  monthlyTransactions,
  expenditureCategoryWise,
};
