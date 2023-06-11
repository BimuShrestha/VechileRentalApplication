using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using VechileRentalApplication.Data;

namespace VechileRentalApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehicleTypeController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public VehicleTypeController(ApplicationDbContext vmsDbContext)
        {
            _context = vmsDbContext;
        }
        // GET api/vehicles
        [HttpGet]
        [Route("api/vehicles")]
        public IActionResult GetVehicleTypes()
        {
            var vehicleTypes = _context.VehicleTypes.ToList();
            return Ok(vehicleTypes);
        }
    }
}
