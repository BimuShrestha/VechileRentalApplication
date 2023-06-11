using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using VechileRentalApplication.Data;

namespace VechileRentalApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FuelTypeController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public FuelTypeController(ApplicationDbContext vmsDbContext)
        {
            _context = vmsDbContext;
        }
        // GET api/vehicles
        [HttpGet]
        [Route("api/fueltypes")]
        public IActionResult GetFuelTypes()
        {
            var fueltypes = _context.FuelTypes.ToList();
            return Ok(fueltypes);
        }
    }
}
