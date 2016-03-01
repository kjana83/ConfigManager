using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.IO;
using System.Configuration;
using ConfigManager.Models;

namespace ConfigManager.Controllers
{
    public class FileInfoController : ApiController
    {
        public HttpResponseMessage Get(string name)
        {
            var files = Directory.GetFiles(ConfigurationManager.AppSettings[name]);
            var fileModelList = new List<FileModel>();
            foreach (var file in files)
            {
                var fileInfo = new FileInfo(file);
                fileModelList.Add(new FileModel
                {
                    Name = fileInfo.Name,
                    Path = fileInfo.FullName,
                    LastModified = fileInfo.LastWriteTime
                });

            }
            return this.Request.CreateResponse(HttpStatusCode.OK, fileModelList);
        }
    }
}
