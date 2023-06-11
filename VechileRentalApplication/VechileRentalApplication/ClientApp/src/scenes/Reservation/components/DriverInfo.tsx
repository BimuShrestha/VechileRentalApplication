import React from 'react';
import { Modal, Descriptions } from 'antd';

interface DriverInfoModalProps {
  visible: boolean;
  driver: Driver;
  onClose: () => void;
}

const DriverInfoModal: React.FC<DriverInfoModalProps> = ({
  visible,
  driver,
  onClose,
}) => {
  return (
    <Modal
      visible={visible}
      title={`${driver.firstName} ${driver.lastName}`}
      onCancel={onClose}
      footer={null}
    >
      <Descriptions column={1}>
        <Descriptions.Item label="First Name">{driver.firstName}</Descriptions.Item>
        <Descriptions.Item label="Last Name">{driver.lastName}</Descriptions.Item>
        <Descriptions.Item label="Email">{driver.email}</Descriptions.Item>
        <Descriptions.Item label="Phone">{driver.phone}</Descriptions.Item>
        <Descriptions.Item label="Vehicle Type">{driver.vehicleType}</Descriptions.Item>
      </Descriptions>
      <img src={driver.licenseImage} alt="Driver's license" style={{ width: '100%', marginTop: 16 }} />
    </Modal>
  );
};

export default DriverInfoModal;
