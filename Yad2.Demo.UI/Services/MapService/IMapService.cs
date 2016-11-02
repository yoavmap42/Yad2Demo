using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Yad2.Demo.UI.Models;

namespace Yad2.Demo.UI.Services.MapService
{
    public interface IMapService : IService
    {
        List<PolyLayerViewModel> GetAreas();


        List<PolyLayerViewModel> GetCities();

        List<PolyLayerViewModel> GetCitiesByArea(int area);

        List<PolyLayerViewModel> GetNeighborhoodsByCity(string city);

        List<ListingsLayerViewModel> GetAdsByNeighborhood(int nid);

        List<SchoolsLayerViewModel> GetSchoolsByCity(string city);

        List<PolutionLayerViewModel> GetPolutionPoints();

        List<ListingsLayerViewModel> FindAdsInPolygon(string poly);
    }
}