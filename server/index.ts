import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import indexRoute from "./app/routes";

dotenv.config();

const app = express();

let corsOptions = {
    origin: ["http://localhost:3000"],
}

app.use(cors(corsOptions));

app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

import db from "./models";

db.sequelize.sync({ force: true }).then(() => {
    console.log("DB Connected");
}).catch((err:any) => {
    console.log("Failed to connect to db due to"+err.message);
    process.exit(1);
});

app.use("/", indexRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`App is listening at http://localhost:${PORT}/`);
});