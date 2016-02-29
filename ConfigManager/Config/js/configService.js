var ConfigMgr;
(function (ConfigMgr) {
    var ConfigService = (function () {
        function ConfigService($resource) {
            if ($resource === void 0) { $resource = ng.resource.IResourceService; }
            this.$resource = $resource;
        }
        ConfigService.prototype.configData = function () {
            return this.$resource('/api/Config/:Name');
        };
        ConfigService.prototype.configTask = function () {
            return this.$resource('/api/Task');
        };
        ConfigService.$inject = ["$resource"];
        return ConfigService;
    })();
    ConfigMgr.ConfigService = ConfigService;
})(ConfigMgr || (ConfigMgr = {}));
