const P2P = require('socket.io-p2p');
const io = require('socket.io-client');
const socket = io();

const opts = { autoUpgrade: true };
const p2p = new P2P(socket, opts);

p2p.on('ready', () => {
  // p2p.usePeerConnection = true;
  console.log('client ready');
  p2p.upgrade();
});

p2p.on('socket-connected', (data) => {
  console.log(data);
});

p2p.on('send-message', (data) => {
  console.log('received outgoing', data)
  const text = `${data.user}: ${data.message}`;
  $('#message-container').append('<br>', text);
});

$('#message').on('keydown', sendMessage);
$('#user').on('keydown', sendMessage);

function sendMessage(e) {
  if (e.key === 'Enter') {
    const user = $('#user').val();
    const message = $('#message').val();
    const text = `${user}: ${message}`;

    $('#message-container').append('<br>', text);
    p2p.emit('send-message', { message, user });
  }
}

// Review:
// 1 - server setup with socket.io-p2p
// 2 - emitting and broadcasting messages to all clients - messages must have the same name
