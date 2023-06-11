import { useState } from 'react';
import { List, Row, Col, Button } from 'antd';
import { Vehicle } from '..';

interface VehicleListProps {
  vehicles: Vehicle[];
  onEditVehicle: (vehicle: Vehicle) => void;
}

export const VehicleList: React.FC<VehicleListProps> = ({ vehicles, onEditVehicle }) => {
  return (
    <Row gutter={16}>
      {vehicles.map(vehicle => (
        <Col span={12} key={vehicle.id}>
          <List.Item
            actions={[
                <Button  type="primary"
                onClick={() => onEditVehicle(vehicle)}>
                Update Vehicle
              </Button>
              
            ]}
            extra={
              <img
                width={272}
                alt="logo"
                src={vehicle.imageData} // Display the image from the vehicle's imageData property
              />
            }
          >
            <List.Item.Meta
              title={vehicle.name}
              description={`Vehicle Type: ${vehicle.vehicleType} - Brand: ${vehicle.brand} - Is Free: ${vehicle.isFree ? 'Yes' : 'No'}`}
            />
            {vehicle.detail}
          </List.Item>
        </Col>
      ))}
    </Row>
  );
};

export default VehicleList;
