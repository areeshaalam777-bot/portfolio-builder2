// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const path = require("path");
// const connectDB = require("./config/db");

// dotenv.config();

// connectDB();

// const app = express();
// app.use(express.json());
// app.use(cors());


// app.use("/api/profile", require("./routes/profileRoutes"));
// app.use("/api/projects", require("./routes/projectRoutes"));
// app.use("/api/dashboard", require("./routes/dashboardRoutes"));
// app.use(express.static(path.join(__dirname, "public")));
// app.get("/", (req, res) => {
//   res.send("Portfolio Builder API Running");
// });

// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));




// const PORT = process.env.PORT || 5000;
// app.use(
//   "/api/auth",
//   require("./routes/authRoutes")
// );

// app.get("/debug-db", (req, res) => {
//   res.json({
//     database: require("mongoose").connection.name
//   });
// });
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });








// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const path = require("path");

// const connectDB = require("./config/db");

// dotenv.config();
// connectDB();

// const app = express();

// app.use(express.json());
// app.use(cors());

// // EJS setup
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));

// // static files
// app.use(express.static(path.join(__dirname, "public")));

// // routes
// app.use("/api/profile", require("./routes/profileRoutes"));
// app.use("/api/projects", require("./routes/projectRoutes"));
// app.use("/api/dashboard", require("./routes/dashboardRoutes"));
// app.use("/api/auth", require("./routes/authRoutes"));
// app.use("/api/admin", require("./routes/adminRoutes"));
// app.get("/", (req, res) => {
//   res.render("home");   // we will create this now
// });

// app.get("/login", (req, res) => {
//   res.render("login");
// });

// app.get("/register", (req, res) => {
//   res.render("register");
// });

// app.get("/dashboard", (req, res) => {
//   res.render("dashboard");
// });

// app.get("/profile", (req, res) => {
//   res.render("profile");
// });

// app.get("/projects", (req, res) => {
//   res.render("projects");
// });

// app.get("/portfolio/:username", (req, res) => {
//   res.render("publicPortfolio");
// });


// app.get("/debug-db", (req, res) => {
//   res.json({
//     database: require("mongoose").connection.name
//   });
// });

// app.get("/portfolio/:username", async (req, res) => {
//   res.render("portfolio");
// });

// app.get("/api/public/profile/:username", async (req, res) => {
//   const user = await User.findOne({ username: req.params.username });

//   if(!user){
//     return res.status(404).json({ message: "User not found" });
//   }

//   const profile = await Profile.findOne({ userId: user._id });

//   res.json(profile);
// });

// app.get("/api/public/projects/:username", async (req, res) => {
//   const user = await User.findOne({ username: req.params.username });

//   if(!user){
//     return res.status(404).json({ message: "User not found" });
//   }

//   const projects = await Project.find({ userId: user._id });

//   res.json(projects);
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

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

// Database Check
app.get("/debug-db", (req, res) => {
  res.json({
    database: require("mongoose").connection.name,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});