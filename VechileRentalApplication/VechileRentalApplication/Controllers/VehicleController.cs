using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using VechileRentalApplication.Data;
using VechileRentalApplication.Models;

namespace VechileRentalApplication.Controllers
{
    [ApiController]
    public class VehicleController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public VehicleController(ApplicationDbContext vmsDbContext)
        {
            _context = vmsDbContext;
        }

        // GET api/vehicles
        [HttpGet]
        [Route("api/vehicles")]
        public IActionResult GetVehicles()
        {
            var vehicles = _context.Vehicles.ToList();
            return Ok(vehicles);
        }

        // GET api/vehicles/{id}
        [HttpGet]
        [Route("api/vehicle")]
        public IActionResult GetVehicle(int id)
        {
            var vehicle = _context.Vehicles.FirstOrDefault(v => v.Id == id);
            if (vehicle == null)
                return NotFound();

            return Ok(vehicle);
        }

        // POST api/vehicles
        [HttpPost]
        [Route("api/vehicles/Create")]
        public IActionResult CreateVehicle(Vehicle vehicle)
        {
            _context.Vehicles.Add(vehicle);
            _context.SaveChanges();
            return Ok();
        }

        // PUT api/vehicles/{id}
        [HttpPut]
        [Route("api/vehicles/Update")]
        public IActionResult UpdateVehicle(Vehicle updatedVehicle)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var vehicle = _context.Vehicles.FirstOrDefault(v => v.Id == updatedVehicle.Id);
            if (vehicle == null)
                return NotFound();

            vehicle.Name = updatedVehicle.Name;
            vehicle.Details = updatedVehicle.Details;
            vehicle.VehicleTypeId = updatedVehicle.VehicleTypeId;
            vehicle.Attachment = updatedVehicle.Attachment;
            vehicle.FuelTypeId = updatedVehicle.FuelTypeId;
            _context.Vehicles.Update(vehicle);
            _context.SaveChanges();
            return Ok();
        }

        // DELETE api/vehicles/{id}
        [HttpDelete]
        [Route("api/vehicles/Delete")]
        public IActionResult DeleteVehicle(int id)
        {
            var vehicle = _context.Vehicles.FirstOrDefault(v => v.Id == id);
            if (vehicle == null)
                return NotFound();

            _context.Vehicles.Remove(vehicle);
            _context.SaveChanges();
            return Ok();
        }
    }
}
