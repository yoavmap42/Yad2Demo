using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Spatial;
using Microsoft.SqlServer.Types;
using System.Data.Entity.Spatial;

namespace Yad2.Demo.UI.Models
{
    public class PolyLayerViewModel
    {
        public string Id { get; set; }
        public string NameEng { get; set; }
        public string Name { get; set; }
        public string BgColor { get; set; }
        public string BorderColor { get; set; }
        public string LabelColor { get; set; }
        public string LabelBorderColor { get; set; }
        public int BorderWidth { get; set; }
        public int LabelBorderWidth { get; set; }
        // public Geometry Geometry { get; set; }
        // public SqlGeometry Geometry { get; set; }
        public DbGeometry Geometry { get; set; }
    }
}