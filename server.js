const express = require("express");
const mammoth = require("mammoth");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: "20mb" }));

app.get("/", (req, res) => res.send("Mammoth DOCX API is running"));

app.post("/convert-docx", async (req, res) => {
  try {
    const base64 = req.body.base64;
    if (!base64) {
      return res.status(400).json({ error: "Missing base64 field" });
    }

    const buffer = Buffer.from(base64.split(",").pop(), "base64");
    const result = await mammoth.extractRawText({ buffer });

    res.json({ text: result.value });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Mammoth DOCX API is running on port ${port}`);
});
