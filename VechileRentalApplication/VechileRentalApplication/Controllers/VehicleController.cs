using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using VechileRentalApplication.Models;

namespace VechileRentalApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehicleController : ControllerBase
    {
        private List<Vehicle> vehicles; // In-memory storage, replace with a database context

        // GET api/vehicles
        [HttpGet]
        public IActionResult GetVehicles()
        {
            return Ok(vehicles);
        }

        // GET api/vehicles/{id}
        [HttpGet("{id:int}")]
        public IActionResult GetVehicle(int id)
        {
            var vehicle = vehicles.FirstOrDefault(v => v.Id == id);
            if (vehicle == null)
                return NotFound();

            return Ok(vehicle);
        }

        // POST api/vehicles
        [HttpPost]
        public IActionResult CreateVehicle(Vehicle vehicle)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var newId = vehicles.Count + 1;
            vehicle.Id = newId;

            vehicles.Add(vehicle);

            return CreatedAtAction(nameof(GetVehicle), new { id = newId }, vehicle);
        }

        // PUT api/vehicles/{id}
        [HttpPut("{id:int}")]
        public IActionResult UpdateVehicle(int id, Vehicle updatedVehicle)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var vehicle = vehicles.FirstOrDefault(v => v.Id == id);
            if (vehicle == null)
                return NotFound();

            vehicle.Name = updatedVehicle.Name;
            vehicle.Details = updatedVehicle.Details;
            vehicle.VehicleTypeId = updatedVehicle.VehicleTypeId;
            vehicle.AttachmentId = updatedVehicle.AttachmentId;
            vehicle.FuelTypeId = updatedVehicle.FuelTypeId;

            return NoContent();
        }

        // DELETE api/vehicles/{id}
        [HttpDelete("{id:int}")]
        public IActionResult DeleteVehicle(int id)
        {
            var vehicle = vehicles.FirstOrDefault(v => v.Id == id);
            if (vehicle == null)
                return NotFound();

            vehicles.Remove(vehicle);

            return NoContent();
        }
    }
}
