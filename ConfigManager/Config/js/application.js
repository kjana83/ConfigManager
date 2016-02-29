var ConfigMgr;
(function (ConfigMgr) {
    angular.module('ConfigMgr', ['ngResource'])
        .service('configService', ConfigMgr.ConfigService)
        .controller("configController", ConfigMgr.ConfigController);
})(ConfigMgr || (ConfigMgr = {}));
