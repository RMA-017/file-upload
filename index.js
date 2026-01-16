import express from "express"
import multer from "multer"

const app = express()
const PORT = process.env.PORT

app.set("view engine", "ejs")
app.set("views", "./src/views")

app.use("/public", express.static("public"))

app.get("/", async (req, res) => {
    res.render("home")
})

app.get("/send", async (req, res) => {
    res.render("send")
})

app.get("/dashboard", async (req, res) => {
    res.render("dashboard")
})

app.get("/view", async (req, res) => {
    res.render("view")
})

app.listen(PORT, () => {
    console.log("port 3000");
})
