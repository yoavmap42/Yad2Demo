using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Yad2.Demo.DAL;

namespace Yad2.Demo.BL
{
    public class RegionManager :IDisposable
    {
        private Yad2Entities _db;




        public RegionManager()
        {
            _db = new Yad2Entities();
        }

        public void Dispose()
        {
            _db.Dispose();
        }
    }
}
