const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
require("./models/user");
require("./models/company");

const app = express();

app.use(cors());

// // parse application/x-www-form-urlencoded
app.use(express.json());

// // parse application/json
app.use(express.urlencoded());

const uri =
  "mongodb+srv://ilan-ShipMe:123456789AA@cluster0.pbab6.mongodb.net/ShipMeDB?retryWrites=true&w=majority";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

const User = new mongoose.model("User");
const Company = new mongoose.model("Company");

app.get("/api/user", (req, res) => {
  //   console.log(req);
  //   User.findOne({ _id: req.body._id });
  //   console.log(req.query);
  let user = {};
  user = User.findOne(
    {
      email: req.query.email,
      password: req.query.password,
    },
    async function (err, obj) {
      //   console.log(obj);
      if (obj.companies.length > 1) {
        let temp = obj.companies.map((company) => Object.keys(company));
        companiesId = temp.flat(1);
        const response = await Company.find({ _id: companiesId });
        console.log(response);
        res.send({ user: obj, company: response });
      }

      res.send({ user: obj });
    }
  );
});

app.get("/api/user/:id", async (req, res) => {
  //   console.log(req);
  //   User.findOne({ _id: req.body._id });
  //   console.log(req.query);
  let user = {};
  console.log(req.params.id);
  //   user = await User.findOne({ _id: req.params.id });
  user = await User.findById(req.params.id);
  console.log(user);
  res.send(user);
});

app.post("/api/user", async (req, res) => {
  console.log(req.body);
  console.log("aaa");
  let user = undefined;
  if (req.body["password"] === req.body["confirmPassword"]) {
    delete req.body["confirmPassword"];
    user = new User({ ...req.body });
    console.log(user);
    user.save();
  }
  console.log("user");
  res.send({ ...user });
});

app.put("/api/user", async (req, res) => {
  console.log(req.body);
  console.log("aaa");
  if (req.body["password"] === req.body["confirmPassword"]) {
    delete req.body["confirmPassword"];
    delete req.body["oldPassword"];
  }
  const result = await User.findByIdAndUpdate(req.body._id, req.body);
  //find one and update
  res.send(200);
});

app.delete("/api/user", async (req, res) => {
  console.log(req.body);
  User.findByIdAndDelete(req.body.id);
  res.sendStatus(200);
});

app.get("/api/users", async (req, res) => {
  console.log("/api/users get");
  const users = await User.find({});
  console.log(users);
  res.send({ ...users });
});

app.get("/api/company", (req, res) => {
  //   console.log(req);
  console.log("aaa");
  //   Company.findOne({ _id: req.body._id });
  res.send("hello");
});

app.get("/api/company/:id", async (req, res) => {
  //   console.log(req);
  //   User.findOne({ _id: req.body._id });
  //   console.log(req.query);
  let company = {};
  console.log(req.params.id);
  //   user = await User.findOne({ _id: req.params.id });
  company = await Company.findOne({ _id: req.params.id });
  console.log(company);
  res.send(company);
});

app.put("/api/company", async (req, res) => {
  console.log(req.body);
  console.log("/api/company put");
  let company = undefined;
  const result = await Company.findByIdAndUpdate(req.body._id, req.body);

  res.send("company updated");
});

app.post("/api/company", (req, res) => {
  console.log(req.body);
  console.log("/api/company post");
  let company = undefined;
  company = new Company({
    ...req.body,
  });
  company.save();
  //   const data = { user: user, company: company };
  res.send("new company added");
});

app.delete("/api/company", async (req, res) => {
  console.log(req.body);
  const result = await Company.findByIdAndDelete(req.body.id);
  res.sendStatus(200);
});

app.get("/api/companies", async (req, res) => {
  console.log("/api/companies get");
  const companies = await Company.find({});
  console.log(companies);
  res.send({ ...companies });
});

app.listen(4000, () => {
  console.log("Listening on port 4000!");
});
