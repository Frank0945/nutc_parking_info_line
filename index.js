const express = require("express");
const request = require("request");

const app = express();

app.get('/', (req, res) => {
    request('http://apps.nutc.edu.tw/getParking/showParkingData.php', ((error, response, body) => {
        res.json({ msg: body, error: error, response: response });
    }));
});

const port = process.env.PORT || 80
app.listen(port, () => console.log(`Listening on port ${port}`))