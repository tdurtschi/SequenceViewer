using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(ProteinViewer.Startup))]
namespace ProteinViewer
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
