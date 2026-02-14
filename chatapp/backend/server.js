const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

let clients = [];

wss.on("connection", (ws) => {
  console.log("New user connected");
  clients.push(ws);

  ws.on("message", (message) => {
    clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });

  ws.on("close", () => {
    console.log("User disconnected");
    clients = clients.filter((client) => client !== ws);
  });
});

console.log("✅ WebSocket server running on http://localhost:8080");
