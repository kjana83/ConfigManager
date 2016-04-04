using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ConfigManager.Models
{
    public class FileModel
    {
        public string Name { get; set; }
        public string Path { get; set; }
        public DateTime LastModified { get; set; }

    }
}