const WebSocket = require("ws");

// Create the WebSocket server
const server = new WebSocket.Server({ port: 3000 });

console.log(`[${new Date().toISOString()}] WebSocket server is running on ws://localhost:3000`);

// Maintain a list of connected clients
const clients = new Set();

// Handle new client connections
server.on("connection", (socket) => {
    console.log(`[${new Date().toISOString()}] New client connected!`);

    // Add the new client to the set
    clients.add(socket);

    // Handle incoming messages from clients
    socket.on("message", (data) => {
        try {
            // Log and parse the received message
            const message = data.toString();
            console.log(`[${new Date().toISOString()}] Received: ${message}`);

            // Broadcast the message to all connected clients except the sender
            for (const client of clients) {
                if (client !== socket && client.readyState === WebSocket.OPEN) {
                    client.send(message);
                }
            }
        } catch (error) {
            console.error(`[${new Date().toISOString()}] Error processing message:`, error.message);
        }
    });

    // Handle client disconnection
    socket.on("close", () => {
        console.log(`[${new Date().toISOString()}] Client disconnected!`);
        clients.delete(socket);
    });

    // Handle errors
    socket.on("error", (err) => {
        console.error(`[${new Date().toISOString()}] Socket error:`, err.message);
    });
});
