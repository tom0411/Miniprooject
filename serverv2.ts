// server.ts
import express from "express";
import { env } from "./env";
import { client } from "./db";
import { ServerService } from "./serverServicev1";
import { ServerController } from "./serverControllerv1";


const app = express();

app.use(express.json());
app.use(express.urlencoded());
// Serve static files from 'public' directory
app.use(express.static("public"));
app.use(express.static("protected"));

export const serverService  = new ServerService(client);
export const serverController = new ServerController(serverService);

app.get("/item",serverController.getitem)
// app.get("/item", async (req, res) => {
//   try {
//     let data = (await client.query(` select * from item`)).rows;
//     res.json(data);
//   } catch (err) {
//     console.log(err);
//     res.json({ err: "internal server error" });
//   }
// });

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


app.delete("/item", async (req, res) => {
  try {
 
    console.log(req.query);
    
    let {id} = req.query
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
