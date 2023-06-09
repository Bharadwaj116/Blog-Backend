const express = require("express");
const errorHandler = require("./middleware/ErrorHandler");
const dotenv = require("dotenv").config();
const connectDB = require("./config/dbConnection.js");

connectDB();

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
// app.use('/api/blog', require("../blog-backend/routes/BlogRouter"))
app.use("/api/article", require("../blog-backend/routes/articleRouter.js"));
app.use("/api/users", require("./routes/userRouter"));
app.use("/api/topic", require("./routes/topicRouter"));

app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
