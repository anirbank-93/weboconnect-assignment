import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

let corsOptions = {
    origin: ["http://localhost:3000"],
}

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

import db from "./models";

db.sequelize.sync().then(() => {
    console.log("DB Connected");
}).catch((err:any) => {
    console.log("Failed to connect to db due to"+err.message);
    process.exit(1);
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`App is listening at http://localhost:${PORT}/`);
    
})