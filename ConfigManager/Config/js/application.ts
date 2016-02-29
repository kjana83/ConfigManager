module ConfigMgr {
    angular.module('ConfigMgr',['ngResource'])
    .service('configService',ConfigService)
    .controller("configController",ConfigController);
}