//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Yad2.Demo.DAL
{
    using System;
    using System.Collections.Generic;
    
    public partial class AirQualityStations
    {
        public short ID { get; set; }
        public string Station_Name { get; set; }
        public Nullable<double> Pollution_Level { get; set; }
        public Nullable<double> X { get; set; }
        public Nullable<double> Y { get; set; }
        public System.Data.Entity.Spatial.DbGeometry SP_GEOMETRY { get; set; }
    }
}
