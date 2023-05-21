// 入口文件
// 加载express
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import getPoetryRoute from "./src/routers/get-poetry.js"
// 创建express实例
// var app = express();
// //监听4567端口
// app.listen(4567, () => {
//     console.log(`端口启动了`)
// });

// app.get('/',  (req, res) => {
//     // express提供的send方法，可以解决上面的两个问题
//     res.send({ status: 0, message: '登录成功' }); // send方法会自动设置响应头；并且会自动把对象转成JSON字符串
// });

const app = express();
const PORT = process.env.PORT || 4000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.status(200).send("Get poetry Plugin");
});

app.get("/.well-known/ai-plugin.json", (req, res) => {
  const filePath = path.join(__dirname, "./src/.well-known/ai-plugin.json");

  res.sendFile(filePath, function (err) {
    if (err) {
      console.error(err);
      res.status(500).send({
        msg: "error sending file",
      });
    } else {
      console.log("Sent:", filePath);
    }
  });
});

app.get("/.well-known/openai.yaml", (req, res) => {
  const filePath = path.join(__dirname, "./openai.yaml");

  res.sendFile(filePath, function (err) {
    if (err) {
      console.error(err);
      res.status(500).send({
        msg: "error sending file",
      });
    } else {
      console.log("Sent:", filePath);
    }
  });
});

app.use("/api/v1/get-poetry", getPoetryRoute);

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});