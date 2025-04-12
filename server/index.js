import express from "express";
import cors from "cors";
import multer from "multer";
import { spawn } from "child_process";
import path from "path";
import fs from "fs";

const app = express();
app.use(cors());
app.use(express.json());

// Upload setup
const upload = multer({ dest: "uploads/" });
app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});
app.post("/api/upload", upload.single("file"), (req, res) => {
  const filePath = req.file.path;

  const py = spawn("python3", ["mindmap_processor.py", filePath]);

  let data = "";
  py.stdout.on("data", (chunk) => (data += chunk));
  py.stderr.on("data", (err) => console.error("Python error:", err.toString()));
  py.on("close", (code) => {
    fs.unlinkSync(filePath); // Clean up
    res.json(JSON.parse(data));
  });
});

app.listen(4040, () => {
  console.log("Server running on http://localhost:4040");
});