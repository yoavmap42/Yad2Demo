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
    
    public partial class MapaStreet
    {
        public MapaStreet()
        {
            this.AddressMaster = new HashSet<AddressMaster>();
        }
    
        public int MapaStreetID { get; set; }
        public string MapaStreetCode { get; set; }
        public string MapaStreetName { get; set; }
        public string MapaCityCode { get; set; }
        public string MaxHouseNo { get; set; }
        public string MapaCityName { get; set; }
    
        public virtual MapaCity MapaCity { get; set; }
        public virtual ICollection<AddressMaster> AddressMaster { get; set; }
    }
}
