var ConfigMgr;
(function (ConfigMgr) {
    angular.module('ConfigMgr', ['ngResource'])
        .service('dataAccessService', ConfigMgr.ConfigService)
        .controller("configController", ConfigMgr.ConfigController);
})(ConfigMgr || (ConfigMgr = {}));
