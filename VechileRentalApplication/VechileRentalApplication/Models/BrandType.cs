namespace VechileRentalApplication.Models
{
    public class BrandType
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int? VehicleTypeId { get; set; }
        public virtual VehicleType VehicleType { get; set; }
    }
}
