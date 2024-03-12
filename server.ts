
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
    let data = await client.query('SELECT * FROM item ORDER BY id'); // Order by ID
    res.json(data.rows);
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

app.put("/item/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    await client.query('UPDATE item SET title = $1 WHERE id = $2', [title, id]);

    console.log("Backend response: item updated");
    console.log('ID:', id);
    console.log('Title:', title);

    res.status(200).json({}); // Sending the response
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});



app.delete("/item/:id", async (req, res) => {
  try {
    const { id } = req.params; // Corrected to use params
    if (id) {
      // If id is provided in path parameters, delete the item with that id
      await client.query('DELETE FROM item WHERE id = $1', [id]);
      console.log(`Item with ID ${id} deleted successfully`);
      res.json({ message: `Item with ID ${id} deleted successfully` });
    } else {
      // This else block might never be reached since id is expected in the route
      // Consider removing or handling differently if you intend to delete all without an id
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/item", async (req, res) => {
  try {
    // Deletes all items
    await client.query('DELETE FROM item');
    console.log("All items deleted successfully");
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
