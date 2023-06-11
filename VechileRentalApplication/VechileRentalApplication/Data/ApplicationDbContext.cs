﻿using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VechileRentalApplication.Models;

namespace VechileRentalApplication.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public ApplicationDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {
        }
        public DbSet <Customer> Customers { get; set; }
        public DbSet <Vehicle> Vehicles { get; set; }
        public DbSet <VehicleType> VehicleTypes { get; set; }
        public DbSet <FuelType> FuelTypes { get; set; }
        public DbSet <Attachment> Attachments { get; set; }
        public DbSet <Reservation> Reservations { get; set; }
        public DbSet <ReservationStatus> ReservationStatus { get; set; }
        public DbSet <Driver> Drivers { get; set; }
        public DbSet <BrandType> BrandTypes { get; set; }
    }
}
