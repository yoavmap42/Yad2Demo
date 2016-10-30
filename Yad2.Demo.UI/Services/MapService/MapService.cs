using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Yad2.Demo.UI.Models;
using Yad2.Demo.BL;
using System.Globalization;
namespace Yad2.Demo.UI.Services.MapService
{
    public class MapService : IMapService
    {
        public List<PolyLayerViewModel> GetAreas()
        {
            using (var manager = new MapManager())
            {
                return manager.GetAllAreas().Select(x => new PolyLayerViewModel
                {
                    Name = x.AreaName,
                    Geometry = x.SP_GEOMETRY,
                    Id = x.ID.ToString(),
                    BgColor = "rgba(64, 0, 128, 0.1)",
                    BorderColor = "rgba(255, 165, 0, 1)",
                    BorderWidth = 3,
                    //  LabelBorderColor = "rgba(255, 165, 0, 1)",
                    //  LabelBorderWidth = 1,
                    LabelColor = "rgba(255, 255, 255, 1)"
                }).ToList();
            }
        }

        public List<PolyLayerViewModel> GetCitiesByArea(int area)
        {
            using (var manager = new MapManager())
            {
                return manager.GetCitiesByArea(area).Select(x => new PolyLayerViewModel
                {
                    Name = x.MunicipalName,
                    Geometry = x.SP_GEOMETRY,
                    Id = x.MunicipalCode,
                    BgColor = "rgba(64, 0, 128, 0.1)",
                    BorderColor = "rgba(255, 165, 0, 1)",
                    BorderWidth = 3,
                    //  LabelBorderColor = "rgba(255, 165, 0, 1)",
                    //  LabelBorderWidth = 1,
                    LabelColor = "rgba(255, 255, 255, 1)"
                }).ToList();
            }
        }

        public List<PolyLayerViewModel> GetNeighborhoodsByCity(string city)
        {
            using (var manager = new MapManager())
            {
                return manager.GetNeighborhoodsByCity(city).Select(x => new PolyLayerViewModel
                {
                    Name = x.NAME2,
                    Geometry = x.SP_GEOMETRY,
                    Id = x.ID.ToString(),
                    BgColor = "rgba(64, 0, 128, 0.1)",
                    BorderColor = "rgba(255, 165, 0, 1)",
                    BorderWidth = 3,
                    //  LabelBorderColor = "rgba(255, 165, 0, 1)",
                    //  LabelBorderWidth = 1,
                    LabelColor = "rgba(255, 255, 255, 1)"
                }).ToList();
            }
        }

        public List<PolyLayerViewModel> GetAdsByNeighborhood(int nid)
        {
            using (var manager = new MapManager())
            {
                return manager.GetListingsByNeighborhood(nid).Select(x => new PolyLayerViewModel
                {
                    Name = x.Price.HasValue ? x.Price.Value.ToString("C0", new CultureInfo("he-IL", false)) : "0",
                    Geometry = x.SP_GEOMETRY,
                    Id = x.ID.ToString(),
                    Pic = x.PicRef.HasValue ? x.PicRef.Value.ToString() : "",
                    Rooms = x.Rooms
                }).ToList();
            }
        }

        public List<PolyLayerViewModel> GetCities()
        {
            using (var manager = new MapManager())
            {
                return manager.GetAllCities().Select(x => new PolyLayerViewModel
                {
                    Name = x.MunicipalName,
                    Geometry = x.SP_GEOMETRY,
                    Id = x.MunicipalCode,
                    BgColor = "rgba(64, 0, 128, 0.1)",
                    BorderColor = "rgba(255, 165, 0, 1)",
                    BorderWidth = 3,
                    //  LabelBorderColor = "rgba(255, 165, 0, 1)",
                    //  LabelBorderWidth = 1,
                    LabelColor = "rgba(255, 255, 255, 1)"
                }).ToList();
            }
        }

        public void Dispose()
        {
        }
    }
}