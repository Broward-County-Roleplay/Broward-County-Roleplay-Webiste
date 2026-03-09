const express = require("express")
const cors = require("cors")
const fetch = require("node-fetch")
const app = express()

app.use(cors())
app.use(express.json())

const DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1480620136984612946/oaGqGMRLSlGOJlYJ9Rn9zja1wfVJQKh-O-wP56zwQVJI4eWpnZKslG-8iQze50404k2k"

let playerCount = 0 // 👈 Track player count

app.get("/", (req, res) => {
    res.json({ status: "API Online", service: "Broward County Roleplay" })
})

app.post("/api/roblox", async (req, res) => {
    const data = req.body
    console.log("Roblox data received:", data)

    if (data.action === "join") {
        playerCount++
        await fetch(DISCORD_WEBHOOK, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                content: `🟢 **${data.username}** joined! | 👥 Players online: **${playerCount}**`
            })
        })
    }

    if (data.action === "leave") {
        playerCount--
        await fetch(DISCORD_WEBHOOK, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                content: `🔴 **${data.username}** left! | 👥 Players online: **${playerCount}**`
            })
        })
    }

    res.json({ success: true })
})

// Post player count every 5 minutes
setInterval(async () => {
    await fetch(DISCORD_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            content: `📊 **Live Player Count:** ${playerCount} players currently in Broward County Roleplay`
        })
    })
}, 5 * 60 * 1000)

app.listen(3000, () => {
    console.log("API running on port 3000")
})