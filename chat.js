// WebSocket 연결을 초기화합니다.
const socket = new WebSocket('wss://your-websocket-server.com');

socket.onopen = function(event) {
    console.log("Connection established");
};

socket.onmessage = function(event) {
    const message = JSON.parse(event.data);
    addMessageToChat(message.username, message.text);
};

function sendMessage(text) {
    const message = { username: "User", text: text };
    socket.send(JSON.stringify(message));
}
function sendMessage() {
    const message = messageInput.value.trim();
    if (!message) {
        alert("메시지를 입력해주세요.");
        return;
    }
    // 메시지 전송 로직...
}
function addMessageToChat(username, text) {
    const messageElement = document.createElement('div');
    messageElement.textContent = text;
    // 삭제 버튼 추가
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function() {
        messageElement.remove();
    };
    messageElement.appendChild(deleteButton);
    chat.appendChild(messageElement);
}
// Socket.IO를 사용한 간단한 예시
const server = require('http').createServer();
const io = require('socket.io')(server);

io.on('connection', socket => {
    console.log('클라이언트가 연결되었습니다.');

    socket.on('sendMessage', message => {
        io.emit('receiveMessage', message); // 모든 클라이언트에 메시지 전송
    });

    socket.on('disconnect', () => {
        console.log('클라이언트가 연결을 끊었습니다.');
    });
});

server.listen(3000, () => console.log('서버가 3000포트에서 실행 중입니다.'));
// JWT를 사용한 인증 예시 (서버 측)
const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key';

// 토큰 생성
function generateToken(userId) {
    return jwt.sign({ id: userId }, secretKey, { expiresIn: '1h' });
}

// 토큰 검증
function verifyToken(token) {
    return jwt.verify(token, secretKey);
}
