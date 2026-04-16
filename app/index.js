const express = require("express");
const { PutCommand, ScanCommand } = require("@aws-sdk/lib-dynamodb");
const { v4: uuidv4 } = require("uuid");
const docClient = require("./db");

const app = express();
const PORT = process.env.PORT || 3000;
const TABLE_NAME = "tasks";

app.use(express.json());

// logs estructurados
app.use((req, res, next) => {
  console.log(JSON.stringify({
    method: req.method,
    path: req.path,
    timestamp: new Date().toISOString()
  }));
  next();
});

// healthcheck
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// 🔥 crear tarea
app.post("/tasks", async (req, res) => {
  try {
    const { title } = req.body;

    const item = {
      id: uuidv4(),
      title,
      completed: false
    };

    await docClient.send(
      new PutCommand({
        TableName: TABLE_NAME,
        Item: item
      })
    );

    res.status(201).json(item);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating task" });
  }
});

// 🔥 listar tareas
app.get("/tasks", async (req, res) => {
  try {
    const result = await docClient.send(
      new ScanCommand({
        TableName: TABLE_NAME
      })
    );

    res.json(result.Items);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching tasks" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 