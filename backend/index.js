const express = require("express");
const app = express();
const ConnectDb = require("./DB/db");
const PORT = process.env.PORT || 9000;
const UserRouter = require("./routes/user.routes");
const cookieParser = require("cookie-parser");
const cors= require("cors");
const AuthRouter = require("./routes/auth.routes");
ConnectDb();
app.use(express.json());
app.use(cookieParser());
app.use(cors(
  {
    origin: ["http://localhost:5173", "http://localhost:5174"], // Adjust this to your frontend URL
    credentials: true, // Allow cookies to be sent
  }
));
app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.use("/api/auth", AuthRouter);
app.use("/api/user", UserRouter);
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
