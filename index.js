import express from "express"
import multer from "multer"
import path from "node:path"

const app = express()
const PORT = process.env.PORT
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        const name = Date.now() + ext
        cb(null, name)
    }
})
const upload = multer({ storage })

app.set("view engine", "ejs")
app.set("views", "./src/views")

app.use("/public", express.static("public"))
app.use("/uploads", express.static("uploads"))

app.get("/", async (req, res) => {
    res.render("home")
})

app.get("/send", async (req, res) => {
    if (req.query.file) {
        res.render("send", {
            file: true,
            user_file: "/uploads/" + req.query.file
        })
    } else {
        res.render("send", {
            file: false
        })
    }
})

app.post("/send", upload.single("users_file"), async (req, res) => {
    res.redirect(`./send?file=${req.file.filename}`)
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
