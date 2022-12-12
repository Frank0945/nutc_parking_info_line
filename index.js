const express = require("express");
const request = require("request");

const app = express();

app.get('/', (req, res) => {
    res.send("<h1>It's working 🤗</h1>")
});

const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Listening on port ${port}`))