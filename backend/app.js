const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const { engine } = require("express-handlebars");
const adminData = require("./routes/admin");
const userRoutes = require("./routes/dashboard");
const rootDir = require("./util/path");

const app = express();

app.engine(
  "hbs",
  engine({
    layoutsDir: "views/layouts/",
    defaultLayout: "main-layout",
    extname: "hbs",
  })
);

// Using handlebars templating engine
// app.set("view engine", "hbs");

// Using pug templating engine
// app.set("view engine", "pug");

// Using ejs templating engine
app.set("view engine", "ejs");

// Setting the views folder for the engine to check for the .pug or .hbs files
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, "public")));
app.use("/admin", adminData.routes);
app.use(userRoutes);

app.use((req, res, next) => {
  // res.status(404).sendFile(path.join(rootDir, "views", "404.html"));
  res.status(404).render("404", {
    pageTitle: "Page not found",
    // layout: true,
  }); // render dynamic content using pug
});

app.listen(3000);
