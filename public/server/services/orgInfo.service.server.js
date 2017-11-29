var nodemailer = require('nodemailer');


var fs    = require("fs");


var bcrypt = require("bcrypt-nodejs");

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



    app.post('/api/sendMail',sendMail);
    app.post('/api/sendMailAp',sendMailAp);

    function sendMail(req,res) {
        console.log('----body-'+req.body);

        var user = req.body;
        user.password = 'Welcome@123';
        //user.password = bcrypt.hashSync(user.password);
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'serviceLearningNorthEdu@gmail.com',
                pass: 'serviceLearningNorthEdu@123'
            }
        });





        console.log('----mailOptions---user.username--'+user.username+'--password--'+user.password);

        var mailOptions = {
            from: 'passwordrecovery@northeastern.edu',
            to: user.username,
            subject: 'Service Learning :: New Password for Service Learning App',
            text: 'Dear User , \n As regards to your request for forgot password , kindly find new Credentials below .\n' +
            'UserName : '+user.username+' \n'+
            'Password : Welcome@123'};
        console.log('----mailOptions--'+mailOptions);
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
                res.status(400).send(error);
            } else {
                console.log('Email sent: ' + info.response);
                res.json(user);
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
                console.log(' Method :: updateOrg ::  orgInfoModel.updateOrgById '+OrgInfoUpdate);
                orgInfoModel.updateOrgById(OrgInfoUpdate).then(
                    function(res){
                        console.log(' Method :: updateOrg ::  orgInfoModel.updateOrgById Success '+res);
                        res.json(OrgInfoUpdate);
                    },function(err){
                        console.log(' Method :: updateOrg ::  orgInfoModel.updateOrgById Error '+err);
                        res.sendStatus(400);
                    });

            } , function(err) {
                res.sendStatus(400);
            });

    }

    function sendMailAp (req,res) {

        console.log('--Method :: sendMailAp --body-'+req.body);
        var user = req.body;
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'serviceLearningNorthEdu@gmail.com',
                pass: 'serviceLearningNorthEdu@123'
            }
        });
        console.log('----sendMailAp :: mailOptions---user.username--'+user.username+'--password--'+user.password);

        var mailOptions = {
            from: 'servicelearningnorthedu@gmail.com',
            to: user.username,
            subject: 'Service Learning :: Authentication Alerts for Service Learning App',
            text: 'Dear User , \n With regards to your request for new Login , your request has been '+user.status+' \n'+
            'Please login using the Credentials you have given at the time of registration '};
        console.log('----mailOptions--'+JSON.stringify(mailOptions));
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
                res.status(400).send(error);
            } else {
                console.log('Email sent: ' + info.response);
                res.json(user);
            }
        });
    }


};