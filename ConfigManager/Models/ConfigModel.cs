using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ConfigManager.Models
{
    public class ConfigModel
    {
        public IList<KeyValueModel> ConnectionStrings { get; set; }
        public IList<KeyValueModel> AppSettings { get; set; }
        public IList<KeyValueModel> EndPoints { get; set; }
        public string Name { get; set; }

    }
}