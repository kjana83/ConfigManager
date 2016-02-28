module ConfigMgr {
    angular.module('ConfigMgr',['ngResource'])
    .service('dataAccessService',ConfigService)
    .controller("configController",ConfigController);
}