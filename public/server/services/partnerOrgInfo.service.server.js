module.exports = function(app,partnerOrgInfoModel) {

    app.post('/api/userOrgInfo',addUserOrgInfo);
    app.post('/api/getUserOrgId',getUserOrgId);

    function addUserOrgInfo(req,res){

        partnerOrgInfoModel.addUserOrgInfo(req.body)
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
};
