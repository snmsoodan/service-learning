module.exports = function(app,applicationInfoModel) {

     // app.post('/api/userOrgInfo',addUserOrgInfo);

    // app.get('/api/application/organizationNames/applicationSubmitted',getAllOrganizationIdApplicationSubmitted);
    app.get('/api/application/organizationNames/applicationInProgress',getAllOrganizationIdApplicationInProgress);

    app.get('/api/applpication/applicationNames/applicationSubmitted/:pid',getSpecificOrganizationSubmitted);
    app.get('/api/applpication/applicationNames/applicationInProgress/:pid',getSpecificOrganizationInProgress);

    app.get('/api/applpication/applicationDetail/applicationSubmitted/:prid',getSpecificApplicationSubmitted);
    app.get('/api/applpication/applicationDetail/applicationInProgress/:prid',getSpecificApplicationInProgress);


    // function getAllOrganizationIdApplicationSubmitted(req,res) {
    //     applicationInfoModel.getAllOrganizationIdApplicationSubmitted()
    //         .then(
    //             function (res) {
    //                 res.json(res);
    //             },
    //             function (err) {
    //                 res.sendStatus(400);
    //             }
    //         )
    // }

    function getAllOrganizationIdApplicationInProgress(req,res) {
        applicationInfoModel.getAllOrganizationIdApplicationInProgress()
            .then(
                function (res) {
                    res.json(res);
                },
                function (err) {
                    res.sendStatus(400);
                }
            )
    }

    function getSpecificOrganizationSubmitted(req,res) {
        var pid=req.params.pid;
        applicationInfoModel.getSpecificOrganizationSubmitted(pid)
            .then(
                function (res) {
                    res.json(res);
                },
                function (err) {
                    res.sendStatus(400);
                }
            )
    }

    function getSpecificOrganizationInProgress(req,res) {
        var pid=req.params.pid;
        applicationInfoModel.getSpecificOrganizationInProgress(pid)
            .then(
                function (res) {
                    res.json(res);
                },
                function (err) {
                    res.sendStatus(400);
                }
            )
    }


    function getSpecificApplicationSubmitted(req,res) {
        var prid=req.params.prid;
        applicationInfoModel.getSpecificApplicationSubmitted(prid)
            .then(
                function (res) {
                    res.json(res);
                },
                function (err) {
                    res.sendStatus(400);
                }
            )
    }

    function getSpecificApplicationInProgress(req,res) {
        var prid=req.params.prid;
        applicationInfoModel.getSpecificApplicationInProgress(prid)
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
     //     applicationInfoModel.addUserOrgInfo(req.body)
     //         .then(function(res) {
     //             console.log("server org info"+res);
     //             res.json(res);
     //         },function (err) {
     //             res.status(400).send(err);
     //         });
     // }
}