module ConfigMgr{
    interface IDataAccessService{
        getConfigData():ng.resource.IResourceClass<IConfigService>;
        setConfigData():ng.resource.IResourceClass<IConfigService>;
    }
    
    interface IConfigService extends ng.resource.IResource<ConfigMgr.ConfigModel>{
        
    }
    
    export class ConfigService implements IDataAccessService{
        static $inject = ["$resource"];
        constructor(private $resource=ng.resource.IResourceService ){} 
        
        getConfigData():ng.resource.IResourceClass<IConfigService>{
            return this.$resource('/api/Config/:Name');
        } 
        setConfigData(){
            return this.$resource('/api/Config');
        } 
    }
      
} 