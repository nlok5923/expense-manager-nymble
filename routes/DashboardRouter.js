var express = require("express");
var router = express.Router();
var firebase = require("firebase/app");
const app = require("../fire");
const db = firebase.firestore(app);
const { authRequired } = require("../middleware/auth");
const {
  getCurrentDate,
  getCurrentTime,
  getWeeksInMonth,
  weekWiseExpenditure,
  monthlyTransactions,
  expenditureCategoryWise,
  getRatesInAllCurrency
} = require("../utils/utils");

const MAXAGE = 10 * 60 * 60 * 24;

router
  .get("/", function (req, res, next) {
    console.log("get req at login");
  })

  .post("/add-expense", authRequired, (req, res, next) => {
    const { title, currency, category, description, amount } = req.body;
    let time = getCurrentTime();
    let date = getCurrentDate();
    let rates = getRatesInAllCurrency(currency, amount);
    console.log(rates)
    let usdAmount = rates.usdAmount;
    let inrAmount = rates.inrAmount;
    let amt = Number(amount);
    try {
      db.collection("users")
        .doc(req.token)
        .collection("expenses")
        .add({
          title,
          currency,
          date,
          time,
          description,
          category,
          amount: amt,
          usdAmount,
          inrAmount
        })
        .then((doc) => {
          console.log("Successfully created");
        });
    } catch (err) {
      console.log("got unknown error",err);
    }
  })
  .get("/all-expenses", authRequired , async (req, res, next) => {
    const quizDocRef = db
      .collection("users")
      .doc(req.token)
      .collection("expenses");
    let expenses = [];
    await quizDocRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc, index) => {
        expenses.push({ id: doc.id, data: doc.data() });
      });
    });
    console.log(expenses);
    res.send(expenses);
  })

  .delete("/delete/:id", authRequired, (req, res, next) => {
    db.collection("users")
      .doc(req.token)
      .collection("expenses")
      .doc(req.params.id)
      .delete()
      .then(() => {
        console.log("successfully deleted");
        res.send("deleted");
      })
      .catch((err) => {
        console.log("unknown error", err);
        res.send(err);
      });
  })

  .put("/update/:id", authRequired, async (req, res) => {
    try {
      const { description, currency, amount, title, category, date, time } = req.body;
      console.log(req.body);
      let rates = getRatesInAllCurrency(currency, amount);
      let usdAmt = rates.usdAmount;
      let inrAmt = rates.inrAmount;
      const id = req.params.id;
      const token = req.token;
      await db
        .collection("users")
        .doc(token)
        .collection("expenses")
        .doc(id)
        .set({   
          title,
          currency,
          date,
          time,
          description,
          category,
          amount,
          usdAmount: usdAmt,
          inrAmount: inrAmt
        });
      res.send("expense saved");
    } catch (error) {
      console.log(error.message);
      res.status(500).send(error.message);
    }
  })

  .get("/reports", authRequired, async (req, res) => {
    try {
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      let weeksDateInMonth = getWeeksInMonth(currentYear, currentMonth);
      const quizDocRef = db
        .collection("users")
        .doc(req.token)
        .collection("expenses");
      let expenses = [];
      await quizDocRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc, index) => {
          expenses.push(doc.data());
        });
      });
      let monthlyExpenses = monthlyTransactions(expenses);
      res.send({
        category: expenditureCategoryWise(monthlyExpenses),
        weekly: weekWiseExpenditure(weeksDateInMonth, monthlyExpenses),
      });
    } catch (err) {
      console.log("Error caught", err);
    }
  })

module.exports = router;
