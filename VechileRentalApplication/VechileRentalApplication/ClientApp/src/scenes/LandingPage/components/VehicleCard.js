// VehicleCard.js
import React from 'react';
import { Card } from 'antd';

const { Meta } = Card;
const VehicleCard = ({ vehicle }) => {
    return (
        <Card
    hoverable
    style={{ width: 240 }}
    cover={<img alt="example" src={vehicle.imageData} />}
  >
    <Meta title={vehicle.name} description={vehicle.details} />
  </Card>
    );
}

export default VehicleCard;
