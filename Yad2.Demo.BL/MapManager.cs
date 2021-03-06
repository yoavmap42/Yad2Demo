﻿using System;
using System.Collections.Generic;
using System.Data.Entity.Spatial;
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
            return _db.Listings.Where(x => x.ShchunaID == nid && x.IsSold == false);
        }

        public int GetListingsCountByArea(int aid)
        {
            return _db.Listings.Include("Municipalities").Count(x => x.Municipalities.AreaID == aid && x.IsSold == false);
        }

        public int GetListingsCountByCity(string cid)
        {
            return _db.Listings.Count(x => x.CityCode == cid && x.IsSold == false);
        }

        public int GetListingsCountByNeighborhood(int nid)
        {
            return _db.Listings.Count(x => x.ShchunaID == nid && x.IsSold == false);
        }

        public IEnumerable<Listings> GetListingsInPolygon(string poly)
        {
            var result = _db.GetPointsInPolygonResult(DbGeometry.FromText(poly, 4326));
            return result;
            throw new NotImplementedException();
        }

        public IEnumerable<Schools> GetSchoolsByCity(string code)
        {
            return _db.Schools.Where(x => x.CityCode == code);
        }

        public IEnumerable<Schools> GetSchoolsByNeighborhood(int nid)
        {
            return _db.Schools.Where(x => x.ShchunaID == nid);
        }

        public IEnumerable<AirQualityStations> GetPolutionPoints()
        {
            return _db.AirQualityStations;
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
