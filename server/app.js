const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
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

// const token = jwt.sign(
//   {
//     data: "foobar",
//   },
//   "secret",
//   { expiresIn: 120 }
// );

// token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiZm9vYmFyIiwiaWF0IjoxNjI1MzE0Njc5LCJleHAiOjE2MjUzMTQ3OTl9.StzP6_ooMTjeVXXyHjUF9KQAaOyjZHNTmz2Kah34PiM";
// const resJWT = jwt.verify(token, "secret");

let errorFromJwt = null;

const verifyJWT = (req, res, next) => {
  const token = req.body.token;
  console.log("verifyJWT aaaaaaaaaaaa", req.body);
  console.log("verifyJWT bbbbbbbbbbbb", req.params.token);
  console.log("verifyJWT cccccccccccc", req.query);
  // if (token) {
  jwt.verify(req.query.token, "secret", (err, decode) => {
    if (err) {
      errorFromJwt = err;
      console.log("jwt.verify error", err, decode);
    } else {
      console.log("jwt.verify no error", err, decode);
    }
  });
  // } else {
  next();
  // }
};

//sign in
app.get("/api/user", verifyJWT, (req, res) => {
  //   User.findOne({ _id: req.body._id });
  let user = {};
  user = User.findOne(
    {
      email: req.query.email,
      password: req.query.password,
    },
    async function (err, obj) {
      const token = jwt.sign({}, "secret", { expiresIn: "1h" });
      if (obj.companies.length > 1) {
        let temp = obj.companies.map((company) => Object.keys(company));
        companiesId = temp.flat(1);
        const response = await Company.findOne({ _id: companiesId });
        res.send({ user: obj, company: response, token: token });
      } else {
        res.send({ user: obj, token: token });
      }
    }
  );
});

app.get("/api/user/:id", verifyJWT, async (req, res) => {
  //   User.findOne({ _id: req.body._id });
  let user = {};
  //   user = await User.findOne({ _id: req.params.id });
  if (!errorFromJwt) {
    user = await User.findById(req.params.id);
    res.send(user);
  } else {
    res.status(401);
  }
});

// sign up
app.post("/api/user", verifyJWT, async (req, res) => {
  let user = undefined;
  console.log(req.body);
  if (req.body["password"] === req.body["confirmPassword"]) {
    delete req.body["confirmPassword"];
    user = new User({ ...req.body });
    user.save();
  }
  // const token = jwt.sign(
  //   {
  //     data: "foobar",
  //   },
  //   "secret",
  //   { expiresIn: 120 }
  // );
  const token = jwt.sign({}, (secretOrPrivateKey = "secret"), {
    expiresIn: "1h",
  });
  res.send({ ...user, token: token });
});

app.put("/api/user", verifyJWT, async (req, res) => {
  if (!errorFromJwt) {
    if (req.body["password"] === req.body["confirmPassword"]) {
      delete req.body["confirmPassword"];
      delete req.body["oldPassword"];
    }
    const result = await User.findByIdAndUpdate(req.body._id, req.body);
    //find one and update
    res.send(200);
  } else {
    res.status(401);
  }
});

app.delete("/api/user/:id", verifyJWT, async (req, res) => {
  User.findByIdAndDelete(req.params.id);
  res.sendStatus(200);
});

app.get("/api/users", verifyJWT, async (req, res) => {
  const users = await User.find({});
  res.send({ ...users });
});

app.get("/api/company", verifyJWT, (req, res) => {
  //   Company.findOne({ _id: req.body._id });
  res.send("hello");
});

app.get("/api/company/:id", verifyJWT, async (req, res) => {
  //   User.findOne({ _id: req.body._id });
  let company = {};
  //   user = await User.findOne({ _id: req.params.id });
  company = await Company.findOne({ _id: req.params.id });
  res.send(company);
});

app.put("/api/company", verifyJWT, async (req, res) => {
  let company = undefined;
  const result = await Company.findByIdAndUpdate(req.body._id, req.body);

  res.send("company updated");
});

app.post("/api/company", verifyJWT, (req, res) => {
  let company = undefined;
  company = new Company({
    ...req.body,
  });
  company.save();
  //   const data = { user: user, company: company };
  res.send("new company added");
});

app.delete("/api/company/:id", verifyJWT, async (req, res) => {
  const result = await Company.findByIdAndDelete(req.params.id);
  res.sendStatus(200);
});

app.get("/api/companies", verifyJWT, async (req, res) => {
  const companies = await Company.find({});
  res.send({ ...companies });
});

app.listen(4000, () => {
  console.log("Listening on port 4000!");
});
