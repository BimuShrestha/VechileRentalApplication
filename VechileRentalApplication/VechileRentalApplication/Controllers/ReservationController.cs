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
    public class ReservationController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public ReservationController(ApplicationDbContext vmsDbContext)
        {
            _context = vmsDbContext;
        }
        // GET api/reservations
        [HttpGet]
        [Route("api/reservations")]
        public IActionResult GetReservations()
        {
            var reservations = _context.Reservations.ToList();
            return Ok(reservations);
        }

        // GET api/reservations/{id}
        [HttpGet]
        [Route("api/reservation")]
        public IActionResult GetReservation(int id)
        {
            var reservation = _context.Reservations.FirstOrDefault(r => r.Id == id);
            if (reservation == null)
                return NotFound();

            return Ok(reservation);
        }

        // POST api/reservations
        [HttpPost]
        [Route("api/reservation/create")]
        public IActionResult CreateReservation(Reservation reservation)
        {
            // Validate the input
            _context.Reservations.Add(reservation);
            _context.SaveChanges();
            return Ok();
        }

        // PUT api/reservations/{id}
        [HttpPut]
        [Route("api/reservation/update")]
        public IActionResult UpdateReservation(Reservation updatedReservation)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var reservation = _context.Reservations.FirstOrDefault(r => r.Id == updatedReservation.Id);
            if (reservation == null)
                return NotFound();

            reservation.VehicleId = updatedReservation.VehicleId;
            reservation.CustomerId = updatedReservation.CustomerId;
            reservation.ReservationStartDate = updatedReservation.ReservationStartDate;
            reservation.ReservationEndDate = updatedReservation.ReservationEndDate;
            reservation.IsDriverRequired = updatedReservation.IsDriverRequired;
            reservation.DriverId = updatedReservation.DriverId;
            reservation.ReservationStatusId = updatedReservation.ReservationStatusId;
            _context.Reservations.Update(reservation);
            _context.SaveChanges();
            return Ok();
        }

        // DELETE api/reservations/{id}
        [HttpDelete]
        [Route("api/reservation/delete")]
        public IActionResult DeleteReservation(int id)
        {
            var reservation = _context.Reservations.FirstOrDefault(r => r.Id == id);
            if (reservation == null)
                return NotFound();

            _context.Reservations.Remove(reservation);
            _context.SaveChanges();
            return Ok();
        }
    }
}
