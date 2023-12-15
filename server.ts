// server.ts
import express from "express";
import { env } from "./env";
import bodyParser from "body-parser";
import { client } from "./db";
import { log } from "console";

const app = express();

app.use(express.json());
app.use(express.urlencoded());
// Serve static files from 'public' directory
app.use(express.static("public"));
app.use(express.static("protected"));

app.get("/item", async (req, res) => {
  try {
    let data = (await client.query(` select * from item`)).rows;
    res.json(data);
  } catch (err) {
    console.log(err);
    res.json({ err: "internal server error" });
  }
});

app.post("/item", async (req, res) => {
  try {
    let { title } = req.body;
    await client.query(`INSERT INTO item (tittle) VALUES ($1)`, [title]);

    res.json({});
  } catch (err) {
    console.log(err);
    res.json({ err: "internal server error" });
  }
});


app.patch("/item",async (req, res) => {
  try {
   
    res.json({});
  } catch (err) {
    console.log(err);
    res.json({ err: "internal server error" });
  }
});


app.delete("/item");
// Start the server
app.listen(env.PORT, () => {
  console.log(`http://localhost:${env.PORT}/`);
});
