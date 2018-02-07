using System.Web.Mvc;

namespace ProteinViewer.Controllers
{
    public class HomeController : Controller
    {
        /// <summary>
        /// Main application page.
        /// </summary>
        public ActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// Page for initial upload of Protein data.
        /// (Easier to convert to JSON and pass in than to read directly for this exercise.)
        /// </summary>
        /// <returns>A small javascript program that uploads data.</returns>
        public ActionResult UploadUtility()
        {
            return View();
        }
    }
}