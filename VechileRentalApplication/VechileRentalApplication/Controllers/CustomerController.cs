using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using VechileRentalApplication.Models;

namespace VechileRentalApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private List<Customer> customers; 

        // GET api/customers
        [HttpGet]
        public IActionResult GetCustomers()
        {
            return Ok(customers);
        }

        // GET api/customers/{id}
        [HttpGet("{id:int}")]
        public IActionResult GetCustomer(int id)
        {
            var customer = customers.FirstOrDefault(c => c.Id == id);
            if (customer == null)
                return NotFound();

            return Ok(customer);
        }

        // POST api/customers
        [HttpPost]
        public IActionResult CreateCustomer(Customer customer)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var newId = customers.Count + 1;
            customer.Id = newId;

            customers.Add(customer);

            return CreatedAtAction(nameof(GetCustomer), new { id = newId }, customer);
        }

        // PUT api/customers/{id}
        [HttpPut("{id:int}")]
        public IActionResult UpdateCustomer(int id, Customer updatedCustomer)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var customer = customers.FirstOrDefault(c => c.Id == id);
            if (customer == null)
                return NotFound();

            customer.FirstName = updatedCustomer.FirstName;
            customer.LastName = updatedCustomer.LastName;
            customer.Phone = updatedCustomer.Phone;
            customer.Address = updatedCustomer.Address;

            return NoContent();
        }

        // DELETE api/customers/{id}
        [HttpDelete("{id:int}")]
        public IActionResult DeleteCustomer(int id)
        {
            var customer = customers.FirstOrDefault(c => c.Id == id);
            if (customer == null)
                return NotFound();

            customers.Remove(customer);
            return NoContent();
        }
    }
}
