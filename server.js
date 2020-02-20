const express = require("express");
const path = require("path");
const app = express();
const connectDB = require("./config/db");
const PORT = process.env.PORT || 5000;

connectDB();
app.use(express.json({ extended: false }));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

app.use("/", require("./routes/quizRoute"));
app.use("/users", require("./routes/userRoute"));
app.use("/auth", require("./routes/authRoute"));

app.listen(PORT, () => {
  console.log("Server is started on the port " + PORT);
});
