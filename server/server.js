const { v4: uuidv4 } = require('uuid');
const express = require('express');
const app = express();

let connections = {};

app.get('/sse', (req, res) => {
  const id = uuidv4();
  connections[id] = res;

  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
  });

  req.on('close', () => {
    delete connections[id];
  });

  const message = JSON.stringify({ id, initial: true });
  res.write(`data: ${message} \n\n`);

  setInterval(() => {
    for (let id in connections) {
      connections[id].write(`data: "ping" \n\n`);
    }
  }, 50000);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Server started on port', PORT);
});
