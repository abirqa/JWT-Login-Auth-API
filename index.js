const express = require("express");
const jwt = require("jsonwebtoken");
const port = 5000;

const secret_key = "mySecretKey";

const app = express();

app.get("/", (req, res) => {
  res.send({ message: "Response from Backend API" });
});

app.post("/login", (req, res) => {
  const user = {
    id: 1,
    username: "abir",
    email: "abir@gmail.com",
  };

  jwt.sign({ user }, secret_key, { expiresIn: "300s" }, (err, token) => {
    res.json({
      token,
    });
  });
});

app.post("/profile", verifyToken, (req, res) => {
  jwt.verify(req.token, secret_key, (err, authData) => {
    if (err) {
      res.send({ message: "Invalid Token" });
    } else {
      res.send({ message: "Welcome to Your Profile", authData });
    }
  });
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader != "undefined") {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    req.token = token;
    next();
  } else {
    res.send({
      result: "Token is Not Valid",
    });
  }
}

app.listen(port, () => {
  console.log(`Server Listening at port ${port}`);
});
