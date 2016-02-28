module ConfigMgr {

    export class ConfigModel {
       
           constructor( public ConnectionStrings: any[],
            public AppSettings: any[],
            public EndPoints: any[],
            public Name: string
           ){}
    }
}