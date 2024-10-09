import express from "express";
import dbConnect from "./db";
import router from "./route";
import "./lib/cronJob";

const app = express();
app.use(express.json());
app.use(router);

const PORT = process.env.PORT || 3000;

async function startServer() {
  await dbConnect();

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer().catch(console.error);
