using System.IO;
using System.Web;
using ConfigManager.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.ServiceModel.Configuration;
using System.Web.Configuration;
using System.Web.Http;

namespace ConfigManager.Controllers
{
    public class ConfigController : ApiController
    {

        public HttpResponseMessage Get(string name)
        {
            var configModel = new ConfigModel
            {
                ConnectionStrings = new List<KeyValueModel>(),
                AppSettings = new List<KeyValueModel>(),
                EndPoints = new List<KeyValueModel>(),
                Name= name
            };

            var fileName = ConfigurationManager.AppSettings[name];
            var config = ConfigController.OpenConfigFile(fileName); // WebConfigurationManager.OpenWebConfiguration(fileName);

            var section = (ConnectionStringsSection)config.GetSection("connectionStrings");
            var count = section.ConnectionStrings.Count;
            foreach (ConnectionStringSettings st in section.ConnectionStrings)
            {
                configModel.ConnectionStrings.Add(new KeyValueModel
                {
                    Name = st.Name,
                    Value = st.ConnectionString
                });
            }

            var settings = config.AppSettings.Settings;
            foreach (KeyValueConfigurationElement st in settings)
            {
                configModel.AppSettings.Add(new KeyValueModel
                {
                    Name = st.Key,
                    Value = st.Value
                });
            }

            var endPoint = (ClientSection)config.GetSection("system.serviceModel/client");
            foreach (ChannelEndpointElement ep in endPoint.Endpoints)
            {
                configModel.EndPoints.Add(new KeyValueModel
                                              {
                                                  Name = ep.Name,
                                                  Value = ep.Address.ToString()
                                              });
            }
            return this.Request.CreateResponse(HttpStatusCode.OK, configModel);
        }

        public HttpResponseMessage Post(ConfigModel configModel)
        {

            var process = Process.Start(HttpContext.Current.Server.MapPath("~") + @"\Batches\" + configModel.Name + "Start.bat");
            var fileName = ConfigurationManager.AppSettings[configModel.Name];

            var config = ConfigController.OpenConfigFile(fileName); ;
            var section = (ConnectionStringsSection)config.GetSection("connectionStrings");
            
            foreach(var connString in configModel.ConnectionStrings)
            {
                section.ConnectionStrings[connString.Name].ConnectionString = connString.Value;
            }
            var settings = config.AppSettings.Settings;
            foreach (KeyValueConfigurationElement st in settings)
            {
                var key = configModel.AppSettings.FirstOrDefault(p => p.Name == st.Key);
                if (key != null)
                    st.Value = key.Value;
            }

            var endPoint = (ClientSection)config.GetSection("system.serviceModel/client");
            foreach (ChannelEndpointElement ep in endPoint.Endpoints)
            {
                var key = configModel.EndPoints.FirstOrDefault(p => p.Name == ep.Name);
                if (key !=null)
                    ep.Address=new Uri(key.Value);
            }
            process.WaitForExit();
            config.Save();
            Process.Start(HttpContext.Current.Server.MapPath("~") + @"\Batches\" + configModel.Name + "Stop.bat");
            //var resetFile = ConfigurationManager.AppSettings["Reset"];
            //if (string.IsNullOrEmpty(resetFile)==false)
            //    Process.Start(resetFile);
            return this.Request.CreateResponse(HttpStatusCode.OK);
        }

        private static Configuration OpenConfigFile(string physicalPath)
        {
            string dummyVirtualPath = "/MyApp";
            WebConfigurationFileMap map = new WebConfigurationFileMap();
            map.VirtualDirectories.Add(dummyVirtualPath, new VirtualDirectoryMapping(physicalPath, true));
            return WebConfigurationManager.OpenMappedWebConfiguration(map, dummyVirtualPath,"Dummy");

            //var configFile = new FileInfo(configPath);
            //var vdm = new VirtualDirectoryMapping(configFile.DirectoryName, true, configFile.Name);
            //var wcfm = new WebConfigurationFileMap();
            //wcfm.VirtualDirectories.Add("/", vdm);
            //return WebConfigurationManager.OpenMappedWebConfiguration(wcfm, "/", "PruHealth.Papillon.Web");
        }
    }
}
