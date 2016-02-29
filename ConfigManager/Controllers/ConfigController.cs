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
                Name= name
            };

            var fileName = ConfigurationManager.AppSettings[name];
            var config = WebConfigurationManager.OpenWebConfiguration(fileName);

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
                
            }
            return this.Request.CreateResponse(HttpStatusCode.OK, configModel);
        }

        public HttpResponseMessage Post(ConfigModel configModel)
        {
            var fileName = ConfigurationManager.AppSettings[configModel.Name];

            var config = WebConfigurationManager.OpenWebConfiguration(fileName);
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
            config.Save();
            var resetFile = ConfigurationManager.AppSettings["Reset"];
            if (string.IsNullOrEmpty(resetFile)==false)
                Process.Start(resetFile);
            return this.Request.CreateResponse(HttpStatusCode.OK);
        }
    }
}
