const express = require("express");
const multer = require("multer");
const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");
const path = require("path");

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/convert", upload.single("video"), (req, res) => {
  const inputPath = req.file.path;
  const outputName = Date.now() + ".gif";
  const outputPath = path.join(__dirname, "public", outputName);

  ffmpeg(inputPath)
    .outputOptions("-vf", "fps=10,scale=320:-1:flags=lanczos")
    .toFormat("gif")
    .save(outputPath)
    .on("end", () => {
      fs.unlinkSync(inputPath);
      res.send(`
        <h2>✅ تبدیل با موفقیت انجام شد!</h2>
        <img src="${outputName}" />
        <br><br><a href="/">بازگشت</a>
      `);
    })
    .on("error", (err) => {
      console.error("❌ خطا:", err);
      res.status(500).send("خطا در تبدیل فایل");
    });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("🚀 Server running on port", port);
});
