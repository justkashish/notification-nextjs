export async function POST(request) {
    try {
        const { title, body, tag } = await request.json()

        // In a real application, you would use a push service
        // to send notifications to subscribed clients

        return Response.json({
            success: true,
            message: "Notification sent successfully",
        })
    } catch (error) {
        console.error("Error sending notification:", error)
        return Response.json({ success: false, message: "Failed to send notification" }, { status: 500 })
    }
}