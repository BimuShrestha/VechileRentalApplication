using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using VechileRentalApplication.Data;
using VechileRentalApplication.Models;

namespace VechileRentalApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DriverController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public DriverController(ApplicationDbContext vmsDbContext)
        {
            _context = vmsDbContext;
        }
        private List<Customer> customers;

        // GET api/drivers
        [HttpGet]
        [Route("api/drivers")]
        public IActionResult GetDrivers()
        {
            var drivers = _context.Drivers.ToList();
            return Ok(drivers);
        }

        // GET api/drivers/{id}
        [HttpGet]
        [Route("api/driver")]
        public IActionResult GetDriver(int id)
        {
            var driver = _context.Customers.FirstOrDefault(d => d.Id == id);
            if (driver == null)
                return NotFound();

            return Ok(driver);
        }

        // POST api/drivers
        [HttpPost]
        [Route("api/driver/create")]
        public IActionResult CreateDriver(Driver driver)
        {
            _context.Drivers.Add(driver);
            _context.SaveChanges();
            return Ok();
        }

        // PUT api/drivers/{id}
        [HttpPut]
        [Route("api/driver/update")]
        public IActionResult UpdateDriver(Driver updatedDriver)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var driver = _context.Drivers.FirstOrDefault(d => d.Id == updatedDriver.Id);
            if (driver == null)
                return NotFound();

            driver.FirstName = updatedDriver.FirstName;
            driver.LastName = updatedDriver.LastName;
            driver.Email = updatedDriver.Email;
            driver.Phone = updatedDriver.Phone;
            driver.Attachment = updatedDriver.Attachment;
            driver.VehicleTypeId = updatedDriver.VehicleTypeId;
            _context.Drivers.Update(updatedDriver);
            _context.SaveChanges();
            return Ok();
        }

        // DELETE api/drivers/{id}
        [HttpDelete]
        [Route("api/driver/delete")]
        public IActionResult DeleteDriver(int id)
        {
            var driver = _context.Drivers.FirstOrDefault(d => d.Id == id);
            if (driver == null)
                return NotFound();

            _context.Drivers.Remove(driver);
            _context.SaveChanges();
            return Ok();
        }
    }
}
