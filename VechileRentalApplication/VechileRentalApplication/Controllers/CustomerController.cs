using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using VechileRentalApplication.Data;
using VechileRentalApplication.Models;

namespace VechileRentalApplication.Controllers
{
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public CustomerController(ApplicationDbContext vmsDbContext)
        {
            _context = vmsDbContext;
        }
        private List<Customer> customers; 

        // GET api/customers
        [HttpGet]
        [Route("api/customers")]
        public IActionResult GetCustomers()
        {
            var customers = _context.Customers.ToList();
            return Ok(customers);
        }

        // GET api/customers/{id}
        [HttpGet]
        [Route("api/customer")]
        public IActionResult GetCustomer(string id)
        {
            var customer = _context.Customers.FirstOrDefault(c => c.Id == id);
            if (customer == null)
                return NotFound();

            return Ok(customer);
        }

        // POST api/customers
        [HttpPost]
        [Route("api/customer/create")]
        public IActionResult CreateCustomer(Customer customer)
        {
            _context.Customers.Add(customer);
            _context.SaveChanges();
            return Ok();
        }

        // PUT api/customers/{id}
        [HttpPut]
        [Route("api/customer/update")]
        public IActionResult UpdateCustomer(Customer updatedCustomer)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var customer = customers.FirstOrDefault(c => c.Id == updatedCustomer.Id);
            if (customer == null)
                return NotFound();

            customer.FirstName = updatedCustomer.FirstName;
            customer.LastName = updatedCustomer.LastName;
            customer.Phone = updatedCustomer.Phone;
            customer.Address = updatedCustomer.Address;
            _context.Customers.Update(customer);
            _context.SaveChanges();
            return Ok();
        }

        // DELETE api/customers/{id}
        [HttpDelete]
        [Route("api/customer/delete")]
        public IActionResult DeleteCustomer(string id)
        {
            var customer = _context.Customers.FirstOrDefault(c => c.Id == id);
            if (customer == null)
                return NotFound();

            _context.Customers.Remove(customer);
            _context.SaveChanges();
            return NoContent();
        }

        [HttpGet]
        [Route("api/user/me")]
        public ActionResult GetMyDetail(string email)
        {
            var user = _context.Users.FirstOrDefault(c => c.Email==email);
            if (user == null)
                return NotFound();
            //if (customer.UserTypeId==1)
            //{
            //    var customer = _context.Customers.FirstOrDefault(c => c. == user.Id);
            //}

            return Ok(user);
        }
    }
}
