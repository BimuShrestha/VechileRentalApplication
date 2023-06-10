import React, {useEffect, useState} from 'react';
import {Navbar, Nav, Form, FormControl, Button, Dropdown, Carousel, Container, Row, Col} from 'react-bootstrap';
import './HomePage.css'; // import our new CSS file
import VehicleCard from './VehicleCard';

const vehicleData = Array(40).fill().map((_, i) => ({ // Hard-coded data
    name: `Vehicle ${i+1}`,
    description: 'Vehicle description...',
    imageUrl: 'https://via.placeholder.com/150'
}));
const HomePage = () => {


    const carouselData = [
        { imageUrl: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80', title: 'Image 1' },
        { imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80', title: 'Image 2' },
        { imageUrl: 'https://images.unsplash.com/photo-1517672651691-24622a91b550?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80', title: 'Image 3' },
    ];

    const vehicleData = Array(40).fill().map((_, i) => ({ // Hard-coded data
        name: `Vehicle ${i+1}`,
        description: 'Vehicle description...',
        imageUrl: 'https://via.placeholder.com/150'
    }));

    const handleSearch = (event) => {
        // Handle search logic here
    }

    const handleLogout = () => {
        // Handle logout logic here
    }

    return (
        <div>
            <Navbar bg="dark" expand="lg" variant="dark">
                <Navbar.Brand href="#">
                    <img
                        src="./assets/car.png" // Put your logo path here
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt=""
                    />
                    {' '}
                    VRS
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Form inline className="mx-auto custom-search">
                        <FormControl type="text" placeholder="Search" className="mr-sm-2 custom-search-input" onChange={handleSearch} />
                        <Button variant="outline-info">Search</Button>
                    </Form>
                    <Nav className="ml-auto">
                        <Dropdown>
                            <Dropdown.Toggle variant="info" id="dropdown-basic">
                                Menu
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/order-history">Order History</Dropdown.Item>
                                <Dropdown.Item href="#/active-booking">Active Booking</Dropdown.Item>
                                <Dropdown.Item href="#/profile">Profile</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Carousel className="custom-carousel">
                {carouselData.map((item, index) => (
                    <Carousel.Item key={index}>
                        <img
                            className="d-block w-100 custom-carousel-img"
                            src={item.imageUrl}
                            alt={item.title}
                        />
                        <Carousel.Caption>
                            <h3>{item.title} Buy Now</h3>
                            <button>Buy Now</button>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>

            <Container>
                <Row xs={1} md={2} lg={4}>
                    {vehicleData.map((vehicle, index) => (
                        <Col key={index}>
                            <VehicleCard vehicle={vehicle} />
                        </Col>
                    ))}
                </Row>
            </Container>

        </div>
    );
}

export default HomePage;
