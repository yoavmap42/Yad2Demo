﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class Yad2Entities : DbContext
    {
        public Yad2Entities()
            : base("name=Yad2Entities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<iGoCity> iGoCity { get; set; }
        public virtual DbSet<iGoStreet> iGoStreet { get; set; }
        public virtual DbSet<MapaCity> MapaCity { get; set; }
        public virtual DbSet<MapaStreet> MapaStreet { get; set; }
        public virtual DbSet<MapiCity> MapiCity { get; set; }
        public virtual DbSet<MapiStreet> MapiStreet { get; set; }
        public virtual DbSet<Restaurants> Restaurants { get; set; }
        public virtual DbSet<Schools> Schools { get; set; }
        public virtual DbSet<Yad2_TA_BuildingPoints_Updated> Yad2_TA_BuildingPoints_Updated { get; set; }
        public virtual DbSet<Yad2Area> Yad2Area { get; set; }
        public virtual DbSet<Yad2City> Yad2City { get; set; }
        public virtual DbSet<Yad2Street> Yad2Street { get; set; }
        public virtual DbSet<AddressMaster> AddressMaster { get; set; }
        public virtual DbSet<Areas> Areas { get; set; }
        public virtual DbSet<Municipalities> Municipalities { get; set; }
        public virtual DbSet<Neighborhoods> Neighborhoods { get; set; }
        public virtual DbSet<Streets> Streets { get; set; }
        public virtual DbSet<Listings> Listings { get; set; }
    }
}
