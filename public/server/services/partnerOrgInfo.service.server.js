module.exports = function(app,partnerOrgInfoModel) {

     app.post("api/userOrgInfo",addUserOrgInfo);

     function addUserOrgInfo(req,res){

         console.log("service server user org info");
         partnerOrgInfoModel.addUserOrgInfo(req.body)
             .then(function (res) {
                 res.json(res);
             },function (err) {
                 res.status(400).send(err);
             });
     }

};