const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.json({
        status: "API Online",
        service: "Broward County Roleplay"
    })
})

app.post("/api/roblox", (req, res) => {

    const data = req.body

    console.log("Roblox data received:")
    console.log(data)

    res.json({
        success: true
    })

})

app.listen(3000, () => {
    console.log("API running on port 3000")
})