import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import indexRoute from "./app/routes";
// import userSeeds from "./seeders/user.seeds";
import { deserializeUser } from "./app/middlewares";

dotenv.config();

const app = express();

let corsOptions = {
  origin: ["http://localhost:3000"],
};

app.use(cors(corsOptions));

app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: false }));
// app.use(deserializeUser);
app.use("/storages", express.static(path.join(__dirname, "app/storages")));

import db from "./models";

// const createUsers = () => {
//     userSeeds.map(user => {
//         db.User.create(user);
//     });
// }

db.sequelize
  .sync() // { force: true }
  .then(() => {
    // createUsers();
    console.log("DB Connected");
  })
  .catch((err: any) => {
    console.log("Failed to connect to db due to" + err.message);
    process.exit(1);
  });

app.use("/", indexRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App is listening at http://localhost:${PORT}/`);
});
