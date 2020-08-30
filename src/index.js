const express = require('express');

const app = express();

app.get('/', (req, res) => res.json({ message: 'Hello!' }));

const port = process.env.PORT || 8080;

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`listening on port: ${port}`));
