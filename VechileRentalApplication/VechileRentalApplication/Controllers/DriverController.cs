using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using VechileRentalApplication.Models;

namespace VechileRentalApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DriverController : ControllerBase
    {
        private List<Driver> drivers; 

        // GET api/drivers
        [HttpGet]
        public IActionResult GetDrivers()
        {
            return Ok(drivers);
        }

        // GET api/drivers/{id}
        [HttpGet("{id:int}")]
        public IActionResult GetDriver(int id)
        {
            var driver = drivers.FirstOrDefault(d => d.Id == id);
            if (driver == null)
                return NotFound();

            return Ok(driver);
        }

        // POST api/drivers
        [HttpPost]
        public IActionResult CreateDriver(Driver driver)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var newId = drivers.Count + 1;
            driver.Id = newId;

            drivers.Add(driver);

            return CreatedAtAction(nameof(GetDriver), new { id = newId }, driver);
        }

        // PUT api/drivers/{id}
        [HttpPut("{id:int}")]
        public IActionResult UpdateDriver(int id, Driver updatedDriver)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var driver = drivers.FirstOrDefault(d => d.Id == id);
            if (driver == null)
                return NotFound();

            driver.FirstName = updatedDriver.FirstName;
            driver.LastName = updatedDriver.LastName;
            driver.Email = updatedDriver.Email;
            driver.Phone = updatedDriver.Phone;
            driver.AttachmentId = updatedDriver.AttachmentId;
            driver.VehicleTypeId = updatedDriver.VehicleTypeId;

            return NoContent();
        }

        // DELETE api/drivers/{id}
        [HttpDelete("{id:int}")]
        public IActionResult DeleteDriver(int id)
        {
            var driver = drivers.FirstOrDefault(d => d.Id == id);
            if (driver == null)
                return NotFound();

            drivers.Remove(driver);

            return NoContent();
        }
    }
}
