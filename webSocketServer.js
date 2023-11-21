const WebSocket = require('ws');
const fs=require('fs');

const wss = new WebSocket.Server({ port: 9500 });

// Store references to all connected clients
const clients = new Set();

wss.on('connection', ws => {
    console.log('Connection established');
    
    // Add the new client to the set
    clients.add(ws);

    ws.on('close', () => {
        console.log('Connection closed');
        // Remove the client when the connection is closed
        clients.delete(ws);
    });

    ws.on('message', data => {
        // Broadcast the received message to all clients
        broadcast(data);
        console.log(data.toString('utf-8'));
    });
});

// Function to broadcast a message to all connected clients
function broadcast(data) {
    const vdo=fs.readFileSync('video.mp4');
    clients.forEach(client => {

        if (client.readyState === WebSocket.OPEN) {
            // Send the data to the client
            client.send(vdo);
        }
    });
}
