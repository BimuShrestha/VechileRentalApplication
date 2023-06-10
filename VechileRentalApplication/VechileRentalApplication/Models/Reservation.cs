using System;

namespace VechileRentalApplication.Models
{
    public class Reservation
    {
        public int Id { get; set; }
        public int VehicleId { get; set; }
        public int CustomerId { get; set; }
        public DateTime ReservationStartDate { get; set; }
        public DateTime ReservationEndDate { get; set; }
        public bool IsDriverRequired { get; set; }
        public int? DriverId { get; set; }
        public int ReservationStatusId { get; set; }
        public virtual Driver Driver { get; set; }
        public virtual Vehicle Vehicle { get; set; }
        public virtual Customer Customer { get; set; }
        public virtual ReservationStatus ReservationStatus { get; set; }
    }
}
