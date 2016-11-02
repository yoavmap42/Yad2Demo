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

        [Route("GetCitiesByArea")]
        public HttpResponseMessage GetCitiesByArea(int area)
        {
            var response = new HttpResponseMessage();
            List<PolyLayerViewModel> cities;
            try
            {
                cities = _mapService.GetCitiesByArea(area);
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

        [Route("GetNeighborhoodsByCity")]
        public HttpResponseMessage GetNeighborhoodsByCity(string city)
        {
            var response = new HttpResponseMessage();
            List<PolyLayerViewModel> neighborhoods;
            try
            {
                neighborhoods = _mapService.GetNeighborhoodsByCity(city);
            }
            catch (Exception e)
            {
                response.StatusCode = HttpStatusCode.BadRequest;
                response.Content = new ObjectContent<string>(e.Message, new JsonMediaTypeFormatter());
                return response;
            }
            response.StatusCode = HttpStatusCode.OK;
            response.Content = new ObjectContent<List<PolyLayerViewModel>>(neighborhoods, new JsonMediaTypeFormatter());
            return response;
        }

        [Route("GetAdsByNeighborhood")]
        public HttpResponseMessage GetAdsByNeighborhood(int nid)
        {
            var response = new HttpResponseMessage();
            List<ListingsLayerViewModel> ads;
            try
            {
                ads = _mapService.GetAdsByNeighborhood(nid);
            }
            catch (Exception e)
            {
                response.StatusCode = HttpStatusCode.BadRequest;
                response.Content = new ObjectContent<string>(e.Message, new JsonMediaTypeFormatter());
                return response;
            }
            response.StatusCode = HttpStatusCode.OK;
            response.Content = new ObjectContent<List<ListingsLayerViewModel>>(ads, new JsonMediaTypeFormatter());
            return response;
        }

        [HttpGet]
        [Route("FindAdsInPolygon")]
        public HttpResponseMessage FindAdsInPolygon(string poly)
        {
            var response = new HttpResponseMessage();
            List<ListingsLayerViewModel> ads;
            try
            {
                ads = _mapService.FindAdsInPolygon(poly);
            }
            catch (Exception e)
            {
                response.StatusCode = HttpStatusCode.BadRequest;
                response.Content = new ObjectContent<string>(e.Message, new JsonMediaTypeFormatter());
                return response;
            }
            response.StatusCode = HttpStatusCode.OK;
            response.Content = new ObjectContent<List<ListingsLayerViewModel>>(ads, new JsonMediaTypeFormatter());
            return response;
        }

        [Route("GetSchoolsByCity")]
        public HttpResponseMessage GetSchoolsByCity(string city)
        {
            var response = new HttpResponseMessage();
            List<SchoolsLayerViewModel> schools;
            try
            {
                schools = _mapService.GetSchoolsByCity(city);
            }
            catch (Exception e)
            {
                response.StatusCode = HttpStatusCode.BadRequest;
                response.Content = new ObjectContent<string>(e.Message, new JsonMediaTypeFormatter());
                return response;
            }
            response.StatusCode = HttpStatusCode.OK;
            response.Content = new ObjectContent<List<SchoolsLayerViewModel>>(schools, new JsonMediaTypeFormatter());
            return response;
        }

        [Route("GetPolutionPoints")]
        public HttpResponseMessage GetPolutionPoints()
        {
            var response = new HttpResponseMessage();
            List<PolutionLayerViewModel> polution;
            try
            {
                polution = _mapService.GetPolutionPoints();
            }
            catch (Exception e)
            {
                response.StatusCode = HttpStatusCode.BadRequest;
                response.Content = new ObjectContent<string>(e.Message, new JsonMediaTypeFormatter());
                return response;
            }
            response.StatusCode = HttpStatusCode.OK;
            response.Content = new ObjectContent<List<PolutionLayerViewModel>>(polution, new JsonMediaTypeFormatter());
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
