const express = require("express")
const cors = require("cors")
const fetch = require("node-fetch")
const app = express()

app.use(cors())
app.use(express.json())

const DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1480620136984612946/oaGqGMRLSlGOJlYJ9Rn9zja1wfVJQKh-O-wP56zwQVJI4eWpnZKslG-8iQze50404k2k" // 🔁 Paste your webhook URL

app.get("/", (req, res) => {
    res.json({ status: "API Online", service: "Broward County Roleplay" })
})

app.post("/api/roblox", async (req, res) => {
    const data = req.body
    console.log("Roblox data received:")
    console.log(data)

    // Send to Discord
    await fetch(DISCORD_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            content: `🟢 **${data.username}** joined Broward County Roleplay!`
        })
    })

    res.json({ success: true })
})

app.listen(3000, () => {
    console.log("API running on port 3000")
})