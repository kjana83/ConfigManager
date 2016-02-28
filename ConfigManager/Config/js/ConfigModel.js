var ConfigMgr;
(function (ConfigMgr) {
    var ConfigModel = (function () {
        function ConfigModel(ConnectionStrings, AppSettings, EndPoints, Name) {
            this.ConnectionStrings = ConnectionStrings;
            this.AppSettings = AppSettings;
            this.EndPoints = EndPoints;
            this.Name = Name;
        }
        return ConfigModel;
    })();
    ConfigMgr.ConfigModel = ConfigModel;
})(ConfigMgr || (ConfigMgr = {}));
