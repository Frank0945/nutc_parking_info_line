const express = require("express");
const request = require("request");

const app = express();

app.get('/', (req, res) => {
    request('https://myip.com.tw/', ((error, response, body) => {
        res.json({ msg: body, error: error, response: response });
    }));
});

const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Listening on port ${port}`))