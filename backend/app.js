require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const routes = require("./routes");
const PORT = 3001;
const app = express();

/*TODO
 )
 * добавить загрузку файлов изображения на сервер при помощи Formidable или Multer, file-type для проверки что пользователь действительно загрузил картинку
 Добавить обработку ошибок для выведения корректных ошибок
 * */
app.use(express.static("../frontend/dist"));
app.use(cookieParser());
app.use(express.json());
app.use('/api', routes)

mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
});
