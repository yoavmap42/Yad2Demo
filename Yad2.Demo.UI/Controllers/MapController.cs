using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Web.Http;
using Yad2.Demo.UI.Models;
using Yad2.Demo.UI.Services.MapService;

namespace Yad2.Demo.UI.Controllers
{
    public class MapController : ApiController
    {
        public IMapService _mapService { get; set; }

        [Route("GetAreas")]
        public HttpResponseMessage GetAreas()
        {
            var response = new HttpResponseMessage();
            List<PolyLayerViewModel> areas;
            try
            {
                areas = _mapService.GetAreas();
            }
            catch (Exception e)
            {
                response.StatusCode = HttpStatusCode.BadRequest;
                response.Content = new ObjectContent<string>(e.Message, new JsonMediaTypeFormatter());
                return response;
            }
            response.StatusCode = HttpStatusCode.OK;
            response.Content = new ObjectContent<List<PolyLayerViewModel>>(areas, new JsonMediaTypeFormatter());
            return response;
        }

        [Route("GetCities")]
        public HttpResponseMessage GetCities()
        {
            var response = new HttpResponseMessage();
            List<PolyLayerViewModel> cities;
            try
            {
                cities = _mapService.GetCities();
            }
            catch (Exception e)
            {
                response.StatusCode = HttpStatusCode.BadRequest;
                response.Content = new ObjectContent<string>(e.Message, new JsonMediaTypeFormatter());
                return response;
            }
            response.StatusCode = HttpStatusCode.OK;
            response.Content = new ObjectContent<List<PolyLayerViewModel>>(cities, new JsonMediaTypeFormatter());
            return response;
        }

        public MapController(IMapService MapService)
        {
            _mapService = MapService;
        }
    }
}
