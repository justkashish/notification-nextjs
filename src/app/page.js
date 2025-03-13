"use client"

import { useState, useEffect } from "react"
import NotificationIcon from "@/components/notification-icon"
import "../styles/main.css"

export default function Home() {
  const [permission, setPermission] = useState("default")
  const [notificationSent, setNotificationSent] = useState(false)

  useEffect(() => {
    if ("Notification" in window) {
      setPermission(Notification.permission)
    }
  }, [])

  const handleSendNotification = async () => {
    if (!("Notification" in window)) {
      alert("This browser does not support notifications")
      return
    }

    if (permission !== "granted") {
      const newPermission = await Notification.requestPermission()
      setPermission(newPermission)

      if (newPermission !== "granted") {
        alert("Please allow notifications to use this feature")
        return
      }
    }

    try {
      if ("serviceWorker" in navigator && "PushManager" in window) {
        const registration = await navigator.serviceWorker.ready

        new Notification("DiGiLABS Notification", {
          body: "You have a new notification!",
          icon: "/icons/icon-192x192.png",
        })

        setNotificationSent(true)
        setTimeout(() => setNotificationSent(false), 3000)
      } else {
        new Notification("DiGiLABS Notification", {
          body: "You have a new notification!",
          icon: "/icons/icon-192x192.png",
        })

        setNotificationSent(true)
        setTimeout(() => setNotificationSent(false), 3000)
      }
    } catch (error) {
      console.error("Error sending notification:", error)
      alert("Failed to send notification")
    }
  }

  return (
    <main className="app-container">
      <div className="content-wrapper">
        <h1 className="title">Hola!</h1>

        <div className="icon-container">
          <NotificationIcon isAnimating={notificationSent} />
        </div>

        <h2 className="heading">Lorem Ipsum...</h2>
        <p className="subtitle">Lorem ipsum dolor sit amet.</p>

        <button className={`notification-button ${notificationSent ? "animate" : ""}`} onClick={handleSendNotification}>
          Send Notification
        </button>
      </div>
    </main>
  )
}

