import express from "express"
import multer from "multer"
import path, { format } from "node:path"
import { promises as fs } from "node:fs"

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
    if (req.query.fileName) {
        let typeFormat = (req.query.format).split("/")[0]
        if (typeFormat === "video") {
            res.render("send", {
                file: true,
                user_file: "/uploads/" + req.query.fileName,
                format: "video",
                status: "file yuklandi"
            })
        } else if (typeFormat === "image") {
            res.render("send", {
                file: true,
                user_file: "/uploads/" + req.query.fileName,
                format: "image",
                status: "file yuklandi"
            })
        } else {
            res.render("send", {
                file: true,
                format: "",
                status: "file formati xato !!!"
            })
        }
    } else {
        res.render("send", {
            file: false
        })
    }
})

app.post("/send", upload.single("users_file"), async (req, res) => {
    if (!req.file) {
        return res.render("send", {
            file: true,
            status: "file kiritilmadi !!!",
            format: ""
        })
    }
    let data = JSON.parse(await fs.readFile("./src/json/data.json", "utf8"))
    let new_data = {
        fieldname: req.file.fieldname,
        mimetype: req.file.mimetype,
        filename: req.file.filename
    }
    data.push(new_data)
    await fs.writeFile("./src/json/data.json", JSON.stringify(data))
    res.redirect(`./send?fileName=${req.file.filename}&format=${req.file.mimetype}`)
})

app.get("/dashboard", async (req, res) => {
    let data = JSON.parse(await fs.readFile("./src/json/data.json", "utf8"))
    res.render("dashboard", {
        data
    })
})

app.get("/view", async (req, res) => {
    let data = JSON.parse(await fs.readFile("./src/json/data.json", "utf8"))
    res.render("view", {
        data
    })
})

app.listen(PORT, () => {
    console.log("port 3000");
})
