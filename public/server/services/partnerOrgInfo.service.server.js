module.exports = function(app,partnerOrgInfoModel) {

     app.post('/api/userOrgInfo',addUserOrgInfo);

     function addUserOrgInfo(req,res){

         partnerOrgInfoModel.addUserOrgInfo(req.body)
             .then(function(res) {
                 console.log("server org info"+res);
                 res.json(res);
             },function (err) {
                 res.status(400).send(err);
             });
     }
};