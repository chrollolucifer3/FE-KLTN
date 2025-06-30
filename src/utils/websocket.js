import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { getClientToken, getAdminToken } from "./localStorage"; // chú ý đúng đường dẫn

export const connectNotificationWS = (username, onMessage, role = "client") => {
  const socketUrl = "http://localhost:8080/ws";
  const token = role === "admin" ? getAdminToken() : getClientToken();

  const client = new Client({
    webSocketFactory: () => new SockJS(socketUrl),
    connectHeaders: {
      Authorization: `Bearer ${token}`,
    },
    debug: (str) => console.log(str),
    onConnect: () => {
      console.log("STOMP connected");
      client.subscribe("/user/queue/notifications", (message) => {
        if (message.body) {
          const data = JSON.parse(message.body);
          onMessage(data);
        }
      });
    },
    onStompError: (frame) => {
      console.error("STOMP error", frame);
    },
    onWebSocketError: (event) => {
      console.error("WebSocket error", event);
    },
    reconnectDelay: 5000,
  });

  client.activate();
  return client;
};
