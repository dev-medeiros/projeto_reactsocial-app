require('dotenv').config();

// a
const express = require('express');
const path = require('path');
const cors = require('cors');

const port = process.env.PORT;

const app = express();

// configurar JSON and form data response
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
const router = require('./routes/Router.js');

app.use(router);

app.listen(port, () => {
    console.log(`Server rodando na porta ${port}`);
    });
