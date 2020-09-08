const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.get('/', (req, res) => res.json({ message: 'Hello!' }));

const port = process.env.PORT || 8080;

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`listening on port: ${port}`));
