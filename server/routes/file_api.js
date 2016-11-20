const AWS = require("../utils/aws_helper");
const CONSTANTS = require("../utils/constants");

const TEST = [
    {
        "id": "CLI1",
        "name": "client #1",
        "drugs": [
            {
                "id": "drug1",
                "name": "the first drug",
                "studies": [
                    {
                        "id": "STU1",
                        "name": "study #1",
                        "studies": null,
                        "deliverables": [
                            {
                                "id": "DEL1",
                                "name": "the first deliverable",
                                "date": "2016-11-02T04:00:00.000Z",
                                "checked": true
                            },
                            {
                                "id": "DEL2",
                                "name": "deliverable 2",
                                "date": "2016-11-15T05:00:00.000Z"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "CLI2",
        "name": "Toyota",
        "drugs": []
    },
    {
        "id": "CLI3",
        "name": "client $ 3 ralston purina",
        "drugs": [
            {
                "id": "DRU2",
                "name": "the second drug",
                "studies": [
                    {
                        "id": "STU1",
                        "name": "another study",
                        "studies": null,
                        "$$hashKey": "object:86",
                        "deliverables": [
                            {
                                "id": "DEL1",
                                "name": "the first deliveable",
                                "date": "2016-11-02T04:00:00.000Z"
                            }
                        ]
                    }
                ]
            }
        ]
    }
];

module.exports = function (app) {
    app.route('/files/client')
        .post(function (req, res) {
            const clientList = req.body;
            const bucket = CONSTANTS.client_file_info.bucket;
            const path = CONSTANTS.client_file_info.path + "-" + CONSTANTS.user_info.key;
            const nm =CONSTANTS.client_file_info.name;
            return AWS.createBucket(bucket).then(function(){
                return AWS.uploadText(bucket, path, JSON.stringify(clientList), nm).then(function(data){
                    console.log("aws returned - " + JSON.stringify(data));
                    res.json(clientList);
                })
            })
        })
        .get(function (req, res) {
            const bucket = CONSTANTS.client_file_info.bucket;
            const path = CONSTANTS.client_file_info.path + "-" + CONSTANTS.user_info.key;
            const nm =CONSTANTS.client_file_info.name;
            return AWS.readJSON(bucket, path, nm).then(function(data){
                res.json(data);
            }).catch(function(err){
                if(err.code == 'NoSuchKey'){
                    //this is the first time, so create the file
                    //res.json([]);
                    //for testing put some data in
                    res.json(TEST);
                }
                else{
                    throw err;
                }

            })

        });
};