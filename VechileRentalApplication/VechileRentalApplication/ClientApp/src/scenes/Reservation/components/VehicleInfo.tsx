import React from 'react';
import { Modal, Descriptions } from 'antd';

interface Vehicle {
  id: number;
  name: string;
  detail: string;
  vehicleType: string;
  brand: string;
  isFree: boolean;
  imageData: string;
}

interface VehicleInfoModalProps {
  visible: boolean;
  vehicle: Vehicle;
  onClose: () => void;
}

export const VehicleInfoModal: React.FC<VehicleInfoModalProps> = ({
  visible,
  vehicle,
  onClose,
}) => {
  return (
    <Modal
      visible={visible}
      title={`Vehicle Details: ${vehicle.name}`}
      onCancel={onClose}
      footer={null} // Hide the default footer
    >
      <Descriptions column={1}>
        <Descriptions.Item label="Name">{vehicle.name}</Descriptions.Item>
        <Descriptions.Item label="Detail">{vehicle.detail}</Descriptions.Item>
        <Descriptions.Item label="Vehicle Type">{vehicle.vehicleType}</Descriptions.Item>
        <Descriptions.Item label="Brand">{vehicle.brand}</Descriptions.Item>
        <Descriptions.Item label="Available">{vehicle.isFree ? 'Yes' : 'No'}</Descriptions.Item>
      </Descriptions>
      <img src={vehicle.imageData} alt={vehicle.name} style={{ width: '100%', marginTop: 16 }} />
    </Modal>
  );
};

export default VehicleInfoModal;
