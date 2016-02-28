var ConfigMgr;
(function (ConfigMgr) {
    var ConfigService = (function () {
        function ConfigService($resource) {
            if ($resource === void 0) { $resource = ng.resource.IResourceService; }
            this.$resource = $resource;
        }
        ConfigService.prototype.getConfigData = function () {
            return this.$resource('/api/Config/:Name');
        };
        ConfigService.prototype.setConfigData = function () {
            return this.$resource('/api/Config');
        };
        ConfigService.$inject = ["$resource"];
        return ConfigService;
    })();
    ConfigMgr.ConfigService = ConfigService;
})(ConfigMgr || (ConfigMgr = {}));
