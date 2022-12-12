const express = require("express");
const request = require("request");

const app = express();

app.get('/', (req, res) => {
    request(
        'https://www.whatismyip.com.tw/tw/', ((error, response, body) => {
            res.json({ msg: body, error: error, response: response });
        }));
});
app.listen(process.env.PORT || 8080);