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
    
    public partial class Neighborhoods
    {
        public Neighborhoods()
        {
            this.Listings = new HashSet<Listings>();
            this.Schools = new HashSet<Schools>();
        }
    
        public int ID { get; set; }
        public string NAME1 { get; set; }
        public string NAME2 { get; set; }
        public string ALT_NAME1 { get; set; }
        public string ALT_NAME2 { get; set; }
        public string City_Name { get; set; }
        public string City_Code { get; set; }
        public Nullable<double> Longitude { get; set; }
        public Nullable<double> Latitude { get; set; }
        public System.Data.Entity.Spatial.DbGeometry SP_GEOMETRY { get; set; }
    
        public virtual ICollection<Listings> Listings { get; set; }
        public virtual ICollection<Schools> Schools { get; set; }
    }
}
