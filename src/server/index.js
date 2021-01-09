const express = require('express');
const path = require('path');

const buildDir = path.join(process.cwd() + '/build');

const app = express();
app.use(express.static(buildDir));

app.get('/*', (_, res) => {
  res.sendFile(path.join(buildDir, 'index.html'));
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
