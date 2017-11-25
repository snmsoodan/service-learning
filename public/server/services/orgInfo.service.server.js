var nodemailer = require('nodemailer');

var fs    = require("fs");

module.exports = function(app,orgInfoModel) {

    app.post('/api/addOrgInfo',addOrgInfo);
    app.get('/api/getAllOrg',getAllOrg);
    app.get('/api/getOrg/:orgId',getOrgById);
    app.get('/api/organization/organizationNames/applicationSubmitted/:id',getAllPartnerNamesApplicationsSubmitted);
    app.get('/api/organization/organizationNames/applicationInProgress/:id',getAllPartnerNamesApplicationsInProgress);
    app.post('/api/organization/updateOrg',updateOrg);

    app.get('/api/sendMail',sendMail);

    //try export
    app.get('/api/testExport',testExport);
    //////////////


    function sendMail(req,res) {

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'sanamsoodan@gmail.com',
                pass: ''
            }
        });



        var mailOptions = {
            from: 'sanamsoodan@gmail.com',
            to: 'raju.al@husky.neu.edu',
            subject: 'Sending Email using Node.js',
            text: 'That was easy!'
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

    }


    //test export

    function testExport(req,res) {

        console.log("reached in service server for testExports")

        var fileId = '1j3uvKWN9IUj_scJ1ilBzDnbcMQkVpea2SDyXECkqMKY';
        var dest = fs.createWriteStream('./resume.pdf');
        console.log(dest)

        drive.files.export({
            fileId: fileId,
            mimeType: 'application/pdf'
        })
            .on('end', function () {
                console.log('Done');
            })
            .on('error', function (err) {
                console.log('Error during download', err);
            })
            .pipe(dest);
    }


    ////////////////////////////////////


    function addOrgInfo(req,res){

        orgInfoModel.addOrgInfo(req.body)
            .then(function(info) {
                res.json(info);
            },function (err) {
                res.status(400).send(err);
            });
    }

    function getAllOrg(req,res) {
        console.log("in get all server");
        orgInfoModel.getAllOrg()
            .then(function (allOrg) {
                    res.json(allOrg);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function getOrgById(req,res){
        var orgId =req.params.orgId;
        orgInfoModel.getOrgById(orgId)
            .then(function(org){
                    res.json(org);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }


    function getAllPartnerNamesApplicationsSubmitted(req,res) {
        var id=req.params.id;
        orgInfoModel.getAllPartnerNamesApplicationsSubmitted(id)
            .then(
                function (res) {
                    res.json(res);
                },
                function (err) {
                    res.sendStatus(400);
                }
            )
    }

    function getAllPartnerNamesApplicationsInProgress(req,res) {
        var id=req.params.id;
        orgInfoModel.getAllPartnerNamesApplicationsInProgress(id)
            .then(
                function (res) {
                    res.json(res);
                },
                function (err) {
                    res.sendStatus(400);
                }
            )
    }

    function updateOrg(req,res) {
        var id = req.body;

        orgInfoModel.getOrgById(id.orgId).then(
            function(res) {
                console.log(' Method :: updateOrg ::  orgInfoModel.findById '+res);
                var OrgInfoUpdate = res;
                OrgInfoUpdate.status = id.status;
                orgInfoModel.updateOrgById(OrgInfoUpdate).then(
                    function(res){
                        res.json(res);
                    },function(err){
                        res.sendStatus(400);
                    })
            } , function(err) {
                res.sendStatus(400);
            });

    }


};