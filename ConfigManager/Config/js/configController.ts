module ConfigMgr {
    interface IConfigModel {
        File: any[];
        ConfigModel : ConfigMgr.ConfigModel
        SelectFile(): void;
        SaveConfig(): void;
        Reset():void;
        RestartSite():void;
        ClearCache():void;
        configService:ConfigMgr.ConfigService;
    }

    export class ConfigController implements IConfigModel {
        
        File: any[];
        ConfigModel : ConfigMgr.ConfigModel;
        
        static $inject = ["configService"];
        constructor(public configService:ConfigMgr.ConfigService) {
            var resource = this.configService.configData();
            resource.get({Name:"Papillon"},(data:ConfigMgr.ConfigModel)=>{
                this.ConfigModel = data;
            });
            this.File = ["Papillon", "PapServices", "HealthCentre"];
        }

        SelectFile() {
            var resource = this.configService.configData();
            resource.get({Name:this.ConfigModel.Name},(data:ConfigMgr.ConfigModel)=>{
                this.ConfigModel = data;
            });
        }
        
        SaveConfig(){
            var resource = this.configService.configData();
            resource.save(this.ConfigModel,
            ()=>{console.log('Success');this.Reset()},
            ()=>{console.log('Failure')});
        }
        
        Reset(){
            this.ConfigModel.AppSettings.forEach(setting => {
                setting.ShowInput = false;
            });
            
            this.ConfigModel.ConnectionStrings.forEach(setting => {
                setting.ShowInput = false;
            });
        }
        
        RestartSite(){
            var resource = this.configService.configTask();
            resource.save({"Name":"RestartIIS"});
        }
        ClearCache(){
            var resource = this.configService.configTask();
            resource.save({"Name":"ClearCache"});
        }
    }
}
