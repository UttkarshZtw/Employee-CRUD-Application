require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const dB = `mongodb+srv://uttkarsh5801:zetwerk%40123@uttkarshsampleprojects.neyhf15.mongodb.net/?retryWrites=true&w=majority`;
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "CrudApplication",
};

app.use(express.json());
app.use(cors());

mongoose
  .connect(dB, connectionParams)
  .then(() => {
    console.log("Connected to the database ");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. n${err}`);
  });

// mongoose connnection

app.use("/", require("./router/employeeRouter.js"));

app.listen(PORT, () => {
  console.log(`Server started running on port http://localhost:${PORT}`);
});
