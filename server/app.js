const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("./models/user");
require("./models/company");

const app = express();

// app.use(
//   cors({
//     origin: ["http://localhost:3000"],
//     methods: ["GET,POST,PUT,DELETE"],
//     credentials: true,
//   })
// );
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

const verifyJWT = (req, res, next) => {
  console.log(req);

  console.log(req.headers["x-access-token"]);
  // console.log(req.body.headers["x-access-token"]);
  let token = req.headers["x-access-token"];
  if (!req.headers["x-access-token"]) {
    console.log(req.body.headers["x-access-token"]);
    token = req.body.headers["x-access-token"];
  }

  // console.log(req.query.token);
  jwt.verify(token, "secret", (err, decode) => {
    if (err) {
      console.log(req.headers["x-access-token-token"]);
      console.log(err);
      req.errorFromJwt = err;
    } else {
      console.log("pppppppppppppppppppppppppppppp");
      req.errorFromJwt = null;
    }
  });

  next();
};

//sign in
app.get("/api/user", (req, res) => {
  //   User.findOne({ _id: req.body._id });
  let user = {};
  console.log(req.headers["x-access-token"]);
  console.log(req);
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
  if (!req.errorFromJwt) {
    user = await User.findById(req.params.id);
    res.send(user);
  } else {
    res.status(401).json({ error: "token expired", status: 401 });
  }
});

// sign up
app.post("/api/user", async (req, res) => {
  let user = undefined;
  console.log(req.body.params);
  if (req.body.params["password"] === req.body.params["confirmPassword"]) {
    delete req.body.params["confirmPassword"];
    user = new User({ ...req.body.params });
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

//new user
app.post("/api/new/user", verifyJWT, async (req, res) => {
  if (!req.errorFromJwt) {
    let user = undefined;
    console.log(req.body.params);
    if (req.body.params["password"] === req.body.params["confirmPassword"]) {
      delete req.body.params["confirmPassword"];
      user = new User({ ...req.body.params });
      user.save();
    }
    res.send({ ...user, token: token });
  } else {
    res.status(401).json({ error: "token expired", status: 401 });
  }
});

app.put("/api/user", verifyJWT, async (req, res) => {
  if (!req.errorFromJwt) {
    if (req.body.params["password"] === req.body.params["confirmPassword"]) {
      delete req.body.params["confirmPassword"];
      delete req.body.params["oldPassword"];
    }
    const result = await User.findByIdAndUpdate(
      req.body.params._id,
      req.body.params
    );
    //find one and update
    res.send(200);
  } else {
    res.status(401).json({ error: "token expired", status: 401 });
  }
});

app.delete("/api/user/:id", verifyJWT, async (req, res) => {
  if (!req.errorFromJwt) {
    console.log("/api/user/:id delete selected user");
    result = await User.findByIdAndDelete(req.params.id);
    console.log(result);
    res.sendStatus(200);
  } else {
    res.status(403).json({ error: "token expired", status: 401 });
  }
});

app.get("/api/users", verifyJWT, async (req, res) => {
  if (!req.errorFromJwt) {
    const users = await User.find({});
    res.send({ ...users });
  } else {
    res.status(401).json({ error: "token expired", status: 401 });
  }
});

// app.get("/api/company", verifyJWT, (req, res) => {
//   //   Company.findOne({ _id: req.body._id });
//   res.send("hello");
// });

app.get("/api/company/:id", verifyJWT, async (req, res) => {
  //   User.findOne({ _id: req.body._id });
  if (!req.errorFromJwt) {
    let company = {};
    //   user = await User.findOne({ _id: req.params.id });
    company = await Company.findOne({ _id: req.params.id });
    res.send(company);
  } else {
    res.status(401).json({ error: "token expired", status: 401 });
  }
});

app.put("/api/company", verifyJWT, async (req, res) => {
  if (!req.errorFromJwt) {
    let company = undefined;
    const result = await Company.findByIdAndUpdate(
      req.body.params._id,
      req.body.params
    );

    res.send("company updated");
  } else {
    res.status(401).json({ error: "token expired", status: 401 });
  }
});

app.post("/api/company", verifyJWT, (req, res) => {
  if (!req.errorFromJwt) {
    let company = undefined;
    company = new Company({
      ...req.body.params,
    });
    company.save();
    //   const data = { user: user, company: company };
    res.send("new company added");
  } else {
    res.status(401).json({ error: "token expired", status: 401 });
  }
});

app.delete("/api/company/:id", verifyJWT, async (req, res) => {
  if (!req.errorFromJwt) {
    const result = await Company.findByIdAndDelete(req.params.id);
    res.sendStatus(200);
  } else {
    res.status(401).json({ error: "token expired", status: 401 });
  }
});

app.get("/api/companies", verifyJWT, async (req, res) => {
  if (!req.errorFromJwt) {
    const companies = await Company.find({});
    res.send({ ...companies });
  } else {
    res.status(401).json({ error: "token expired", status: 401 });
  }
});

app.listen(4000, () => {
  console.log("Listening on port 4000!");
});
