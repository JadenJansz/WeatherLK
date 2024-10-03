const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const webpush = require("web-push");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

webpush.setVapidDetails(
  "mailto:jadenjansz@gmail.com",
  "BGxnuqEGIu0Od2fdejFzZxzo4PibpY0aAzM5sjfOD4c7qkpTWdaApCJahHtD5DOZhCaIVCXZu38ST6n3TTsLsYw",
  "rHn7zr2lW0E2sH9XNe2PgAGG_CWLkOv0SCO6ZnzEE2w"
);

let subscriptions = [];

app.post("/subscribe", (req, res) => {
  const subscription = req.body;
  subscriptions.push(subscription);
  res.status(201).json({});
});

app.post("/message", (req, res) => {
  const { message } = req.body;
  io.emit("newMessage", message);

  // Send push notification to all subscribed clients
  subscriptions.forEach((subscription) => {
    webpush
      .sendNotification(
        subscription,
        JSON.stringify({
          title: "New Message",
          body: message,
        })
      )
      .catch((error) => {
        console.error("Error sending push notification:", error);
      });
  });

  res.sendStatus(200);
});

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

app.get("/vapidPublicKey", (req, res) => {
  res.json({ publicKey: vapidKeys.publicKey });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
