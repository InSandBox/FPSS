const shortid = require('shortid');
const fs = require("fs");

exports.FUNCS = {
    generateId() {
        return shortid.generate();
    },

    getOLinkFromId(id) {
        var data = fs.readFileSync("./data.json").toString();
        var found = false;

        dataObj = JSON.parse(data);

        dataObj.forEach((elt, index) => {
            if (elt.id == id) {
                found = elt.olink;
                return found;
            }
        });
        return found;
    },

    getNLinkFromId(id) {
        var data = fs.readFileSync("./data.json").toString();
        var found = false;

        dataObj = JSON.parse(data);

        dataObj.forEach((elt, index) => {
            if (elt.id == id) {
                found = elt.nlink;
                return found;
            }
        });
        return found;
    },

    getVisitsFromId(id) {
        var data = fs.readFileSync("./data.json").toString();
        var found = false;

        dataObj = JSON.parse(data);

        dataObj.forEach((elt, index) => {
            if (elt.id == id) {
                found = elt.visits;
                return found;
            }
        });
        return found;
    },

    getLTypeFromId(id) {
        var data = fs.readFileSync("./data.json").toString();
        var found = false;

        dataObj = JSON.parse(data);

        dataObj.forEach((elt, index) => {
            if (elt.id == id) {
                found = elt.ltype;
                return found;
            }
        });
        return found;
    },

    getTitleFromId(id) {
        var data = fs.readFileSync("./data.json").toString();
        var found = false;

        dataObj = JSON.parse(data);

        dataObj.forEach((elt, index) => {
            if (elt.id == id) {
                found = elt.title;
                return found;
            }
        });
        return found;
    },

    getWholeObjectFromId(id) {
        var data = fs.readFileSync("./data.json").toString();
        var found = false;

        dataObj = JSON.parse(data);

        dataObj.forEach((elt, index) => {
            if (elt.id == id) {
                found = elt;
                return found;
            }
        });

        return found;
    },

    saveNewRecord(title, olink, ltype, nlink, id, ilink) {
        var data = fs.readFileSync("./data.json").toString();
        dataObj = JSON.parse(data);

        dataObj.push({
            "title": title,
            "olink": olink,
            "ltype": ltype,
            "nlink": nlink,
            "visits": 0,
            "id": id,
            "ilink" : ilink
        });

        fs.writeFileSync("./data.json", JSON.stringify(dataObj));
    },

    dataFromString(str) {
        var data_ret = str.split("&");

        return {
            "title": decodeURIComponent(data_ret[0]),
            "olink": decodeURIComponent(data_ret[1]),
            "ltype": decodeURIComponent(data_ret[2]),
            "oid": decodeURIComponent(data_ret[3]),
            "ilink" : decodeURIComponent(data_ret[4])
        }
    },

    incrVisits(id){
        var data = fs.readFileSync("./data.json").toString();

        dataObj = JSON.parse(data);

        dataObj.forEach((elt, index) => {
            if (elt.id == id) {
                elt.visits = elt.visits + 1 ;
                fs.writeFileSync("./data.json", JSON.stringify(dataObj));
                
                return;
            }
        });
    }
}