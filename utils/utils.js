const currencies = [
  { key: 1, value: "USD", text: "USD" },
  { key: 2, value: "AUD", text: "AUD" },
  { key: 3, value: "CAD", text: "CAD" },
  { key: 4, value: "PLN", text: "PLN" },
  { key: 5, value: "MXN", text: "MXN" },
  { key: 6, value: "INR", text: "INR" },
];

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
  console.log(transactions);
  weeksInMonths.map((week) => {
    let startDate = week.start;
    let endDate = week.end;
    let sum = 0;
    let isTransactionHappen = false;
    let inrSum = 0, usdSum = 0;
    transactions.map((transaction) => {
      if (
        transaction.date.slice(0,2) >= startDate &&
        transaction.date.slice(0,2) <= endDate
      ) {
        console.log(transaction.inrAmount, transaction.usdAmount);
        inrSum += Number(transaction.inrAmount);
        usdSum += Number(transaction.usdAmount);
        sum += Number(transaction.amount);
        isTransactionHappen = true;
      }
    });
    if (isTransactionHappen) { 
      perWeekExpenditure.push({ total: sum, start: startDate, end: endDate, inrSum: inrSum, usdSum: usdSum }); 
    }
    else { 
      perWeekExpenditure.push({ total: -1, start: startDate, end: endDate, inrSum: inrSum, usdSum:usdSum }); 
    }
  });
  // console.log(perWeekExpenditure);
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
  console.log(expenses);
  category.set("Food", {inrSum: 0, usdSum: 0});
  category.set("Shopping", {inrSum: 0, usdSum: 0});
  category.set("Other", {inrSum: 0, usdSum: 0});
  category.set("Fuel", {inrSum: 0, usdSum: 0});
  category.set("Home", {inrSum: 0, usdSum: 0});
  expenses.map((expense) => {
    category.set(
      expense.category,
      {
       inrSum: +category.get(expense.category).inrSum + +expense.inrAmount,
       usdSum: +category.get(expense.category).usdSum + +expense.usdAmount,
      }
    );
  });
  let categoricalSum = [];
  category.forEach(function (value, key) {
    categoricalSum.push({ name: key, sum: value });
  });
  console.log(categoricalSum);

  return categoricalSum;
};


const getRatesInAllCurrency = (currentCurrency, amount) => {
  let usdAmount = 0, inrAmount = 0;
  if(currentCurrency == "INR") {
    inrAmount = amount;
    usdAmount = amount * 0.013;
  } else {
    usdAmount = amount;
    inrAmount = 75.6 * amount;
  }
  return { inrAmount, usdAmount };
}

module.exports = {
  getCurrentDate,
  getCurrentTime,
  getWeeksInMonth,
  weekWiseExpenditure,
  monthlyTransactions,
  expenditureCategoryWise,
  getRatesInAllCurrency
};
