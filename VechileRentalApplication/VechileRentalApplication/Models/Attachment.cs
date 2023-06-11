namespace VechileRentalApplication.Models
{
    public class Attachment
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ContentType { get; set; }
        public string Blob { get; set; }
        public virtual Vehicle Vehicle { get; set; }
    }
}
