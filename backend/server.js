// attach .env and libraries/frameworks
require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const authRoutes = require("./routes/auth")
const postRoutes = require("./routes/posts")

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

//routes
app.use('/api/auth', authRoutes);
app.use("/posts", postRoutes)

// Test route
app.get("/", (req, res) => {
    res.send("CodeLace API is running!")
})

// Connect to Database
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.error(err))

// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server is running on port http://localhost:${PORT}/`))