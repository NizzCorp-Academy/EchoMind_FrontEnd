const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 4000;

const distPath = path.join(process.cwd(), 'dist');


app.use(express.static(distPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});