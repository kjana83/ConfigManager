module ConfigMgr{
    interface IDataAccessService{
        configData():ng.resource.IResourceClass<IConfigService>;
        configTask():ng.resource.IResourceClass<IConfigService>;
    }
    
    interface IConfigService extends ng.resource.IResource<ConfigMgr.ConfigModel>{
        
    }
    
    export class ConfigService implements IDataAccessService{
        static $inject = ["$resource"];
        constructor(private $resource=ng.resource.IResourceService ){} 
        
        configData():ng.resource.IResourceClass<IConfigService>{
            return this.$resource('/api/Config/:Name');
        }
        configTask():ng.resource.IResourceClass<IConfigService>{
            return this.$resource('/api/Task');
        } 
    }
      
} 