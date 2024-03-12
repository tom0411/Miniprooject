32// server.ts
import express from "express";
import { env } from "./env";
import { client } from "./db";


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
    console.log("post item");
    let { title } = req.body;
    await client.query(`INSERT INTO item (title) VALUES ($1)`, [title]);

    res.json({});
  } catch (err) {
    console.log(err);
    res.json({ err: "internal server error" });
  }
});

app.put("/item", async (req, res) => {
  try {

    
    let { id, title } = req.body; // Use `id` and `title` here
    await client.query('UPDATE item SET title = $1 WHERE id = $2', [title, id]);
    console.log("Backend response: item updated"); // Corrected console.log statement
    res.status(200).json({}); // Send the response
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "internal server error" });
  }
});


// Delete a specific item by ID
app.delete("/item/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await client.query('DELETE FROM item WHERE id = $1', [id]);
    res.json({ message: "Item deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete all items
app.delete("/item", async (req, res) => {
  try {
    console.log("clear item");
    await client.query('DELETE FROM item');
    res.json({ message: "All items deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});



// Start the server
app.listen(env.PORT, () => {
  console.log(`http://localhost:${env.PORT}/`);
});
