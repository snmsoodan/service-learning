module.exports = function(app,partnerOrgInfoModel) {

    app.post('/api/userOrgInfo',addUserOrgInfo);
    app.post('/api/getUserOrgId',getUserOrgId);
    app.post('/api/updateOrgUserInfo',updateOrgUserInfo);
    app.post('/api/updateOrgUserInfo',updateOrgUserInfo);
    app.post('/api/getAllOrgUserInfo',getAllOrgUserInfo);

    function getPartnerId(req,res) {
        var userId=req.params.userId
        partnerOrgInfoModel.getPartnerId(userId)
            .then(function(info) {
                res.json(info);
            },function (err) {
                res.status(400).send(err);
            });
    }

    function addUserOrgInfo(req,res){

        partnerOrgInfoModel.addUserOrgInfo(req.body)
            .then(function(info) {
                res.json(info);
            },function (err) {
                res.status(400).send(err);
            });
    }

    function getAllOrgUserInfo(req,res){

        partnerOrgInfoModel.getAllOrgUserInfo()
            .then(function(info) {
                res.json(info);
            },function (err) {
                res.status(400).send(err);
            });
    }


    function getUserOrgId(req,res){
        var userId =req.body;
        console.log(' Method :: getUserOrgId :: userId'+userId._id);
        partnerOrgInfoModel.getUserOrgId(userId._id)
            .then(function(doc){
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }


    function updateOrgUserInfo(req,res){
        console.log(' Method :: updateOrgUserInfo :: userId'+req.body);
        partnerOrgInfoModel.updateOrgUserInfo(req.body)
            .then(function(info) {
                res.json(info);
            },function (err) {
                res.status(400).send(err);
            });
    }

};
