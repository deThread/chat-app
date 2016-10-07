const P2P = require('socket.io-p2p');
const io = require('socket.io-client');
const socket = io();

// const opts = { autoUpgrade: false };
const p2p = new P2P(socket);
// const p2p = new P2P(socket, opts, () => {
//   console.log('Initiating connection.');
// });

// If autoUpdate = false, need to manually transition to a WebRTC connection
// p2p.usePeerConnection = true;
// p2p.upgrade();


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

    console.log('sent message', text);
    $('#message-container').append('<br>', text);
    p2p.emit('send-message', { message, user });
  }
}

// Review:
// 1 - server setup with socket.io-p2p
// 2 - emitting and broadcasting messages to all clients w/ sockets - messages must have the same name
