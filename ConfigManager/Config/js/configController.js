var ConfigMgr;
(function (ConfigMgr) {
    var ConfigController = (function () {
        function ConfigController(dataAccessService) {
            var _this = this;
            this.dataAccessService = dataAccessService;
            var resource = this.dataAccessService.getConfigData();
            resource.get({ Name: "Papillon" }, function (data) {
                _this.ConfigModel = data;
            });
            this.File = ["Papillon", "PapServices", "HealthCentre"];
        }
        ConfigController.prototype.SelectFile = function () {
            var _this = this;
            var resource = this.dataAccessService.getConfigData();
            resource.get({ Name: this.ConfigModel.Name }, function (data) {
                _this.ConfigModel = data;
            });
        };
        ConfigController.prototype.SaveConfig = function () {
            var resource = this.dataAccessService.setConfigData();
            resource.save(this.ConfigModel, function () { console.log('Success'); }, function () { console.log('Failure'); });
        };
        ConfigController.$inject = ["dataAccessService"];
        return ConfigController;
    })();
    ConfigMgr.ConfigController = ConfigController;
})(ConfigMgr || (ConfigMgr = {}));
