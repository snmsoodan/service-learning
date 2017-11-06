var nodemailer = require('nodemailer');

module.exports = function(app,organizationInfoModel) {

     // app.post('/api/userOrgInfo',addUserOrgInfo);

    app.get('/api/organization/organizationNames/applicationSubmitted/:id',getAllPartnerNamesApplicationsSubmitted)
    app.get('/api/organization/organizationNames/applicationInProgress/:id',getAllPartnerNamesApplicationsInProgress)

    app.get('/api/sendMail',sendMail)


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
            to: 'singh.sa@husky.neu.edu',
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

    
    function getAllPartnerNamesApplicationsSubmitted(req,res) {
        var id=req.params.id;
        organizationInfoModel.getAllPartnerNamesApplicationsSubmitted(id)
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
        organizationInfoModel.getAllPartnerNamesApplicationsInProgress(id)
            .then(
                function (res) {
                    res.json(res);
                },
                function (err) {
                    res.sendStatus(400);
                }
            )
    }
     // function addUserOrgInfo(req,res){
     //
     //     organizationInfoModel.addUserOrgInfo(req.body)
     //         .then(function(res) {
     //             console.log("server org info"+res);
     //             res.json(res);
     //         },function (err) {
     //             res.status(400).send(err);
     //         });
     // }
}