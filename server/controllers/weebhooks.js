import { Webhook } from "svix"
import User from "../models/userModel.js"

export const clerkwebhook = async (req, res) => {
  try {
    const WEBHOOKS_SECRET = process.env.CLERK_WEBHOOKS_SECRET
    if (!WEBHOOKS_SECRET) {
      throw new Error("Missing Clerk Webhook Secret")
    }

    const payload = req.body
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    }

    const wh = new Webhook(WEBHOOKS_SECRET)

    let evt
    try {
      evt = wh.verify(payload, headers)
    } catch (err) {
      console.error("Webhook verification failed:", err.message)
      return res.status(400).json({ message: "Webhook verification failed" })
    }

    console.log("Webhook event:", evt)

    if (evt.type === "user.created") {
      const email =
        evt.data.email_addresses?.[0]?.email_address || null

      const newUser = new User({
        clerkId: evt.data.id,
        username: evt.data.username || email,
        email,
      })

      await newUser.save()
      console.log("User saved to DB:", newUser)
    }

    res.status(200).json({ message: "Webhook handled" })
  } catch (error) {
    console.error("Webhook error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}