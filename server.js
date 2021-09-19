const express = require("express");
const app = express();

const PORT = 5000;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Working ");
});

require("./routes/bankRoutes")(app);

app.listen(PORT, () => {
  console.log("Express server is running on PORT : " + PORT);
});