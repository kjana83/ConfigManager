using ConfigManager.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ConfigManager.Controllers
{
    public class TaskController : ApiController
    {
        public HttpResponseMessage Post(TaskModel Task)
        {
            var taskFile = ConfigurationManager.AppSettings[Task.Name];
            if (string.IsNullOrEmpty(taskFile) == false)
                Process.Start(taskFile);

            return this.Request.CreateResponse(HttpStatusCode.OK);
        }
    }
}
