module.exports = function(app,orgInfoModel) {

    app.post('/api/addOrgInfo',addOrgInfo);
    app.get('/api/getAllOrg',getAllOrg);
    app.get('/api/getOrg/:orgId',getOrgById);


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
};