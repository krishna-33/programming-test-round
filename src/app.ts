import express from "express";
import apiRoutes from './routes'
import db from "./models";
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", apiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  await db.sequelize
    .authenticate()
    .then(() => console.log("db connected"))
    .catch((err: object) => console.log("error in db connection"));
  console.log(`Server is running on port ${PORT}`);
});
