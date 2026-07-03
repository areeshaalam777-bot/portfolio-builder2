const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");
const adminRoutes = require("./routes/adminRoutes");
dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));



// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static Files
app.use(express.static(path.join(__dirname, "public")));

// API Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/profile", require("./routes/profileRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));
app.use("/api/admin", adminRoutes);

// Pages
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

app.get("/profile", (req, res) => {
  res.render("profile");
});

app.get("/projects", (req, res) => {
  res.render("projects");
});

app.get("/portfolio/:username", (req, res) => {
  res.render("publicPortfolio");
});


app.get("/admin", (req, res) => {
    res.render("admin");
});

app.get("/forgot-password",(req,res)=>{
    res.render("forgot-password");
});

app.get("/reset-password/:token",(req,res)=>{
    res.render("reset-password");
});

// Database Check
app.get("/debug-db", (req, res) => {
  res.json({
    database: require("mongoose").connection.name,
  });
});

if (require.main === module) {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;