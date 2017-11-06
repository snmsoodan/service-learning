module.exports = function(app,partnerOrgInfoModel) {

     app.post('/api/userOrgInfo',addUserOrgInfo);
     app.get('/api/getUserOrgId/:userId',getUserOrgId);

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
        partnerOrgInfoModel.getUserOrgId(userId)
            .then(function(doc){
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }
};