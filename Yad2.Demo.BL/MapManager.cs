using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Yad2.Demo.DAL;

namespace Yad2.Demo.BL
{
    public class MapManager :IDisposable
    {
        private Yad2Entities _db;

        public IEnumerable<Areas> GetAllAreas()
        {
            return _db.Areas;
        }

        public Areas GetAreaById(int id)
        {
            return _db.Areas.SingleOrDefault(x => x.ID == id);
        }

        public IEnumerable<Municipalities> GetAllCities()
        {
            return _db.Municipalities;
        }

        public IEnumerable<Municipalities> GetCitiesByArea(int areaId)
        {
            return _db.Municipalities.Where(x=> x.AreaID == areaId);
        }

        public Municipalities GetCityByCode(string code)
        {
            return _db.Municipalities.SingleOrDefault(x => x.MunicipalCode == code);
        }

        public IEnumerable<Neighborhoods> GetNeighborhoodsByCity(string city)
        {
            return _db.Neighborhoods.Where(x => x.City_Code == city);
        }

        public IEnumerable<Listings> GetListingsByNeighborhood(int nid)
        {
            return _db.Listings.Where(x => x.ShchunaID == nid);
        }

        public MapManager()
        {
            _db = new Yad2Entities();
        }

        public void Dispose()
        {
            _db.Dispose();
        }
    }
}
