using ProteinViewer.Repository;
using System;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Results;

namespace ProteinViewer.Controllers
{
    [RoutePrefix("api/protein")]
    public class ProteinController : ApiController
    {
        private ProteinRepository _proteinRepository;

        public ProteinController()
        {
            _proteinRepository = new ProteinRepository();
        }

        [HttpGet]
        public JsonResult<Protein[]> Index()
        {
            Protein[] proteins = _proteinRepository.LoadAll().ToArray<Protein>();

            return Json(proteins);
        }

        [Route("add")]
        [HttpPost]
        public IHttpActionResult Add(Protein protein)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest();
            }

            try
            {
                _proteinRepository.Add(protein);

                return Ok();
            }
            catch (Exception Ex)
            {
                return InternalServerError(Ex);
            }
        }

        [Route("addMany")]
        [HttpPost]
        //Used during initial data upload.
        public IHttpActionResult AddMany(Protein[] proteins)
        {
            if (!ModelState.IsValid || proteins.Length == 0)
            {
                return BadRequest();
            }

            try
            {
                _proteinRepository.Add(proteins);

                return Ok();
            }
            catch (Exception Ex)
            {
                return InternalServerError(Ex);
            }
        }
    }
}
