// VehicleCard.js
import React from 'react';
import { Card } from 'react-bootstrap';

const VehicleCard = ({ vehicle }) => {
    return (
        <Card style={{ width: '18rem' }} className="mb-4">
            <Card.Img variant="top" src={vehicle.imageUrl} />
            <Card.Body>
                <Card.Title>{vehicle.name}</Card.Title>
                <Card.Text>
                    {vehicle.description}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default VehicleCard;
