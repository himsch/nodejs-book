const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();

app.set("port", process.env.PORT || 3000);

app.use(morgan("dev"));
app.use("/", express.static(path.join(__dirname, "public")));
app.use(cookieParser("song"));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "song",
    cookie: {
      httpOnly: true,
    },
    name: "connect.sid",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.data = "song pw";
});

app.use((req, res, next) => {
  console.log("모든 요청에 실행");
  next();
});

app.get("/", (req, res) => {
  req.cookies;
  res.cookie("name", encodeURIComponent(name), {
    expires: new Date(),
    httpOnly: true,
    path: "/",
  });
  req.session.id = "song";
});

app.post("/", (req, res) => {
  res.send("hello express");
});

app.get("/category/:name", (req, res) => {
  res.send(`hello ${req.params.name}`);
});

app.get("/about", (req, res) => {
  res.json({ hello: "song" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("에러입니다.");
});

app.listen(app.get("port"), () => {
  console.log("익스프레스 서버 실행");
});
