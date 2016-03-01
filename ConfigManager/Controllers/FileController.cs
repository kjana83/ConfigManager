using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ConfigManager.Controllers
{
    public class FileController : ApiController
    {
        public HttpResponseMessage Get(string name)
        {
            string contents;

            using (var streamReader = new StreamReader(name))
            {
                contents = streamReader.ReadToEnd();
            }
            return this.Request.CreateResponse(HttpStatusCode.OK, contents);
        }
    }
}
