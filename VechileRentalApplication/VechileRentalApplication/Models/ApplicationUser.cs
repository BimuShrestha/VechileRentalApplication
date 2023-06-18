using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VechileRentalApplication.Models
{
    public class ApplicationUser : IdentityUser
    {
        public int? UserTypeId { get; set; }
        public UserType UserType { get; set; }
    }
}
