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
    await client.query(`INSERT INTO item (title) VALUES ($1)`, [title]);

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


app.delete("/item", async (req, res) => {
  try {
 
    console.log(req.query);
    
    let { id} = req.query
    await client.query('DELETE FROM item WHERE id = $1', [id]);
    res.json({ message: "Row deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
app.listen(env.PORT, () => {
  console.log(`http://localhost:${env.PORT}/`);
});
