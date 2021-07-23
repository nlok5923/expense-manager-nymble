var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
var firebase = require("firebase/app");
const app = require("../fire");
const db = firebase.firestore(app);
const { adminAuth } = require("../middleware/auth");
const { getRatesInAllCurrency } = require("../utils/utils")

const MAXAGE = 10 * 60 * 60 * 24;

const getTokenForAdmin = (id) => {
  return jwt.sign({ id }, process.env.ADMIN_JWT_SECRET, {
    expiresIn: MAXAGE,
  });
};

router
  .get("/all-users", adminAuth, async (req, res) => {
    const quizDocRef = db.collection("users");
    let users = [];
    await quizDocRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc, index) => {
        users.push({ id: doc.id, data: doc.data() });
      });
    });
    console.log(users);
    res.send(users);
  })

  .post("/login", (req, res, next) => {
    let { email, password } = req.body;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        var uid = userCredential.user.uid;
        const token = getTokenForAdmin(uid);
        res.status(200).send({ token });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        res.send({ errorMessage });
      });
  })

  .get("/all-expenses/:id", adminAuth, async (req, res, next) => {
    const quizDocRef = db.collection("users").doc(req.params.id).collection("expenses");
    let expenses = [];
    await quizDocRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc, index) => {
        expenses.push({ id: doc.id, data: doc.data() });
      });
    });
    console.log(expenses);
    res.send(expenses);
  })

  .post("/delete/:id", adminAuth, (req, res, next) => {
    db.collection("users")
      .doc(req.body.userId)
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

  .put("/update/:id", adminAuth, async (req, res) => {
    try {
      const { description, currency, amount, title, category, date, time } = req.body.newExpense;
      let rates = getRatesInAllCurrency(currency, amount);
      let usdAmt = rates.usdAmount;
      let inrAmt = rates.inrAmount;
      const id = req.params.id;
      await db
        .collection("users")
        .doc(req.body.userId)
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
         })
      res.send("expense saved");
    } catch (error) {
      console.log(error.message);
      res.status(500).send(error.message);
    }
  });

module.exports = router;
