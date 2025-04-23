import express from "express";
import apiRoutes from './routes'
import db from "./models";

const app = express();

app.use(express.json());
app.use("/api", apiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  await db.sequelize
    .authenticate()
    .then(() => console.log("db connected"))
    .catch((err) => console.log("error in db connection"));
  console.log(`Server is running on port ${PORT}`);
});
