using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Spatial;
using Microsoft.SqlServer.Types;
using System.Data.Entity.Spatial;

namespace Yad2.Demo.UI.Models
{
    public class BaseLayerViewModel
    {
        public string Id { get; set; }
        public string NameEng { get; set; }
        public string Name { get; set; }
        // public Geometry Geometry { get; set; }
        // public SqlGeometry Geometry { get; set; }
        public DbGeometry Geometry { get; set; }
    }

    public class PolyLayerViewModel : BaseLayerViewModel
    {
        public string BgColor { get; set; }
        public string BorderColor { get; set; }
        public string LabelColor { get; set; }
        public string LabelBorderColor { get; set; }
        public int BorderWidth { get; set; }
        public int LabelBorderWidth { get; set; }
        public int AdCount { get; set; }
    }

    public class ListingsLayerViewModel : BaseLayerViewModel
    {
        public double? Rooms { get; set; }
        public string Pic { get; set; }
        public string Address { get; set; }
        public int? Price { get; set; }
        public decimal? Sqft { get; set; }
        public bool? IsAgency { get; set; }
        public bool? IsNew { get; set; }
    }

    public class SchoolsLayerViewModel : BaseLayerViewModel
    {
        public int Rank { get; set; }
    }

    public class PolutionLayerViewModel : BaseLayerViewModel
    {
        public double Level { get; set; }
    }
}