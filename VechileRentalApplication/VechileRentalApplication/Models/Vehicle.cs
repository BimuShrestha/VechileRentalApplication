namespace VechileRentalApplication.Models
{
    public class Vehicle : AuditableEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Details { get; set; }
        public int? VehicleTypeId { get; set; }
        public string Attachment { get; set; }
        public int FuelTypeId { get; set; }
        public virtual VehicleType VehicleType { get; set; }
        public virtual FuelType FuelType { get; set; }
    }
}
