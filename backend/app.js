require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const routes = require("./routes");
const PORT = 3001;
const app = express();
const path = require('node:path');
const fs = require('node:fs/promises');

const uploadDir = path.join(__dirname, 'upload');

app.use('/upload', express.static(uploadDir));
app.use(cookieParser());
app.use(express.json());
app.use('/api', routes)


/*TODO
   Добавить обработку ошибок для выведения корректных ошибок
 * */

const startServer = async () => {
  await fs.mkdir(uploadDir, { recursive: true });

  await mongoose.connect(process.env.DB_CONNECTION_STRING);

  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
};

startServer().catch((error) => {
  console.error('Ошибка запуска сервера:', error);
  process.exit(1);
});
