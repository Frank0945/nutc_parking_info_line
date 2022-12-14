const express = require("express");
const request = require("request");

const app = express();

app.get('/', (req, res) => {
    request('http://apps.nutc.edu.tw/getParking/showParkingData.php', ((error, response, body) => {

        let rtnData = {
            "中正": {
                max: 0,
                progress: 0
            },
            "中商": {
                max: 0,
                progress: 0
            },
            "中技": {
                max: 0,
                progress: 0
            },
            updateTime: ""
        }

        let data = body;

        Object.keys(rtnData).forEach((key) => {
            if (key == 'updateTime') return;
            rtnData[key].max = getAllParkingAmount(key, data);
            rtnData[key].progress = getRemainingParkingAmount(key, data);
        });


        let updateTime = getUpdateTime(data);
        let h = Number(updateTime.substring(0, 2));
        let hName = "上午 "

        if (h > 12) {
            hName = "下午 "
            h -= 12
            if (h < 10) {
                updateTime = "0" + h + updateTime.slice(2)
            } else {
                updateTime = h.toString() + updateTime.slice(2)
            }
        } else if (h == 0) {
            updateTime = "12" + updateTime.slice(2)
        }

        rtnData.updateTime = hName + updateTime;

        res.json(rtnData);
    }));
});

const getAllParkingAmount = (parkingLot, data) => {
    return data
        .split(parkingLot)[1]
        .split("partIn partHide")[1]
        .split('>')[1]
        .split('<')[0];
}

const getRemainingParkingAmount = (parkingLot, data) => {
    return data
        .split(parkingLot)[1]
        .split("tableShowHide('partIn');")[3]
        .split('">')[1]
        .split('<')[0];
}

const getUpdateTime = (data) => {
    return data.split('class="partFoot">')[2].split("<")[0];
}

const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Listening on port ${port}`))