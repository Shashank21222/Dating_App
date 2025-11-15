const express = require("express");
const app = express();
app.use("/user", (req, res) => {
  res.send("response 3");
});

app.listen(3000);
