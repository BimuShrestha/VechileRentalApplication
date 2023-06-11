using System.ComponentModel;

namespace VechileRentalApplication.Models
{
    public class Driver
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        [DisplayName("License")]
        public int AttachmentId { get; set; }
        public int VehicleTypeId { get; set; }
        public virtual Attachment Attachment { get; set; }
        public virtual VehicleType VehicleType { get; set; }
    }
}
