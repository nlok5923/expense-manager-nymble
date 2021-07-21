const jwt = require("jsonwebtoken");
require("dotenv").config();
var firebase = require("firebase/app");
const app = require("../fire");
const db = firebase.firestore(app);

const authRequired = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = await jwt.verify(token, process.env.SESSION_SECRET);
    const userDocRef = await db.collection("users").doc(decoded.id);
    const doc = await userDocRef.get();
    if (!doc.exists) res.status("401").send("Please authenticate");
    else {
      req.token = decoded.id;
      next();
    }
  } catch (err) {
    console.log(err.message);
    res.status("401").send("Please authenticate");
  }
};

const adminAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = await jwt.verify(token, process.env.ADMIN_SESSION_SECRET);
    const userDocRef = await db.collection("admin").doc(decoded.id);
    const doc = await userDocRef.get();
    if (!doc.exists) res.status("401").send("Please authenticate");
    else {
      req.token = decoded.id;
      next();
    }
  } catch (err) {
    console.log(err.message);
    res.status("401").send("Please authenticate");
  }
};

module.exports = { authRequired, adminAuth };
