using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using VechileRentalApplication.Models;

namespace VechileRentalApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        private List<Reservation> reservations; // In-memory storage, replace with a database context

        // GET api/reservations
        [HttpGet]
        public IActionResult GetReservations()
        {
            return Ok(reservations);
        }

        // GET api/reservations/{id}
        [HttpGet("{id:int}")]
        public IActionResult GetReservation(int id)
        {
            var reservation = reservations.FirstOrDefault(r => r.Id == id);
            if (reservation == null)
                return NotFound();

            return Ok(reservation);
        }

        // POST api/reservations
        [HttpPost]
        public IActionResult CreateReservation(Reservation reservation)
        {
            // Validate the input
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var newId = reservations.Count + 1;
            reservation.Id = newId;

            reservations.Add(reservation);

            return CreatedAtAction(nameof(GetReservation), new { id = newId }, reservation);
        }

        // PUT api/reservations/{id}
        [HttpPut("{id:int}")]
        public IActionResult UpdateReservation(int id, Reservation updatedReservation)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var reservation = reservations.FirstOrDefault(r => r.Id == id);
            if (reservation == null)
                return NotFound();

            reservation.VehicleId = updatedReservation.VehicleId;
            reservation.CustomerId = updatedReservation.CustomerId;
            reservation.ReservationStartDate = updatedReservation.ReservationStartDate;
            reservation.ReservationEndDate = updatedReservation.ReservationEndDate;
            reservation.IsDriverRequired = updatedReservation.IsDriverRequired;
            reservation.DriverId = updatedReservation.DriverId;
            reservation.ReservationStatusId = updatedReservation.ReservationStatusId;

            return NoContent();
        }

        // DELETE api/reservations/{id}
        [HttpDelete("{id:int}")]
        public IActionResult DeleteReservation(int id)
        {
            var reservation = reservations.FirstOrDefault(r => r.Id == id);
            if (reservation == null)
                return NotFound();

            reservations.Remove(reservation);

            return NoContent();
        }
    }
}
