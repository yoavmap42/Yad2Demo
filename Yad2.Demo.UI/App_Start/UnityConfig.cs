using Microsoft.Practices.Unity;
using System.Web.Http;
using Unity.WebApi;
using Yad2.Demo.UI.Services.MapService;

namespace Yad2.Demo.UI
{
    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
			var container = new UnityContainer();
            
            // register all your components with the container here
            // it is NOT necessary to register your controllers

            container.RegisterType<IMapService, MapService>();
            
            GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(container);
        }
    }
}