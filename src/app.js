const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT || 3002;

//Middlewares:
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

//Configuración de EJS:
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

//Rutas
//app.use("/", require(""./routes/public.routes"))
app.use("/admin", require("./routes/admin.routes"));

/* app.use("/user", (req, res) => {
    res.render("./routes/user.routes")
}) */

app.listen(port, () => {
    console.log(`A la escucha del puerto ${port}`);
})
