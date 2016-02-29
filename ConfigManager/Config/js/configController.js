var ConfigMgr;
(function (ConfigMgr) {
    var ConfigController = (function () {
        function ConfigController(configService) {
            var _this = this;
            this.configService = configService;
            var resource = this.configService.configData();
            resource.get({ Name: "Papillon" }, function (data) {
                _this.ConfigModel = data;
            });
            this.File = ["Papillon", "PapServices", "HealthCentre"];
        }
        ConfigController.prototype.SelectFile = function () {
            var _this = this;
            var resource = this.configService.configData();
            resource.get({ Name: this.ConfigModel.Name }, function (data) {
                _this.ConfigModel = data;
            });
        };
        ConfigController.prototype.SaveConfig = function () {
            var _this = this;
            var resource = this.configService.configData();
            resource.save(this.ConfigModel, function () { console.log('Success'); _this.Reset(); }, function () { console.log('Failure'); });
        };
        ConfigController.prototype.Reset = function () {
            this.ConfigModel.AppSettings.forEach(function (setting) {
                setting.ShowInput = false;
            });
            this.ConfigModel.ConnectionStrings.forEach(function (setting) {
                setting.ShowInput = false;
            });
        };
        ConfigController.prototype.RestartSite = function () {
            var resource = this.configService.configTask();
            resource.save({ "Name": "RestartIIS" });
        };
        ConfigController.prototype.ClearCache = function () {
            var resource = this.configService.configTask();
            resource.save({ "Name": "ClearCache" });
        };
        ConfigController.$inject = ["configService"];
        return ConfigController;
    })();
    ConfigMgr.ConfigController = ConfigController;
})(ConfigMgr || (ConfigMgr = {}));
