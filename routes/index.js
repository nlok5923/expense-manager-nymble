var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
var firebase = require("firebase/app");
const app = require("../fire");
const db = firebase.firestore(app);

router
  .get("/", function (req, res, next) {
    res.send("App is listening your request");
  })

  .get("/check-authorization", async (req, res) => {
    try {
      const token = req.header("Authorization").replace("Bearer ", "");
      jwt.verify(token, process.env.SESSION_SECRET, async (err, decoded) => {
        if (err) res.send(false);
        const userDocRef = await db.collection("users").doc(decoded.id);
        const doc = await userDocRef.get();
        if (!doc.exists) {
          res.send(false);
        } else {
          res.send(true);
        }
      });
    } catch (err) {
      res.send(false);
    }
  })

  .get("/check-admin-authorization", async (req, res) => {
    try {
      const token = req.header("Authorization").replace("Bearer ", "");
      jwt.verify(token, process.env.ADMIN_SESSION_SECRET, async (err, decoded) => {
        if (err) res.send(false);
        const userDocRef = await db.collection("admin").doc(decoded.id);
        const doc = await userDocRef.get();
        if (!doc.exists) {
          res.send(false);
        } else {
          res.send(true);
        }
      });
    } catch (err) {
      res.send(false);
    }
  })

module.exports = router;
