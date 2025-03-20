"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
// import "./styles.css";

export default function Home() {
  const [notificationSent, setNotificationSent] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isClient, setIsClient] = useState(false); // Ensure correct hydration

  useEffect(() => {
    setIsClient(true); // Mark component as client-rendered
    if ("Notification" in window && Notification.permission !== "denied") {
      Notification.requestPermission();
    }
  }, []);

  const handleSendNotification = () => {
    setShowPopup(true);
    setNotificationSent(true);
    setTimeout(() => setNotificationSent(false), 3000);

    if (Notification.permission === "granted") {
      new Notification("DiGiLABS Notification", {
        body: "You have a new notification!",
        icon: "/notification-icon.png",
      });
    }
  };

  if (!isClient) return null; // Prevent mismatched SSR content

  return (
    <main className="app-container">
      <div className="content-wrapper">
        <h1 className="title">Hola!</h1>

        <div className="notification-icon-wrapper">
          <div className="circle outer"></div>
          <div className="circle middle"></div>
          <div className="icon-container">
            <img
              src="/bell-icon.png"
              alt="Notification Bell"
              width="200"
              height="200"
              className={notificationSent ? "animate" : ""}
            />
          </div>
        </div>
        <div className="text">
          <h2 className="heading">Lorem Ipsum...</h2><br/>
          <p className="subtitle">Lorem ipsum dolor sit amet.</p>
        </div>
        <button
          className="notification-button"
          onClick={handleSendNotification}
        >
          Send Notification
        </button>
      </div>

      {showPopup && (
        <div className="notification-popup">
          <div className="popup-content">
            <div className="popup-header">
              <h3>Notification Received</h3>
              <button
                className="close-button"
                onClick={() => setShowPopup(false)}
              >
                <X size={20} />
              </button>
            </div>
            <p>You have received a new notification!</p>
          </div>
        </div>
      )}
    </main>
  );
}
