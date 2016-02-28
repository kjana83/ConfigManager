module ConfigMgr {
    interface IConfigModel {
        File: any[];
        ConfigModel : ConfigMgr.ConfigModel
        SelectFile(): void;
        SaveConfig(): void;
        dataAccessService:ConfigMgr.ConfigService;
    }

    export class ConfigController implements IConfigModel {
        
        File: any[];
        ConfigModel : ConfigMgr.ConfigModel;
        
        static $inject = ["dataAccessService"];
        constructor(public dataAccessService:ConfigMgr.ConfigService) {
            var resource = this.dataAccessService.getConfigData();
            resource.get({Name:"Papillon"},(data:ConfigMgr.ConfigModel)=>{
                this.ConfigModel = data;
            });
            this.File = ["Papillon", "PapServices", "HealthCentre"];
        }

        SelectFile() {
            var resource = this.dataAccessService.getConfigData();
            resource.get({Name:this.ConfigModel.Name},(data:ConfigMgr.ConfigModel)=>{
                this.ConfigModel = data;
            });
        }
        
        SaveConfig(){
            var resource = this.dataAccessService.setConfigData();
            resource.save(this.ConfigModel,
            ()=>{console.log('Success')},
            ()=>{console.log('Failure')});
        }
    }
}
