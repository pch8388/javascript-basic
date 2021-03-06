const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'html')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'html', 'index.html'));
});
app.get('/rpg', (req, res) => {
  res.sendFile(path.join(__dirname, 'html', 'rpg.html'));
});
app.get('/mini', (req, res) => {
  res.sendFile(path.join(__dirname, 'html', 'miniP.html'));
});
app.listen(8080, () => {
  console.log('Express App on port 8080!');
});