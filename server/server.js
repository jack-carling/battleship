const { v4: uuidv4 } = require('uuid');
const express = require('express');
const app = express();

let connections = {};
let rooms = {};
let ready = [];

app.get('/sse', (req, res) => {
  const id = uuidv4();
  connections[id] = res;
  connections[id].room = '';

  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Cache-Control': 'no-transform',
  });

  req.on('close', () => {
    const room = connections[id].room;
    delete connections[id];
    ready = ready.filter((id) => id !== id);
    if (room) {
      const playerOne = rooms[room]?.playerOne;
      const playerTwo = rooms[room]?.playerTwo;
      const message = JSON.stringify({ disconnect: true });
      connections[playerOne]?.write(`data: ${message} \n\n`);
      connections[playerTwo]?.write(`data: ${message} \n\n`);
      delete rooms[room];
    }
  });

  const message = JSON.stringify({ id, initial: true });
  res.write(`data: ${message} \n\n`);

  setInterval(() => {
    for (let id in connections) {
      connections[id].write(`data: "ping" \n\n`);
    }
  }, 50000);

  console.log('Connections:', Object.keys(connections).length);
});

app.post('/sse/ready', (req, res) => {
  const id = req.query.id;
  ready.push(id);
  getOpponent();
  res.send({ success: true });
});

function getOpponent() {
  if (ready.length > 1) {
    const id = uuidv4();
    const playerOne = ready[0];
    const playerTwo = ready[1];
    connections[playerOne].room = id;
    connections[playerTwo].room = id;
    rooms[id] = { playerOne, playerTwo };
    ready.splice(0, 2);
    const message = JSON.stringify({ id, ready: true });
    connections[playerOne].write(`data: ${message} \n\n`);
    connections[playerTwo].write(`data: ${message} \n\n`);
  }
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Server started on port', PORT);
});
