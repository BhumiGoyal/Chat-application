const socket = new WebSocket("ws://localhost:3000");

const chatDisplay = document.getElementById("chat-display");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");

// Function to display messages
function displayMessage(message, isUser = false) {
    const messageElement = document.createElement("div");
    messageElement.textContent = message;

    // Apply styling based on whether it's the user's message or another user's message
    messageElement.classList.add(isUser ? "user-message" : "other-message");

    chatDisplay.appendChild(messageElement);
    chatDisplay.scrollTop = chatDisplay.scrollHeight; // Auto-scroll to bottom
}

// Display incoming messages
socket.onmessage = (event) => {
    const message = event.data;
    displayMessage(message, false); // False means message from another user
};

// Send messages
sendButton.addEventListener("click", () => {
    const message = messageInput.value.trim();
    if (message) {
        socket.send(message);
        displayMessage(message, true); // True means message from the user
        messageInput.value = "";
    }
});

messageInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        sendButton.click();
    }
});
