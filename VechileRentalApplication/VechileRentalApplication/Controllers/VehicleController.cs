using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
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

        //Implementation of Linear Search
        public List<Vehicle> LinearSearch(string searchQuery)
        {
            List<Vehicle> results = new List<Vehicle>();
            var vehicles = _context.Vehicles.ToList();

            foreach (var vehicle in vehicles)
            {
                if (vehicle.Name.ToLower().Contains(searchQuery.ToLower()) ||
                    vehicle.Details.ToLower().Contains(searchQuery.ToLower()))
                {
                    results.Add(vehicle);
                }
            }

            return results;
        }


        //Implementation of Userbased Collaborating Filtering
        public class UserBasedCollaborativeFiltering
        {
            public double CalculateSimilarity(Vehicle vehicle1, Vehicle vehicle2)
            {
                double sumSquaredDiff = Math.Pow(vehicle1.Id- vehicle2.Id, 2);
                return 1.0 / (1.0 + Math.Sqrt(sumSquaredDiff));
            }

            public List<Vehicle> FilterVehicles(List<Vehicle> vehicles, Vehicle targetVehicle, int numNeighbors)
            {
                List<Vehicle> filteredVehicles = new List<Vehicle>();

                foreach (var vehicle in vehicles)
                {
                    if (vehicle.Name == targetVehicle.Name && vehicle.VehicleTypeId == targetVehicle.VehicleTypeId && vehicle != targetVehicle)
                    {
                        double similarity = CalculateSimilarity(vehicle, targetVehicle);
                        filteredVehicles.Add(vehicle);
                    }
                }

                filteredVehicles.Sort((v1, v2) => v2.CreatedOn.CompareTo(v1.CreatedOn));

                return filteredVehicles.GetRange(0, Math.Min(numNeighbors, filteredVehicles.Count));
            }
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
