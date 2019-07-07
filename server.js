const express = require('express');
const app = express();
const UT = require("./utils");
var path = require('path');
const https = require('https');


app.use(express.static('public'));

app.get('/create/:data_str', function (req, res) {
    var datas = UT.FUNCS.dataFromString(req.params.data_str);

    console.log("ssss"+req.params.data_str);

    if (datas.oid == "") {
        datas.oid = UT.FUNCS.generateId();
    } else if (UT.FUNCS.getTitleFromId(datas.oid) != false) {
        datas.oid = UT.FUNCS.generateId();
    } else if (datas.oid.length < 5) {
        datas.oid = UT.FUNCS.generateId();
    }


    let api_link = "";

    switch (datas.ltype) {
        case "BU":
            api_link = "https://bit-url.com/api?api=8f995773db46e83f58209211b269c7e6354dec0f&url=" + datas.olink + "&format=text";
            break;
        case "CW":
            api_link = "https://cutwin.com/api/?api=be717f0271d7dcfa1259e633064735c2cef72910&url=" + datas.olink + "&format=text";
            break;
        case "CF":
            api_link = "https://clicksfly.com/api?api=d229be310fe17f56dcd75a01028504f57741d0d5&url=" + datas.olink + "&format=text";
            break;

    }



    //GET NEW LINKS USING API CALLS

    https.get(api_link, (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {

            var nlink = data;
            
            console.log(nlink);

            //SAVE DATA (NEW RECORD)

            UT.FUNCS.saveNewRecord(datas.title, datas.olink, datas.ltype, nlink, datas.oid, datas.ilink);

            res.end("http://localhost:3000/"+datas.oid);
        })


    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });

});

app.get('/get/:file_id', function (req, res) {
    console.log("nob");

    var datas = UT.FUNCS.getWholeObjectFromId(req.params.file_id);

    if (!datas) {
        return res.end('error');
    }

    console.log(datas);

    res.json({
        "title": datas.title,
        "nlink": "https://www.youtube.com/redirect?v=H87umCem6pY&redir_token=6-qVLjqGrYRJW6aiSUSpQi0lAgB8MTU2MjYxNTg2NEAxNTYyNTI5NDY0&q=" + datas.nlink,
        "ilink" : datas.ilink
    });

    res.end();

    UT.FUNCS.incrVisits(req.params.file_id);
});


app.get('/info/:file_id', function (req, res) {
    console.log("nob");

    var datas = UT.FUNCS.getWholeObjectFromId(req.params.file_id);

    if (!datas) {
        return res.end('error');
    }

    res.json(datas);
});

app.get('/:file_id', function (req, res) {
    res.sendFile(path.join(__dirname + "/public/notindex.html"));
});

app.listen(3000, console.log("Working...."));