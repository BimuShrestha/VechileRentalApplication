function MainSection() {
    return (
        <main>
            <div className="banner">
                <h1>Welcome to Vehicle Rental</h1>
                <p>Your perfect ride is just a few clicks away</p>
            </div>
            <div className="featured-vehicles">
                {/* Map over an array of vehicle objects and render a VehicleCard for each one */}
                {vehicles.map(vehicle => <VehicleCard key={vehicle.id} vehicle={vehicle} />)}
            </div>
        </main>
    );
}
