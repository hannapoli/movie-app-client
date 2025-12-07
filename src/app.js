const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT || 3002;

//Middlewares:
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Configuración de EJS:
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

//Rutas
app.use("/", require("./routes/auth.routes"));

app.use("/admin", require("./routes/admin/admin.routes"));
app.use("/user", require("./routes/user/user.routes"));

app.use("/admin/user", require("./routes/admin/user/admin.user.routes"));
app.use("/admin/movies", require("./routes/admin/movies/admin.movies.routes"));

/* app.use("/user", (req, res) => {
    res.render("./routes/user.routes")
}) */

app.listen(port, () => {
    console.log(`A la escucha del puerto ${port}`);
})
