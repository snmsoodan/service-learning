module.exports = function(app,partnerOrgInfoModel) {

    app.post('/api/userOrgInfo',addUserOrgInfo);
    app.get('/api/getUserOrgId/:userId',getUserOrgId);
    app.get("/api/getOrgId/:userId",getPartnerId);

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


    function getUserOrgId(req,res){
        var userId =req.params.userId;
        //console.log(' Method :: getUserOrgId :: userId'+userId);
        partnerOrgInfoModel.getUserOrgId(userId)
            .then(function(doc){
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }
};
